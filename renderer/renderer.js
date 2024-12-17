document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('sendBtn');
    const responseParagraph = document.getElementById('response');

    // Enviar mensaje al backend
    sendButton.addEventListener('click', () => {
        console.log('Enviando mensaje al backend...');
        window.electronAPI.sendMessage('¡Hola desde el frontend!');
    });

    // Escuchar la respuesta del backend
    window.electronAPI.onReply((response) => {
        console.log('Respuesta recibida del backend:', response); // Log en consola del navegador
        responseParagraph.textContent = response; // Mostrar respuesta en la interfaz
    });
});
