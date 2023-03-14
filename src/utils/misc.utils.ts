import { Client } from 'discord.js';

export async function getMessage(
  channelId: string,
  messageId: string,
  client: Client
) {
  const channel = client.channels.cache.get(channelId);

  if (!channel?.isTextBased()) {
    throw new Error('Tried to find message on non-text based channel');
  }

  return await channel.messages.fetch(messageId);
}
