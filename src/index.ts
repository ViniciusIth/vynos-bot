import { SapphireClient } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import config from './config';

const client = new SapphireClient({
  loadMessageCommandListeners: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

console.log(new Date().toTimeString() + '\n');

client.login(config.token);
