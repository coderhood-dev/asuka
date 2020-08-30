module.exports = {
  name:'calculate',
  description: 'Calculates the expression asked for',
  execute(message, args){
    const expression = args.join('')
    message.channel.send(`The result is ${eval(expression)}, BAKA!`)
  }
}