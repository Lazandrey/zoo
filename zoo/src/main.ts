import { animalTypeSelectBuild } from "./dom/builder";
import {
  addAnimalEvent,
  addEmployeeEvent,
  animalTypechangeEvent,
} from "./dom/eventlisteners";
import "./style.css";

const addEmployeeButton = document.getElementById(
  "add-employee"
) as HTMLInputElement;
const addAnimalButton = document.getElementById(
  "add-animal"
) as HTMLInputElement;
const typeSelect = document.getElementById("animal-type") as HTMLSelectElement;

typeSelect.addEventListener("change", () => {
  animalTypechangeEvent();
});

addEmployeeButton.addEventListener("click", () => {
  addEmployeeEvent();
});

addAnimalButton.addEventListener("click", () => {
  addAnimalEvent();
});

const initApp = () => {
  animalTypeSelectBuild();
};

initApp();
