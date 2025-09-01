const mc = require('minecraft-protocol')

const proxyServer = mc.createServer({
  'online-mode': false,
  host: '0.0.0.0',
  port: 25565,
  version: '1.21'
})

proxyServer.on('login', client => {
  console.log(`Client ${client.username} joined proxy`)

  const server = mc.createClient({
    host: 'mbasic7.pikamc.vn',
    port: 25219,
    username: client.username,
    version: '1.21',
    'online-mode': false
  })

  client.on('packet', (data, meta) => { server.write(meta.name, data) })
  server.on('packet', (data, meta) => { client.write(meta.name, data) })

  server.on('end', () => client.end())
  client.on('end', () => server.end())
})