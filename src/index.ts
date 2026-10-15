import 'dotenv/config';
import { Client, Events, GatewayIntentBits, MessageFlags } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c) => console.log(`Logged in as ${c.user.tag}`));

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'upload') {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral }); // buys time past the 3-second limit
    const file = interaction.options.getAttachment('file', true);
    await interaction.editReply(`Received ${file.name} (${file.size} bytes).`);
  }
});

client.login(process.env.DISCORD_TOKEN);