import { Schema, model } from 'mongoose';

export const CharacterSchema = new Schema<ICharacter>({
  userId: { type: String, required: true },
  guildChannelId: { type: String, required: true },
  embedMessageId: { type: String, required: true },
  messageColor: { type: String, default: '#66c0c0' },

  name: { type: String, required: true },
  race: { type: String, required: true },
  level: { type: Number, default: 1 },

  maxHealth: { type: Number, default: 10 },
  maxEter: { type: Number, default: 10 },

  imageUrl: { type: String, required: true },
  story: { type: String, default: '' },

  attributes: {
    str: { type: Number, default: 100 },
    dex: { type: Number, default: 100 },
    con: { type: Number, default: 100 },
    cha: { type: Number, default: 100 },
    int: { type: Number, default: 100 },
  },

  skills: {
    athletics: { type: Number, default: 0 },
    acrobatics: { type: Number, default: 0 },
    sleight_of_hand: { type: Number, default: 0 },
    stealth: { type: Number, default: 0 },
    history: { type: Number, default: 0 },
    reflex: { type: Number, default: 0 },
    aim: { type: Number, default: 0 },
    initiative: { type: Number, default: 0 },
    fortitude: { type: Number, default: 0 },
    will: { type: Number, default: 0 },
    acting: { type: Number, default: 0 },
    diplomacy: { type: Number, default: 0 },
    deception: { type: Number, default: 0 },
    intimidation: { type: Number, default: 0 },
    performance: { type: Number, default: 0 },
    persuasion: { type: Number, default: 0 },
    investigation: { type: Number, default: 0 },
    intuition: { type: Number, default: 0 },
    perception: { type: Number, default: 0 },
    religion: { type: Number, default: 0 },
    survival: { type: Number, default: 0 },
  },
});

export interface ICharacterAttributes {
  str: number;
  dex: number;
  con: number;
  cha: number;
  int: number;
}

export interface ICharacterSkills {
  athletics: number;
  acrobatics: number;
  sleight_of_hand: number;
  stealth: number;
  history: number;
  reflex: number;
  aim: number;
  initiative: number;
  fortitude: number;
  will: number;
  acting: number;
  diplomacy: number;
  deception: number;
  intimidation: number;
  performance: number;
  persuasion: number;
  investigation: number;
  intuition: number;
  perception: number;
  religion: number;
  survival: number;
}

export interface ICharacter {
  id: string;
  userId: string;
  guildChannelId: string;
  embedMessageId: string;
  messageColor: string;

  name: string;
  race: string;
  level: number;

  maxHealth: number;
  maxEter: number;

  imageUrl: string;
  story: string;

  attributes?: ICharacterAttributes;
  skills: ICharacterSkills;
}

export const Character = model('Character', CharacterSchema, 'characters');
