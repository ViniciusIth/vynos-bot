import { Client } from 'discord.js';
import { buildDetails, buildStatus } from '../embeds';
import { ICharacter } from '../schemas/character';
import { getMessage } from './misc.utils';

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
