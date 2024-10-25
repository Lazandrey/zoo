export const AnimalTypeArray = ["Zebra", "Tiger", "Elephant"];
type AnimalTypes = (typeof AnimalTypeArray)[number];
export type AnimalType = {
  name: string;
  age: number;
  type: AnimalTypes;
};

export type ZebraType = AnimalType & {
  maxSpeed: string;
  origin: string;
};

export type ElephantType = AnimalType & {
  weight: string;
};

export type TigerType = AnimalType & {
  isWasOutside: boolean;
};

export type AnyAnimalType = TigerType & ZebraType & ElephantType;
export type ListOfAnimalsType = TigerType | ZebraType | ElephantType;
