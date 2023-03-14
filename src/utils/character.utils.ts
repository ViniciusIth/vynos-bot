import { Client } from 'discord.js';
import { ICharacter } from '../schemas/character';
import { getMessage } from './misc.utils';
import buildDetails from '../embeds/character_details';
import buildStatus from '../embeds/character_status';

export async function reloadCharacterSheet(
  character: ICharacter,
  client: Client
) {
  const message = await getMessage(
    character.guildChannelId,
    character.embedMessageId,
    client
  );

  const characterDetails = buildDetails(character);
  const characterStatus = buildStatus(character);

  await message.edit({ embeds: [characterDetails, characterStatus] });
}

export function getDecimalPart(number: number) {
  return Math.floor((number - 100) / 10);
}
