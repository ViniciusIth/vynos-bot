import {
  ApplicationCommandRegistryRegisterOptions,
  ChatInputCommand,
  Command,
} from '@sapphire/framework';
import config from 'config';
import { buildProfile } from 'embeds';
import { Character } from 'schemas/character';

export class GetProfileCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'profile',
      description: 'get the character basic profile by id or by user',
    });
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
          .setName(this.name)
          .setDescription(this.description)
          .addStringOption((option) =>
            option
              .setName('character_id')
              .setDescription('The chosen character')
          );
      }
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const characterId = interaction.options.get('character_id')?.value;
    let character = null;

    if (characterId) {
      character = await Character.findById(characterId).exec();
    } else {
      character = await Character.findOne({
        userId: interaction.user.id,
      }).exec();
    }

    if (!character) {
      interaction.reply({ content: 'Character not found', ephemeral: true });
      return;
    }

    const profileEmbed = buildProfile(character as any);

    interaction.reply({ embeds: [profileEmbed] });
  }
}
