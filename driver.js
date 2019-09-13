const ipc = require('node-ipc')
const { StringDecoder } = require ('string_decoder')
const decoder = new StringDecoder('ascii')

ipc.config.id = 'driver'
ipc.config.retry = 1500
ipc.config.encoding = 'ascii'
ipc.config.rawBuffer = true

const commandList = {
  ['S\n']:'Send stable weight value'
}

let standard_input = process.stdin
standard_input.setEncoding('ascii')

standard_input.on('data', function (data) {
  ipc.log(`Sending Command: ${commandList[data]}`)
  ipc.log(`Sending:  "${data.replace('\n', '\\n')}"`)
  ipc.of.device.emit( data )
})

ipc.connectTo( 'device', () => {
  ipc.of.device.on(
    'connect', () => {
      ipc.of.device.emit( 'test' )
    }
  )
  ipc.of.device.on( 'data', (data) => {
    const dataToString = decoder.write(data)
    ipc.log('Recieved from device : ',  Number(dataToString) + '_g')
    ipc.log('Please type a command: ')
  })
})
