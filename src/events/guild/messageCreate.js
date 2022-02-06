const { Message } = require("discord.js");

const Event = require("../../structures/meta/Event");
const Context = require("../../structures/meta/Context");

const PREFIX = "gm?";

module.exports = class MessageCreate extends Event {
  constructor(client) {
    super(client);
  }

  /**
   * @param {Message} message
   */
  async run(message) {
    if (
      message.author.bot ||
      !message.guild ||
      !message.content.startsWith(PREFIX)
    )
      return;

    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (!cmd.length) return;

    const ctx = new Context({
      client: this.client,
      query: args.join(" "),
      message,
      args,
    });

    const command = ctx.resolveCommand(cmd);
    if (!command) return;

    await command.run(ctx);
  }
};
