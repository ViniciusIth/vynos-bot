import { EmbedBuilder } from 'discord.js';
import { ICharacter } from 'schemas/character';
import { getDecimalPart } from 'utils';

export function buildDetails(character: ICharacter) {
  const characterDetails = new EmbedBuilder()
    .setDescription(
      `
> Nome: ${character.name}
> Raça: ${character.race}
> ID: ${character.id}

**História**
${character.story}`
    )
    .setImage(character.imageUrl!)
    .addFields(
      {
        name: 'cha',
        value: `\`${character.attributes?.cha} ► ${getDecimalPart(
          character.attributes?.cha!
        )}\``,
        inline: true,
      },
      {
        name: 'con',
        value: `\`${character.attributes?.con} ► ${getDecimalPart(
          character.attributes?.con!
        )}\``,
        inline: true,
      },
      {
        name: 'dex',
        value: `\`${character.attributes?.dex} ► ${getDecimalPart(
          character.attributes?.dex!
        )}\``,
        inline: true,
      },
      {
        name: 'str',
        value: `\`${character.attributes?.str} ► ${getDecimalPart(
          character.attributes?.str!
        )}\``,
        inline: true,
      },
      {
        name: 'int',
        value: `\`${character.attributes?.int} ► ${getDecimalPart(
          character.attributes?.int!
        )}\``,
        inline: true,
      },
      {
        name: '᲼',
        value: '᲼',
        inline: true,
      }
    );

  return characterDetails;
}
