export enum UserGender {
  female = 'female',
  other = 'other',
  male = 'male'
}

const toSys = {
  female: 'female',
  other: 'other',
  male: 'male'
}

const toHuman = {
  female: 'Feminino',
  male: 'Masculino',
  other: 'Outro'
}

export const UserGenderEnum = {
  availableHuman: Object.values(toHuman),
  availableSys: Object.values(toSys),
  toHuman,
  toSys
}
