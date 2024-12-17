## Estructura del proyecto

crud_electron/
│
├── main/                    # Archivos del backend (proceso principal)
│   ├── main.js              # Punto de entrada principal
│   ├── preload.js           # Script para contextBridge
│   └── ipcHandlers.js       # Manejadores de eventos IPC
│
├── renderer/                # Archivos del frontend (proceso de renderizado)
│   ├── index.html           # Interfaz HTML
│   ├── renderer.js          # Lógica de frontend
│
├── package.json             # Configuración del proyecto
├── package-lock.json        # Dependencias bloqueadas
└── README.md                # Documentación    

### 1. Frontend (renderer.js y index.html)
**Archivo:** index.html
- *Propósito:* Este archivo define la interfaz gráfica de tu aplicación, donde el usuario interactúa con botones, texto, etc.
- *Contenido típico:*
- Etiquetas HTML (estructuran la interfaz).
- Botones y elementos interactivos que los usuarios pueden manipular.
- Scripts (renderer.js) que conectan los eventos de la interfaz con la lógica del frontend.

**Archivo:** renderer.js
- *Propósito:* Contiene la lógica del frontend para gestionar eventos de usuario y comunicación con el backend.
- *Responsabilidades:*
- Detectar eventos en la interfaz (clics en botones, entrada de datos, etc.).
- Enviar mensajes al backend a través de window.electronAPI.
- Recibir y procesar respuestas del backend.
- Conexión con el preload.js: Usa funciones expuestas por el contextBridge en el preload.js.

### 2. Preload (preload.js)
**Archivo:** preload.js
- *Propósito:* Actúa como un intermediario seguro entre el frontend (que no tiene acceso directo a Node.js) y el backend.
- *Responsabilidades:*
- Usa contextBridge para  exponer funciones específicas (como sendMessage y onReply) al frontend.
- Asegura que el frontend solo pueda interactuar con el backend de manera controlada.
- *Conexión con renderer.js:*
- window.electronAPI.sendMessage(...) llama a  ipcRenderer.send(...) para enviar datos al backend.
window.electronAPI.onReply(...) escucha eventos de respuesta desde el backend.

## 3. Backend (ipcHandlers.js y main.js)
**Archivo:** ipcHandlers.js
- *Propósito:* Contiene la lógica para manejar los mensajes que vienen del frontend.
Responsabilidades:
- Escuchar eventos enviados desde el frontend a través de ipcMain.on.
- Procesar los datos recibidos (arg).
- Responder al frontend usando event.reply.
- *Conexión con preload.js:*
- ipcRenderer.send(...) en el preload.js activa los manejadores de ipcMain definidos aquí.
- event.reply(...) envía respuestas de vuelta al frontend.

**Archivo:** main.js
- *Propósito:* Es el punto de entrada de la aplicación. Configura la ventana principal y carga los otros componentes (preload.js, ipcHandlers.js, etc.).
- *Responsabilidades:*
- Crear y configurar la ventana de la aplicación (BrowserWindow).
- Conectar el preload.js para exponer funciones seguras al frontend.
- Importar los manejadores de IPC (ipcHandlers.js).


## Flujo de Comunicación
1. *Frontend (Usuario Interactúa)*
- El usuario hace clic en un botón (renderer.js detecta el clic).
- window.electronAPI.sendMessage(...) envía un mensaje al backend a través de ipcRenderer.send.

2. *Preload (Intermediario):*
- El preload.js envía el mensaje al backend usando ipcRenderer.

3. Backend (Recibe y Procesa):
- ipcMain.on en ipcHandlers.js escucha el evento.
- Procesa los datos enviados (arg) y responde con event.reply.

4. *Frontend (Recibe Respuesta):*
- ipcRenderer.on en el preload.js escucha la respuesta del backend.
- La respuesta llega al renderer.js, que actualiza la interfaz.