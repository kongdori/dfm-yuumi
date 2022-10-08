module.exports = {
  data: {
    name: 'normalLotusCreate',
  },
  async execute(interaction) {
    interaction.reply({
      content: '등록 되었습니다.',
    });
  },
};
