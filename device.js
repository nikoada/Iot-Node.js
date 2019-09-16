const ipc = require('node-ipc')
const { StringDecoder } = require ('string_decoder')
const decoder = new StringDecoder('ascii')

ipc.config.id = 'device'
ipc.config.retry = 1500
ipc.config.encoding = 'ascii'
ipc.config.rawBuffer = true

const asciiToHex = data => (
  data.split('').map((item) => '0x' + item.charCodeAt(0).toString(16))
)

const commandList = {
  'S\n': Math.floor(Math.random() * Math.floor(1000))
}

ipc.serve(() => {
  ipc.server.on('data', (data, socket) => {
    const dataString = decoder.write(data)
    ipc.log(`Recived: [${asciiToHex(dataString)}] is "${dataString.replace('\n', '\\n')}"`)
    ipc.server.emit(
      socket,
      `${commandList[dataString]}`
    )
    ipc.log(
      commandList.hasOwnProperty(dataString) ?
      '-------------------------\n--- Command recognized --\n-------------------------'
      :
      'Listening.\n.........'
    )
  })

  ipc.server.on('socket.disconnected', () => {
    ipc.log('Driver has disconnected!')
  })
})

ipc.server.start()
