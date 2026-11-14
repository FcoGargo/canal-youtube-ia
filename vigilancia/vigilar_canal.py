"""Vigila canales de referencia: qué temas publican y cuáles les funcionan mejor.
Sirve para tomar TEMAS y FORMATO como inspiración. Nunca para descargar y resubir videos ajenos.

Uso:
  python vigilar_canal.py https://www.youtube.com/@canal            # últimos 30 videos, nuevos y destacados
  python vigilar_canal.py https://www.youtube.com/@canal --n 60
  python vigilar_canal.py --todos                                    # revisa todos los canales de canales.txt
  python vigilar_canal.py --subtitulos https://youtu.be/XXXX         # baja solo los subtítulos (texto) para estudiar el guion

Requiere yt-dlp (pip install yt-dlp). Guarda el historial en vigilancia/datos/ (no se sube a GitHub).
"""
import argparse, json, re, statistics, subprocess, sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent
DATOS = AQUI / "datos"
LISTA = AQUI / "canales.txt"


def ytdlp(*args):
    r = subprocess.run([sys.executable, "-m", "yt_dlp", *args], capture_output=True, text=True, encoding="utf-8")
    if r.returncode:
        sys.exit(r.stderr.strip()[-800:])
    return r.stdout


def revisar(url, n):
    url = url.rstrip("/")
    if not re.search(r"/(videos|shorts|streams)$", url):
        url += "/videos"
    filas = [json.loads(l) for l in ytdlp("--flat-playlist", "-J", "--playlist-end", str(n), url).splitlines() if l.strip()]
    info = filas[0]
    videos = [{"id": e["id"], "titulo": e.get("title"), "vistas": e.get("view_count") or 0,
               "duracion": e.get("duration")} for e in info.get("entries", [])]
    slug = re.sub(r"[^a-z0-9]+", "-", (info.get("uploader_id") or info.get("title") or "canal").lower()).strip("-")
    DATOS.mkdir(exist_ok=True)
    hist = DATOS / f"{slug}.json"
    vistos = set(json.loads(hist.read_text(encoding="utf-8"))["ids"]) if hist.exists() else set()
    hist.write_text(json.dumps({"url": url, "ids": sorted(vistos | {v["id"] for v in videos})}, ensure_ascii=False), encoding="utf-8")

    med = statistics.median([v["vistas"] for v in videos if v["vistas"]] or [0])
    print(f"\n== {info.get('title')}  ({len(videos)} videos revisados, mediana {med:,.0f} vistas)")
    nuevos = [v for v in videos if v["id"] not in vistos] if vistos else []
    if nuevos:
        print("\nNuevos desde la última revisión:")
        for v in nuevos:
            print(f"  - {v['titulo']}  https://youtu.be/{v['id']}")
    dest = sorted([v for v in videos if med and v["vistas"] >= 2 * med], key=lambda v: -v["vistas"])
    print("\nDestacados (2x o más la mediana del canal): temas que le funcionan")
    for v in dest[:10] or []:
        print(f"  {v['vistas'] / med:4.1f}x  {v['vistas']:>12,}  {v['titulo']}  https://youtu.be/{v['id']}")
    if not dest:
        print("  (ninguno)")


def subtitulos(url):
    destino = AQUI.parent / "referencia" / "subtitulos"
    destino.mkdir(parents=True, exist_ok=True)
    ytdlp("--skip-download", "--write-auto-subs", "--write-subs", "--sub-langs", "en.*,es.*", "--convert-subs", "srt",
          "-o", str(destino / "%(id)s.%(ext)s"), url)
    print(f"Subtítulos guardados en {destino}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url", nargs="?")
    ap.add_argument("--n", type=int, default=30)
    ap.add_argument("--todos", action="store_true")
    ap.add_argument("--subtitulos", metavar="URL_VIDEO")
    a = ap.parse_args()
    if a.subtitulos:
        return subtitulos(a.subtitulos)
    urls = [a.url] if a.url else []
    if a.todos and LISTA.exists():
        urls += [l.strip() for l in LISTA.read_text(encoding="utf-8").splitlines() if l.strip() and not l.startswith("#")]
    if not urls:
        ap.error("pasa la URL de un canal o usa --todos con vigilancia/canales.txt")
    for u in urls:
        revisar(u, a.n)


if __name__ == "__main__":
    main()
