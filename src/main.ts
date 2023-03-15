import { SapphireClient } from '@sapphire/framework';
import config from 'config';
import { GatewayIntentBits } from 'discord.js';
import { connect, set } from 'mongoose';

const client = new SapphireClient({
  loadMessageCommandListeners: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
  ],
});

console.log(new Date().toTimeString() + '\n');

// Database options
set('strictQuery', true);
connect('mongodb://127.0.0.1:27017/vynos \n')
  .then((mongo) => console.log('Succesfully connected to DB. \n'))
  .catch((reason) => console.error(reason));

client.login(config.token);
