const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('말랑-로터스')
    .setDescription('말랑 로터스 모집'),
  async execute(interaction) {
    return interaction.reply('Pong!');
  },
};
