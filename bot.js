const mineflayer = require('mineflayer')

function createBot() {
  const bot = mineflayer.createBot({
    host: '127.0.0.1',
    port: 25565,
    username: 'BiVN2K12',
    version: '1.21'
  })

  bot.once('spawn', () => {
    console.log('Bot đã spawn trong game!')
    setTimeout(() => bot.chat('/login Long2012@'), 2000)
    setTimeout(() => bot.chat('/warp afk'), 4000)
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
    }, 60000)
  })

  bot.on('end', () => {
    console.log('Bot bị disconnect, reconnect sau 5s...')
    setTimeout(createBot, 5000)
  })

  bot.on('kicked', reason => console.log('Bot bị kick:', reason))
  bot.on('error', err => console.log('Lỗi bot:', err))
}

createBot()