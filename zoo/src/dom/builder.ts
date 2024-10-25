import { Animals } from "../feature/animal/animal";
import { AnimalTypeArray, ZebraType } from "../feature/animal/animal.types";
import { Zookeepers } from "../feature/emploee/employee";
import { Logger } from "../feature/logger/logger";
import { CreateDialog } from "./dialog/dialog";

export const animalTypeSelectBuild = () => {
  const animalTypeSelect = document.getElementById(
    "animal-type"
  ) as HTMLSelectElement;
  let sel: HTMLOptionElement;
  AnimalTypeArray.forEach((t) => {
    sel = document.createElement("option");
    sel.value = t;
    sel.text = t;
    animalTypeSelect.append(sel);
  });
};

export const updateLogsList = () => {
  const logsList = document.getElementById(
    "log-table-body"
  ) as HTMLTableSectionElement;
  logsList.innerHTML = "";
  Logger.instance.getAlllogs().forEach((l) => {
    const row = document.createElement("tr");
    const rowText = document.createElement("td");
    const rowDate = document.createElement("td");
    rowText.innerText = l.msg;
    rowDate.innerText = l.msgDate.toLocaleString("lt-LT");
    row.append(rowText, rowDate);
    logsList.append(row);
  });
};

export const updateAnimalList = () => {
  const animalList = document.getElementById("animal-list") as HTMLDivElement;
  animalList.innerHTML = "";
  Animals.instance.getAllAnimals().forEach((a) => {
    const card = document.createElement("div");
    const name = document.createElement("h3");
    const age = document.createElement("p");
    const type = document.createElement("p");
    const sleepBtn = document.createElement("button");
    const walkBtn = document.createElement("button");

    const btnWrapper = document.createElement("div");

    card.classList.add("employee-card");
    btnWrapper.classList.add("employee-card-btn-wrapper");
    sleepBtn.innerText = "Sleep";
    walkBtn.innerText = "Walk";
    btnWrapper.append(sleepBtn, walkBtn);
    sleepBtn.addEventListener("click", () => {
      Animals.instance.getAnimalByName(a.name)?.sleep();
      a.isWasOutside = false;
      updateAnimalList();
    });
    walkBtn.addEventListener("click", () => {
      Animals.instance.getAnimalByName(a.name)?.walk();
      a.isWasOutside = true;
      updateAnimalList();
    });

    name.innerText = `Name: ${a.name}`;
    age.innerText = `Age: ${a.age}`;
    type.innerText = `Type: ${a.type}`;
    card.append(name, age, type);
    switch (a.type) {
      case "Zebra": {
        const maxSpeed = document.createElement("p");
        const origin = document.createElement("p");
        maxSpeed.innerText = `Max speed: ${a.maxSpeed}`;
        origin.innerText = `Origin: ${a.origin}`;
        card.append(maxSpeed, origin);
        const runBtn = document.createElement("button");
        const jumpBtn = document.createElement("button");
        runBtn.innerText = "Run";
        jumpBtn.innerText = "Jump";
        btnWrapper.append(runBtn, jumpBtn);
        runBtn.addEventListener("click", () => {
          Animals.instance.getAnimalByName(a.name)?.run();
          a.isWasOutside = true;
          updateAnimalList();
        });
        jumpBtn.addEventListener("click", () => {
          Animals.instance.getAnimalByName(a.name)?.jump();
          a.isWasOutside = true;
          updateAnimalList();
        });
        break;
      }
      case "Elephant": {
        const weight = document.createElement("p");
        weight.innerText = `Weight: ${a.weight}`;
        card.append(weight);

        break;
      }
      case "Tiger": {
        const isWasOutside = document.createElement("p");
        isWasOutside.innerText = `Tiger ${a.name} recently was outside: ${
          a.isWasOutside ? "yes" : "no"
        }`;
        card.append(isWasOutside);
        const swimBtn = document.createElement("button");
        const huntBtn = document.createElement("button");
        swimBtn.innerText = "Swim";
        huntBtn.innerText = "Hunt";
        btnWrapper.append(swimBtn, huntBtn);
        swimBtn.addEventListener("click", () => {
          Animals.instance.getAnimalByName(a.name)?.swim();
          a.isWasOutside = true;
          updateAnimalList();
        });
        huntBtn.addEventListener("click", () => {
          Animals.instance.getAnimalByName(a.name)?.hunt();
          a.isWasOutside = true;
          updateAnimalList();
        });
      }
    }
    card.append(btnWrapper);
    animalList.append(card);
  });
};

export const updateZookeepersList = () => {
  const employeeList = document.getElementById(
    "employee-list"
  ) as HTMLDivElement;
  employeeList.innerHTML = "";

  Zookeepers.instance.getAllZookeepers().forEach((z) => {
    const card = document.createElement("div");

    const name = document.createElement("h3");
    const atZoo = document.createElement("p");
    const lastTraining = document.createElement("p");
    const btnWrapper = document.createElement("div");
    const enterBtn = document.createElement("button");
    const trainingBtn = document.createElement("button");
    const feedBtn = document.createElement("button");

    card.classList.add("employee-card");
    btnWrapper.classList.add("employee-card-btn-wrapper");

    name.innerText = `Name: ${z.name}`;
    atZoo.innerText = `Employee at zoo: ${z.isEmployeeAtZoo ? "yes" : "no"}`;
    lastTraining.innerText = `Last safety training : ${
      z.safetyTrainingCompletionDate === null
        ? "no"
        : z.safetyTrainingCompletionDate.toLocaleString("lt-LT")
    }`;
    enterBtn.innerText = z.isEmployeeAtZoo ? "Leave zoo" : "Enter zoo";
    trainingBtn.innerText = "Safety training";
    feedBtn.innerText = "Feed animal";
    btnWrapper.append(enterBtn, trainingBtn, feedBtn);
    card.append(name, atZoo, lastTraining, btnWrapper);
    employeeList.append(card);
    enterBtn.addEventListener("click", () => {
      if (z.isEmployeeAtZoo) {
        Zookeepers.instance.getZookeperByName(z.name).leaveZoo();

        z.isEmployeeAtZoo = false;
      } else {
        Zookeepers.instance.getZookeperByName(z.name).enterZoo();
        z.isEmployeeAtZoo = true;
      }
      updateZookeepersList();
    });
    trainingBtn.addEventListener("click", () => {
      z.safetyTrainingCompletionDate = new Date();
      Zookeepers.instance.getZookeperByName(z.name).takeSafetyTrainings();
      updateZookeepersList();
    });
    feedBtn.addEventListener("click", () => {
      new CreateDialog("Feed", z.name);
    });
  });
};
