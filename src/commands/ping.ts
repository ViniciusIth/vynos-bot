import { isMessageInstance } from '@sapphire/discord.js-utilities';
import {
  ApplicationCommandRegistryRegisterOptions,
  ChatInputCommand,
  Command,
} from '@sapphire/framework';
import type { Message } from 'discord.js';
import config from '../config';

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ping',
      aliases: ['pong'],
      description: 'ping pong',
    });
  }

  public async messageRun(message: Message) {
    const msg = await message.channel.send('Ping?');

    const content = `Pong from JavaScript! Bot Latency ${Math.round(
      this.container.client.ws.ping
    )}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`;

    return msg.edit(content);
  }

  public override registerApplicationCommands(
    registry: ChatInputCommand.Registry
  ) {
    registry.registerChatInputCommand(
      (builder, options?: ApplicationCommandRegistryRegisterOptions) => {
        if (config.production === true) {
          options!.guildIds = ['749770507817189508'];
        }
        builder
          .setName('ping')
          .setDescription('Ping bot to see if it is alive');
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      content: `Ping?`,
      ephemeral: true,
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      const diff = msg.createdTimestamp - interaction.createdTimestamp;
      const ping = Math.round(this.container.client.ws.ping);
      return interaction.editReply(
        `Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`
      );
    }

    return interaction.editReply('Failed to retrieve ping :(');
  }
}
