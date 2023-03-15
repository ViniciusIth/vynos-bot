import {
  InteractionHandler,
  InteractionHandlerTypes,
  PieceContext,
} from '@sapphire/framework';
import type { ModalSubmitInteraction } from 'discord.js';
import * as colors from 'colors';
import { Character } from 'schemas/character';
import { reloadCharacterSheet } from 'utils';

export class ModalHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.ModalSubmit,
    });
  }

  public override parse(interaction: ModalSubmitInteraction) {
    if (interaction.customId !== 'set_story') return this.none();

    return this.some();
  }

  public async run(interaction: ModalSubmitInteraction) {
    const characterStory =
      interaction.fields.getTextInputValue('character_story');

    try {
      const character = await Character.findOneAndUpdate(
        {
          guildChannelId: interaction.channelId,
        },
        {
          story: characterStory,
        },
        { new: true }
      ).exec();

      if (!character) {
        interaction.reply({
          content: 'É necessário utilizar este comando no seu canal!',
          ephemeral: true,
        });
        return;
      }

      await reloadCharacterSheet(character, interaction.client);

      interaction.reply({
        content: 'Story edited successfully ✅',
        ephemeral: true,
      });
    } catch (error) {
      console.error(
        `Error updating character story:\n ${colors.red(error as string)}`
      );
      interaction.reply({
        content: 'There was an error updating the character story ❌',
        ephemeral: true,
      });
    }
  }
}
