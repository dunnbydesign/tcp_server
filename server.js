'use strict'

const net = require('net')
const fs = require('fs')
const uuid = require('node-uuid')

var server = net.createServer(socket => {
  var requestData = ''

  socket.setEncoding('utf8')

  socket.on('data', data => {
    console.log('********** CONNECTION STARTED **********')
    requestData += data
  })

  socket.on('end', () => {
    console.log('########## CONNECTION ENDED ##########')
    fs.writeFile(__dirname + '/logs/request_log_' + uuid.v1() + '.txt', requestData, err => {
      if (err) throw err
      console.log('Saved request data to unique file')
    })
  })
})

server.listen(3000, () => {
  console.log('TCP server bound to port 3000 ...')
})
