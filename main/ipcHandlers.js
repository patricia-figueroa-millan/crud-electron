const { ipcMain } = require('electron');

// Escucha el mensaje enviado desde el frontend
ipcMain.on('mensaje-backend', (event, arg) => {
    console.log('Mensaje recibido desde el frontend:', arg); // Log en el terminal
    event.reply('respuesta-backend', `Hola desde el backend "${arg}"`); // Responde al frontend
});
