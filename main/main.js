const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Ruta al preload.js
            contextIsolation: true, // Habilitado para usar contextBridge
            nodeIntegration: false, // Desactivado por seguridad
        },
    });

    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
});

require('./ipcHandlers'); // Importa los manejadores de IPC
