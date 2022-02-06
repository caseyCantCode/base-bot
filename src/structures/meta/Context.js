module.exports = class Context {
  constructor(options) {
    this.client = options.client;
    this.args = options.args;
    this.query = options.query;
    this.message = options.message;
    this.moment = require("moment");
  }

  resolveCommand(name) {
    return (
      this.client.commands.get(name) ||
      this.client.commands.get(this.client.aliases.get(name))
    );
  }
};
