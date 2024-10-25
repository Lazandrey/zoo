import { updateZookeepersList } from "../../dom/builder";
import { AnyAnimalType, ListOfAnimalsType } from "../animal/animal.types";
import { Logger } from "../logger/logger";
import { EmployeeType } from "./employee.types";

abstract class Employee {
  private name: string;
  isEmployeeAtZoo: boolean = false;
  safetyTrainingCompletionDate: Date | null = null;
  abstract enterZoo(): void;
  abstract leaveZoo(): void;
  abstract takeSafetyTrainings(date: Date): void;
}

class Zookeeper implements Employee {
  private name: string;
  isEmployeeAtZoo: boolean = false;
  safetyTrainingCompletionDate: Date | null = null;
  constructor(
    name: string,
    isEmployeeAtZoo: boolean,
    safetyTrainingCompletionDate: Date | null
  ) {
    this.name = name;
    this.isEmployeeAtZoo = isEmployeeAtZoo;
    this.safetyTrainingCompletionDate = safetyTrainingCompletionDate;
  }
  getName(): string {
    return this.name;
  }
  enterZoo(): void {
    this.isEmployeeAtZoo = true;
    Logger.instance.log(`Zookeeper ${this.name} enters zoo at`, new Date());
  }
  leaveZoo(): void {
    this.isEmployeeAtZoo = false;
    Logger.instance.log(`Zookeeper ${this.name} leaves zoo at `, new Date());
  }
  takeSafetyTrainings(): void {
    this.safetyTrainingCompletionDate = new Date();
    Logger.instance.log(
      `Zookeeper ${this.name} complete safety training at`,
      this.safetyTrainingCompletionDate
    );
  }
  feedAnimal(animal: ListOfAnimalsType): void {
    Logger.instance.log(
      `Employee ${this.name} feed ${animal.type} ${animal.name} at`,
      new Date()
    );
  }
  getZookeeper(): EmployeeType {
    return {
      name: this.name,
      isEmployeeAtZoo: this.isEmployeeAtZoo,
      safetyTrainingCompletionDate: this.safetyTrainingCompletionDate,
    };
  }
}

export class Zookeepers {
  zookeepers: EmployeeType[] = [];
  static #instance: Zookeepers;
  private constructor() {}
  public static get instance(): Zookeepers {
    if (!Zookeepers.#instance) {
      Zookeepers.#instance = new Zookeepers();
    }
    return Zookeepers.#instance;
  }

  getIsNameexist(name: string): boolean {
    return this.zookeepers.some((p) => p.name === name);
  }
  addZookeeper(name: string): void {
    if (name == "") {
      Logger.instance.logError(`Employee shoud have name`, new Date());
      return;
    }
    if (this.getIsNameexist(name)) {
      Logger.instance.logError(`Employee ${name} is alredy exist`, new Date());
      return;
    }
    const zookeeper = new Zookeeper(name, false, null);
    this.zookeepers.push(zookeeper.getZookeeper());
    updateZookeepersList();
  }
  getAllZookeepers(): EmployeeType[] {
    return this.zookeepers;
  }
  getZookeperByName(name: string): Zookeeper {
    const z = this.zookeepers.find((e) => e.name === name);
    if (z === undefined) {
      return new Zookeeper(name, false, null);
    }
    return new Zookeeper(
      z.name,
      z.isEmployeeAtZoo,
      z.safetyTrainingCompletionDate
    );
  }
}
