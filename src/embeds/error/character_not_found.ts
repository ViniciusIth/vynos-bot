import { CommandInteraction, EmbedBuilder, HexColorString } from 'discord.js';

export function charNotFoundError(intr: CommandInteraction) {
  const errorEmbed = new EmbedBuilder()
    .setDescription('Personagem não encontrado, tente os seguintes passos:')
    .setColor('DarkRed')
    .addFields({
      name: 'Criar Novo Personagem',
      value: 'Rode o comando `/create_character` e preencha o formulário.',
    })
    .addFields({
      name: 'Tente Novamente',
      value:
        'Tente rodar o mesmo comando, mas desta vez no canal de sua ficha.',
    });

  return errorEmbed;
}
