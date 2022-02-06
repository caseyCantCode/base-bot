const Command = require("../../structures/meta/Command");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["pong"],
      metadata: {
        usage: "",
        examples: [],
        category: "misc",
      },
    });
  }

  async run(ctx) {
    ctx.message.reply(`Pong! Bot ping: \`${ctx.client.ws.ping}\` ms!`);
  }
};
