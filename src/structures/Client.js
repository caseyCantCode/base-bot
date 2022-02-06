const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = class Bot extends Client {
  constructor() {
    super({
      intents: [
        "GUILDS",
        "DIRECT_MESSAGE_REACTIONS",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_MEMBERS",
        "GUILD_MESSAGES",
        "GUILD_PRESENCES",
        "GUILD_VOICE_STATES",
      ],
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
      restTimeOffset: 60,
    });

    this.commands = new Collection();
    this.aliases = new Collection();
  }

  run() {
    this.login(process.env.token);

    this.loadCommands();
    this.loadEvents();
  }

  async loadCommands() {
    for (const dir of readdirSync("./src/commands"))
      for (const file of readdirSync(`./src/commands/${dir}`)) {
        const command = new (await require(`../commands/${dir}/${file}`))(this);

        console.log(`Loaded command: ${command.name}`);

        this.commands.set(command.name, command);

        if (command.aliases)
          command.aliases.map((al) => this.aliases.set(al, command.name));
      }
  }

  async loadEvents() {
    for (const dir of readdirSync("./src/events"))
      for (const file of readdirSync(`./src/events/${dir}`)) {
        const event = new (await require(`../events/${dir}/${file}`))(this);

        console.log(
          `Loaded event: ${file.replace(".ts", "").replace(".js", "")}`
        );

        this.on(
          file.replace(".js", ""),
          async (...args) => await event.run(...args)
        );
      }
  }
};
