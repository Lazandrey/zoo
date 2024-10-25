import { updateAnimalList } from "../../dom/builder";
import { CreateDialog } from "../../dom/dialog/dialog";
import { Logger } from "../logger/logger";
import {
  AnimalType,
  ZebraType,
  ElephantType,
  ListOfAnimalsType,
  AnyAnimalType,
  TigerType,
} from "./animal.types";

abstract class Animal {
  protected name: string;
  protected age: number;
  protected type: string;

  constructor({ name, age, type }: AnimalType) {
    this.name = name;
    this.age = age;
    this.type = type;
  }
  abstract makeSound(): void;
  getName(): string {
    return this.name;
  }
  getAge(): number {
    return this.age;
  }
  getAnimal(): AnimalType {
    return { name: this.name, age: this.age, type: this.type };
  }
}

abstract class SleepAndWalkAnimal extends Animal {
  sleep(): void {
    new CreateDialog("Action", "sleeping");
  }
  walk(): void {
    new CreateDialog("Action", "walking");
  }
}
abstract class JumpAndRunAnimal extends SleepAndWalkAnimal {
  jump(): void {
    super.walk();
    new CreateDialog("Action", "jumping");
  }
  run(): void {
    super.walk();
    new CreateDialog("Action", "running");
  }
}
abstract class SwimAndHuntAnimal extends SleepAndWalkAnimal {
  swim(): void {
    super.walk();
    new CreateDialog("Action", "swiming");
  }
  hunt(): void {
    super.walk();
    new CreateDialog("Action", "hunting");
  }
}

class Zebra extends JumpAndRunAnimal {
  private maxSpeed: string;
  private origin: string;

  constructor({ name, age, type, maxSpeed, origin }: ZebraType) {
    super({
      name,
      age,
      type,
    });

    this.maxSpeed = maxSpeed;
    this.origin = origin;
  }

  makeSound(): void {
    console.log("Zebra sound");
  }
  getAnimal(): ZebraType {
    return {
      name: this.name,
      age: this.age,
      type: this.type,
      maxSpeed: this.maxSpeed,
      origin: this.origin,
    };
  }
}

class Tiger extends SwimAndHuntAnimal {
  private isWasOutside: boolean = false;
  sleep(): void {
    super.sleep();
    this.isWasOutside = false;
    Logger.instance.log(`Tiger &{this.name} sleeped at`, new Date());
  }
  walk(): void {
    super.walk();
    this.isWasOutside = true;
    Logger.instance.log(`Tiger &{this.name} sleeped at`, new Date());
  }
  swim(): void {
    super.swim();
    this.isWasOutside = true;
  }
  hunt(): void {
    super.hunt();
    this.isWasOutside = true;
  }
  makeSound(): void {
    console.log("Tiger sound");
  }
  getIsWasOutside(): boolean {
    return this.isWasOutside;
  }
  getAnimal(): TigerType {
    return {
      name: this.name,
      age: this.age,
      type: this.type,
      isWasOutside: this.isWasOutside,
    };
  }
}
class Elephant extends SleepAndWalkAnimal {
  weight: string;

  constructor({ name, age, type, weight }: ElephantType) {
    super({
      name,
      age,
      type,
    });
    this.weight = weight;
  }
  makeSound(): void {
    console.log("Elephant sound");
  }
  getAnimal(): ElephantType {
    return {
      name: this.name,
      age: this.age,
      type: this.type,
      weight: this.weight,
    };
  }
}

export class Animals {
  animals: ListOfAnimalsType[] = [];
  static #instance: Animals;
  private constructor() {}
  public static get instance() {
    if (!Animals.#instance) {
      Animals.#instance = new Animals();
    }
    return Animals.#instance;
  }
  getAllAnimals(): ListOfAnimalsType[] {
    return this.animals;
  }
  getAnimalByName(name: string): Tiger | Zebra | Elephant | undefined {
    const z = this.animals.find((e) => e.name === name);
    if (z === undefined) {
      return undefined;
    }
    switch (z.type) {
      case "Zebra": {
        return new Zebra({
          name: z.name,
          age: z.age,
          type: z.type,
          maxSpeed: "",
          origin: "",
        });
      }
      case "Elephant": {
        return new Elephant({
          name: z.name,
          age: z.age,
          type: z.type,
          weight: "",
        });
      }
      case "Tiger": {
        return new Tiger({
          name: z.name,
          age: z.age,
          type: z.type,
        });
      }
    }
  }
  getIsNameexist(name: string): boolean {
    return this.animals.some((p) => p.name === name);
  }
  addAnimal(animal: AnyAnimalType): void {
    if (animal.name == "") {
      Logger.instance.logError(`Animal shoud have name`, new Date());
      return;
    }
    if (this.getIsNameexist(animal.name)) {
      Logger.instance.logError(
        `Animal ${animal.name} is alredy exist`,
        new Date()
      );
      return;
    }
    if (isNaN(Number(animal.age))) {
      Logger.instance.logError(`Animal age should  be number`, new Date());
      return;
    }

    switch (animal.type) {
      case "Zebra": {
        const zebra = new Zebra({
          name: animal.name,
          age: animal.age,
          type: animal.type,
          maxSpeed: animal.maxSpeed,
          origin: animal.origin,
        });
        this.animals.push(zebra.getAnimal());

        break;
      }
      case "Elephant": {
        const elephant = new Elephant({
          name: animal.name,
          age: animal.age,
          type: animal.type,
          weight: animal.weight,
        });
        this.animals.push(elephant.getAnimal());
        break;
      }
      case "Tiger": {
        const tiger = new Tiger({
          name: animal.name,
          age: animal.age,
          type: animal.type,
        });
        this.animals.push(tiger.getAnimal());
        break;
      }

      default: {
        Logger.instance.logError("This animal type not exist", new Date());
      }
    }
    updateAnimalList();
  }
}
