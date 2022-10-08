const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const listenFolders = ['commands', 'submissions'];

for (const folder of listenFolders) {
  client[folder] = new Collection();

  const listenPath = path.join(__dirname, folder);
  const listenFiles = fs
    .readdirSync(listenPath)
    .filter((file) => file.endsWith('.js'));

  for (const file of listenFiles) {
    const filePath = path.join(listenPath, file);
    const imported = require(filePath);
    client[folder].set(imported.data.name, imported);
  }
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  } else if (interaction.isModalSubmit()) {
    const submissions = client.submissions.get(interaction.customId);

    if (!submissions) return;

    try {
      await submissions.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: 'There was an error while executing this submissions!',
        ephemeral: true,
      });
    }
  } else {
    return;
  }
});

client.login(token);
