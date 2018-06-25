const WebSocket = require('ws')

const generateData = (nbRows, nbCols) =>
  Array.from(Array(nbRows), (r, id) => ({
    id,
    cols: Array.from(Array(nbCols), (c, id) => ({
      id,
      value: Math.random(),
    })),
  }))

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', ws => {
  console.log('connection')
  ws.on('message', message => {
    console.log('received: %s', message)
    for (let i = 0; i < message; i++) {
      ws.send(JSON.stringify(generateData(40, 10)))
    }
  })
})