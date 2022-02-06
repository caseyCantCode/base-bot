const Event = require("../../structures/meta/Event");

module.exports = class Ready extends Event {
  constructor(client) {
    super(client);
  }

  async run(client) {
    console.log(
      `${client.user.tag} is now online in ${client.guilds.cache.size} guilds`
    );
  }
};
