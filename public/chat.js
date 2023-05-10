var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

var typingTimeout;

btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = '';
});

message.addEventListener('keypress', () => {
    clearTimeout(typingTimeout); // Clear the previous scheduled execution
    socket.emit('typing', handle.value);
    typingTimeout = setTimeout(() => {
        socket.emit('typing-cancel', handle.value);
    }, 5000); // Schedule the execution after 5 seconds
});

socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}:${data.message}</strong></p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} typing...</em></p>`;
});

socket.on('typing-cancel', (data) => {
    feedback.innerHTML = '';
});
