const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('말랑-로터스')
    .setDescription('말랑 로터스 모집'),
  async execute(interaction) {
    // 방 생성
    const modal = new ModalBuilder()
      .setCustomId('normalLotusCreate')
      .setTitle('말랑 로터스 모집');

    // 스레드 타이틀
    const threadTitleInput = new TextInputBuilder()
      .setCustomId('threadTitleInput')
      .setLabel('방(출발 시간) 제목')
      .setMinLength(1)
      .setRequired(true)
      .setStyle(TextInputStyle.Short);

    const threadTitleRow = new ActionRowBuilder().addComponents(
      threadTitleInput
    );

    const hobbiesInput = new TextInputBuilder()
      .setCustomId('hobbiesInput')
      .setLabel("What's some of your favorite hobbies?")
      // Paragraph means multiple lines of text.
      .setStyle(TextInputStyle.Paragraph);

    const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

    modal.addComponents(threadTitleRow, secondActionRow);

    await interaction.showModal(modal);
  },
};
