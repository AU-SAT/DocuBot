import 'dotenv/config';
import { REST, Routes, SlashCommandBuilder } from 'discord.js';

const upload = new SlashCommandBuilder()
  .setName('upload')
  .setDescription("Upload a file to this channel's SharePoint folder")
  .addAttachmentOption((o) =>
    o.setName('file').setDescription('The file to upload').setRequired(true),
  );

const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

await rest.put(
  Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!),
  { body: [upload.toJSON()] },
);
console.log('Commands registered');