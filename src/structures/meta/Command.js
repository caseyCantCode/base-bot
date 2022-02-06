const Context = require("./Context");

module.exports = class Command {
  constructor(client, data) {
    this.client = client;

    this.name = data.name;
    this.aliases = data.aliases;
    this.metadata = data.metadata;
  }

  /**
   * @param {Context} ctx
   */
  async run(ctx) {
    console.log("error");
  }
};
