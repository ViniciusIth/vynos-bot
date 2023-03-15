import {
  ApplicationCommandRegistryRegisterOptions,
  ChatInputCommand,
  Command,
} from '@sapphire/framework';
import { Subcommand } from '@sapphire/plugin-subcommands';
import config from 'config';
import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js';
import { charNotFoundError } from 'embeds';
import { Character } from 'schemas/character';
import { reloadCharacterSheet } from 'utils';

export class SetCharacterCommand extends Subcommand {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'set',
      subcommands: [
        {
          name: 'attributes',
          chatInputRun: 'chatInputAttributes',
        },
        {
          name: 'image',
          chatInputRun: 'chatInputImage',
        },
        {
          name: 'status',
          chatInputRun: 'chatInputStatus',
        },
        {
          name: 'story',
          chatInputRun: 'chatInputStory',
        },
      ],
    });
  }

  registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand(
      (builder, options?: ApplicationCommandRegistryRegisterOptions) => {
        if (config.production === true) {
          options!.guildIds = ['749770507817189508'];
        }

        builder
          .setName('set')
          .setDescription('set')
          .addSubcommand((command) =>
            command
              .setName('attributes')
              .setDescription('Sets the user attributes')
              .addStringOption((option) =>
                option
                  .setName('attribute')
                  .setDescription('The attribute to change')
                  .setRequired(true)
                  .addChoices(
                    { name: 'STR', value: 'str' },
                    { name: 'DEX', value: 'dex' },
                    { name: 'CON', value: 'con' },
                    { name: 'CHA', value: 'cha' },
                    { name: 'INT', value: 'int' }
                  )
              )
              .addIntegerOption((option) =>
                option
                  .setName('value')
                  .setDescription('The new value for the attribute')
                  .setRequired(true)
              )
          )
          .addSubcommand((command) =>
            command
              .setName('image')
              .setDescription('changes character image')
              .addStringOption((option) =>
                option
                  .setName('character_image_url')
                  .setDescription('New image url')
                  .setRequired(true)
              )
          )
          .addSubcommand((command) =>
            command
              .setName('status')
              .setDescription('allows for status definition')
              .addStringOption((option) =>
                option
                  .setName('status')
                  .setDescription('The status to change')
                  .setRequired(true)
                  .addChoices(
                    { name: 'LVL', value: 'level' },
                    { name: 'HP', value: 'maxHealth' },
                    { name: 'PE', value: 'maxEter' }
                  )
              )
              .addIntegerOption((option) =>
                option
                  .setName('value')
                  .setDescription('The new value for the status')
                  .setRequired(true)
              )
          )
          .addSubcommand((command) =>
            command
              .setName('story')
              .setDescription('Sets the character story side')
          );
      }
    );
  }

  public async chatInputAttributes(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const attribute = interaction.options.get('attribute')?.value as string;
    const newValue = interaction.options.get('value')?.value;

    const updateObj: any = {};
    updateObj['attributes.' + attribute] = newValue;

    console.log(JSON.stringify(updateObj));

    const character = await Character.findOneAndUpdate(
      { guildChannelId: interaction.channelId },
      updateObj,
      { new: true }
    ).exec();

    if (!character) {
      interaction.reply({
        embeds: [charNotFoundError(interaction)],
        ephemeral: true,
      });
      return;
    }

    await reloadCharacterSheet(character, interaction.client);

    await interaction.reply({
      content: 'Valor atualizado com sucesso',
      ephemeral: true,
    });
  }

  public async chatInputImage(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const characterImage = interaction.options.get(
      'character_image_url'
    )?.value;

    try {
      const character = await Character.findOneAndUpdate(
        {
          $or: [
            { guildChannelId: interaction.channelId },
            { userId: interaction.user.id },
          ],
        },
        { imageUrl: characterImage },
        { new: true }
      ).exec();

      if (!character) {
        interaction.reply({
          embeds: [charNotFoundError(interaction)],
          ephemeral: true,
        });
        return;
      }

      await reloadCharacterSheet(character, interaction.client);

      interaction.reply({
        content: 'Image set successfully ✅',
        ephemeral: true,
      });
    } catch (error) {
      console.error(`Error updating character image:\n ${error}`);
      interaction.reply({
        content: 'There was an error updating the character image ❌',
        ephemeral: true,
      });
    }
  }

  public async chatInputStatus(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const status = interaction.options.get('status')?.value as string;
    const newValue = interaction.options.get('value')?.value;

    const updateObj: any = {};
    updateObj[status] = newValue;

    console.log(JSON.stringify(updateObj));

    const character = await Character.findOneAndUpdate(
      {
        $or: [
          { guildChannelId: interaction.channelId },
          { userId: interaction.user.id },
        ],
      },
      updateObj,
      { new: true }
    ).exec();

    if (!character) {
      interaction.reply({
        embeds: [charNotFoundError(interaction)],
        ephemeral: true,
      });
      return;
    }

    await reloadCharacterSheet(character, interaction.client);

    interaction.reply({
      content: `${status} set to ${newValue}`,
      ephemeral: true,
    });
  }

  public async chatInputStory(
    interaction: Command.ChatInputCommandInteraction
  ) {
    const character = await Character.findOne({
      $or: [
        { guildChannelId: interaction.channelId },
        { userId: interaction.user.id },
      ],
    });

    if (!character) {
      interaction.reply({
        embeds: [charNotFoundError(interaction)],
        ephemeral: true,
      });
      return;
    }

    const modal = new ModalBuilder()
      .setTitle('Character Story')
      .setCustomId('set_story');

    const characterStoryInput = new TextInputBuilder()
      .setCustomId('character_story')
      .setLabel('Character Story')
      .setStyle(TextInputStyle.Paragraph);

    const firstActionRow: any = new ActionRowBuilder().addComponents(
      characterStoryInput
    );

    modal.addComponents(firstActionRow);

    await interaction.showModal(modal);
  }
}
