import { EmbedBuilder } from 'discord.js';
import { ICharacter } from '../schemas/character';

function buildProfile(character: ICharacter) {
  const characterProfile = new EmbedBuilder()
    .setDescription(
      `
> ${character.name}
> ${character.race}
> LVL: ${character.level}

**Aparência**
    `
    )
    .setImage(character.imageUrl!);

  return characterProfile;
}

export default buildProfile;
