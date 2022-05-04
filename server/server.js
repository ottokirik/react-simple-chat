const io = require('socket.io')(5000)

io.on('connection', (socket) => {
  const id = socket.handshake.query.id.toLowerCase()
  socket.join(id)

  socket.on('send-message', ({ recipients, message }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient)
      newRecipients.push(id)

      socket.broadcast.to(recipient.toLowerCase()).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        message,
      })
    })
  })
})
