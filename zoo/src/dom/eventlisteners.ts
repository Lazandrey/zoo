import { Animals } from "../feature/animal/animal";
import { Zookeepers } from "../feature/emploee/employee";
import { Logger } from "../feature/logger/logger";

export const animalTypechangeEvent = () => {
  const typeSelect = document.getElementById(
    "animal-type"
  ) as HTMLSelectElement;
  const maxSpeedInput = document.getElementById(
    "animal-maxspeed"
  ) as HTMLInputElement;
  const originInput = document.getElementById(
    "animal-origin"
  ) as HTMLInputElement;
  const weight = document.getElementById("animal-weight") as HTMLInputElement;
  switch (typeSelect.value) {
    case "Zebra": {
      maxSpeedInput.style.display = "inline";
      originInput.style.display = "inline";
      weight.style.display = "none";
      break;
    }
    case "Elephant": {
      maxSpeedInput.style.display = "none";
      originInput.style.display = "none";
      weight.style.display = "inline";
      break;
    }
    default: {
      maxSpeedInput.style.display = "none";
      originInput.style.display = "none";
      weight.style.display = "none";
    }
  }
};

export const addEmployeeEvent = () => {
  const employeeInput = document.getElementById(
    "employee-name"
  ) as HTMLInputElement;

  Zookeepers.instance.addZookeeper(employeeInput.value);
};

export const addAnimalEvent = () => {
  const animalNameInput = document.getElementById(
    "animal-name"
  ) as HTMLInputElement;

  const animalAgeInput = document.getElementById(
    "animal-age"
  ) as HTMLInputElement;
  const animalTypeInput = document.getElementById(
    "animal-type"
  ) as HTMLSelectElement;

  switch (animalTypeInput.value) {
    case "Zebra": {
      const animalMaxSpeedInput = document.getElementById(
        "animal-maxspeed"
      ) as HTMLInputElement;
      const animalOriginInput = document.getElementById(
        "animal-origin"
      ) as HTMLInputElement;

      Animals.instance.addAnimal({
        name: animalNameInput.value,
        age: Number(animalAgeInput.value),
        type: animalTypeInput.value,
        maxSpeed: animalMaxSpeedInput.value,
        origin: animalOriginInput.value,
        weight: "",
        isWasOutside: false,
      });

      console.log(Animals.instance.getAllAnimals());
      break;
    }
    case "Elephant": {
      const weight = document.getElementById(
        "animal-weight"
      ) as HTMLInputElement;

      Animals.instance.addAnimal({
        name: animalNameInput.value,
        age: Number(animalAgeInput.value),
        type: animalTypeInput.value,
        maxSpeed: "",
        origin: "",
        weight: weight.value,
        isWasOutside: false,
      });

      break;
    }
    case "Tiger": {
      Animals.instance.addAnimal({
        name: animalNameInput.value,
        age: Number(animalAgeInput.value),
        type: animalTypeInput.value,
        maxSpeed: "",
        origin: "",
        weight: "",
        isWasOutside: false,
      });
      console.log(Animals.instance.getAllAnimals());
      break;
    }
    default: {
      Logger.instance.logError("This animal type not exist", new Date());
    }
  }
};
