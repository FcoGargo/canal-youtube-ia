# 3. Acceso a la API de YouTube (para subir desde tu computadora)

Es gratis. Lo haces tú una sola vez; tu Claude no debe ver tu contraseña.

1. Entra a https://console.cloud.google.com y crea un proyecto (por ejemplo "mi-canal").
2. En "APIs y servicios" > "Biblioteca", activa **YouTube Data API v3**.
3. En "Pantalla de consentimiento de OAuth": tipo **Externo**, pon un nombre de app y tu correo, y en "Usuarios de prueba" agrega la cuenta de Google del canal.
4. En "Credenciales" > "Crear credenciales" > **ID de cliente de OAuth** > tipo **App de escritorio**. Descarga el JSON.
5. Guárdalo como `subida/client_secret.json`. Este archivo es secreto y ya está en `.gitignore`.
6. Copia `.env.example` a `.env` y pon `CANAL_NOMBRE`.
7. Corre (tú, en tu terminal):
   ```bash
   python subida/subir_youtube.py --login
   ```
   Se abre el navegador: elige tu cuenta y **el canal correcto**. Google avisará que la app no está verificada: es tu propia app, continúa.
8. El script imprime el ID del canal (`UC...`). Ponlo en `CANAL_ID` dentro de `.env`.
9. Comprueba:
   ```bash
   python subida/subir_youtube.py --probar
   ```
   Debe decir `OK`. El token queda en `subida/token.json` (secreto, en `.gitignore`).

## Límites
La API tiene una cuota diaria gratuita (10.000 unidades por defecto). Subir un video y sus subtítulos consume buena parte; mira tu uso en la consola de Google Cloud, en "APIs y servicios" > "Cuotas".
Mientras la app esté en modo de prueba y sin auditar, Google puede dejar como privados los videos subidos por API. Si pasa, súbelos en privado y cámbialos a público a mano en Studio, o pide la auditoría de la API.
