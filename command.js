module.exports = {
    Ping: require('./ping'),
};

module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg, args) {
    //   msg.reply('pong');
    //   msg.channel.send('pong');
      const timeTaken = Date.now() - msg.createdTimestamp;
      msg.reply(`Pong! Hehe canda deng ini latency nya ${timeTaken}ms`)
    },
  };

  