const { contextBridge, ipcRenderer } = require('electron');

// Exponer funciones al frontend
contextBridge.exposeInMainWorld('electronAPI', {
    sendMessage: (message) => ipcRenderer.send('mensaje-backend', message), // Enviar mensaje al backend
    onReply: (callback) => ipcRenderer.on('respuesta-backend', (event, response) => {
        if (typeof callback === 'function') {
            callback(response); // Ejecutar el callback con la respuesta del backend
        }
    }),
});
