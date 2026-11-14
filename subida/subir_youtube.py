"""Subida a YouTube de TU canal (YouTube Data API v3).

Configura todo en el archivo .env de la raíz del repo (copia .env.example a .env):
  CANAL_NOMBRE, CANAL_ID (lo imprime --login), IDIOMA, CATEGORIA.
Necesitas tu propio subida/client_secret.json (ver guia/04-youtube-api.md). Nunca lo subas a GitHub.

Uso:
  python subir_youtube.py --login      # autoriza; en Google elige TU canal
  python subir_youtube.py --probar     # comprueba que el token es del canal correcto
  python subir_youtube.py --subir <carpeta> --confirmo-ok [--publico | --publicar-en 2026-12-01T15:00:00Z]

La carpeta de --subir debe tener: publicar.md (# Title / # Description / opcional # Tags),
un solo .mp4, thumbnail.jpg y opcionalmente subtitulos/subtitles_<lang>.srt.
Sube PRIVADO por defecto. Sin --confirmo-ok no hace nada.
"""
import argparse
import os
import re
import sys
from pathlib import Path

AQUI = Path(__file__).resolve().parent


def cargar_env():
    env = AQUI.parent / ".env"
    if env.exists():
        for linea in env.read_text(encoding="utf-8").splitlines():
            linea = linea.strip()
            if linea and not linea.startswith("#") and "=" in linea:
                k, v = linea.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"'))


cargar_env()
TOKEN = AQUI / "token.json"
SECRETO = AQUI / "client_secret.json"
CANAL_NOMBRE = os.environ.get("CANAL_NOMBRE", "")
CANAL_ID = os.environ.get("CANAL_ID", "")
IDIOMA = os.environ.get("IDIOMA", "en")
CATEGORIA = os.environ.get("CATEGORIA", "27")  # 27 Educacion, 28 Ciencia y tecnologia, 23 Comedia, 24 Entretenimiento, 22 Gente y blogs
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.force-ssl",
]


def credenciales(interactivo=False):
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from google_auth_oauthlib.flow import InstalledAppFlow

    cred = Credentials.from_authorized_user_file(str(TOKEN), SCOPES) if TOKEN.exists() else None
    if cred and cred.expired and cred.refresh_token:
        try:
            cred.refresh(Request())
        except Exception:
            cred = None
    if not cred or not cred.valid:
        if not interactivo:
            sys.exit("Falta autorizar el canal: corre  python subir_youtube.py --login")
        if not SECRETO.exists():
            sys.exit(f"No encuentro {SECRETO}")
        print(f"Se abrirá el navegador. Elige la cuenta y luego el canal {CANAL_NOMBRE or 'que vas a usar'}.")
        flujo = InstalledAppFlow.from_client_secrets_file(str(SECRETO), SCOPES)
        cred = flujo.run_local_server(port=0, prompt="consent select_account")
    TOKEN.write_text(cred.to_json())
    return cred


def youtube(interactivo=False):
    from googleapiclient.discovery import build
    return build("youtube", "v3", credentials=credenciales(interactivo), cache_discovery=False)


def verificar_canal(yt, borrar_si_falla=True):
    r = yt.channels().list(part="snippet", mine=True).execute()
    items = r.get("items", [])
    if not items:
        print("El token no tiene canal asociado.")
        ok, nombre, cid = False, None, None
    else:
        cid = items[0]["id"]
        nombre = items[0]["snippet"]["title"]
        print(f"Canal: {nombre}  ID: {cid}")
        if not CANAL_ID:
            print(f"CANAL_ID vacio. Si este es tu canal, pon  CANAL_ID={cid}  en el archivo .env")
            return False
        ok = cid == CANAL_ID
    if not ok:
        if borrar_si_falla and TOKEN.exists():
            TOKEN.unlink()
        print(f"ERROR: no es el canal esperado ({CANAL_ID}). Token borrado; "
              f"repite --login eligiendo {CANAL_NOMBRE}.")
    else:
        print(f"OK: es {CANAL_NOMBRE}.")
    return ok


def leer_publicar(md: Path):
    secciones, actual = {}, None
    for linea in md.read_text(encoding="utf-8").splitlines():
        m = re.match(r"^#\s+(.+?)\s*$", linea)
        if m:
            actual = m.group(1).strip().lower()
            secciones[actual] = []
        elif actual:
            secciones[actual].append(linea)
    texto = {k: "\n".join(v).strip() for k, v in secciones.items()}
    titulo = texto.get("title", "")
    desc = texto.get("description", "")
    tags = [t.strip() for t in re.split(r"[,\n]", texto.get("tags", "")) if t.strip()]
    if not titulo or not desc:
        sys.exit("publicar.md necesita secciones '# Title' y '# Description'.")
    if len(titulo) > 100:
        sys.exit(f"Título demasiado largo ({len(titulo)} > 100).")
    return titulo, desc, tags


def subir(carpeta: Path, publicar_en=None, publico=False):
    if not CANAL_ID:
        sys.exit("Pon CANAL_ID en .env antes de subir (corre --login primero).")
    from googleapiclient.http import MediaFileUpload

    carpeta = carpeta.resolve()
    titulo, desc, tags = leer_publicar(carpeta / "publicar.md")
    videos = sorted(carpeta.glob("*.mp4"))
    if len(videos) != 1:
        sys.exit(f"Esperaba exactamente un .mp4 en {carpeta}, hay {len(videos)}.")
    video = videos[0]
    miniatura = carpeta / "thumbnail.jpg"
    subs = sorted((carpeta / "subtitulos").glob("subtitles_*.srt"))

    yt = youtube()
    if not verificar_canal(yt):
        sys.exit(1)

    estado = {"privacyStatus": "public" if publico and not publicar_en else "private", "madeForKids": False, "selfDeclaredMadeForKids": False}
    if publicar_en:
        estado["publishAt"] = publicar_en
    cuerpo = {
        "snippet": {
            "title": titulo,
            "description": desc,
            "categoryId": CATEGORIA,
            "defaultLanguage": IDIOMA,
            "defaultAudioLanguage": IDIOMA,
            **({"tags": tags} if tags else {}),
        },
        "status": estado,
    }
    print(f"Subiendo {video.name} como " + estado["privacyStatus"].upper() + (f", programado {publicar_en}" if publicar_en else ""))
    media = MediaFileUpload(str(video), chunksize=8 * 1024 * 1024, resumable=True, mimetype="video/mp4")
    req = yt.videos().insert(part="snippet,status", body=cuerpo, media_body=media)
    resp = None
    while resp is None:
        st, resp = req.next_chunk()
        if st:
            print(f"  {int(st.progress() * 100)}%")
    vid = resp["id"]
    print(f"Video subido: https://youtu.be/{vid}")

    if miniatura.exists():
        try:
            yt.thumbnails().set(videoId=vid, media_body=MediaFileUpload(str(miniatura), mimetype="image/jpeg")).execute()
            print("Miniatura puesta.")
        except Exception as e:
            print(f"ERROR miniatura (el canal necesita verificar telefono en youtube.com/verify): {e}")
    else:
        print("AVISO: no hay thumbnail.jpg")

    for srt in subs:
        lang = srt.stem.split("_", 1)[1]
        try:
            yt.captions().insert(
                part="snippet",
                body={"snippet": {"videoId": vid, "language": lang, "name": "", "isDraft": False}},
                media_body=MediaFileUpload(str(srt), mimetype="application/octet-stream"),
            ).execute()
            print(f"Subtítulo {lang} subido.")
        except Exception as e:
            print(f"ERROR subtítulo {lang}: {e}")
    print(f"Listo. Studio: https://studio.youtube.com/video/{vid}/edit")


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--login", action="store_true")
    g.add_argument("--probar", action="store_true")
    g.add_argument("--subir", metavar="CARPETA")
    ap.add_argument("--confirmo-ok", action="store_true", help="confirmas que revisaste el video y quieres subirlo")
    ap.add_argument("--publico", action="store_true", help="sube directo como PUBLICO")
    ap.add_argument("--publicar-en", metavar="ISO8601", help="p.ej. 2026-11-20T15:00:00Z")
    a = ap.parse_args()

    if a.login:
        yt = youtube(interactivo=True)
        verificar_canal(yt)
    elif a.probar:
        sys.exit(0 if verificar_canal(youtube()) else 1)
    elif a.subir:
        if not a.confirmo_ok:
            print("No hago nada: --subir exige --confirmo-ok (tu OK explícito después de revisar el video).")
            return
        subir(Path(a.subir), a.publicar_en, a.publico)


if __name__ == "__main__":
    main()
