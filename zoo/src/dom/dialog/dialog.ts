import { Animals } from "../../feature/animal/animal";
import { Zookeepers } from "../../feature/emploee/employee";
import { DialogType } from "./dialog.types";

abstract class Dialog {}
class ErrorDialog extends Dialog {
  constructor(Msg: string) {
    super();
    const dialodWindow = document.getElementById(
      "dialog-window"
    ) as HTMLDialogElement;
    const dialodTitle = document.getElementById(
      "dialog-title"
    ) as HTMLHeadElement;

    const dialodText = document.getElementById(
      "dialog-text"
    ) as HTMLParagraphElement;

    dialodTitle.style.color = "red";
    dialodTitle.innerText = "Error";
    dialodText.innerText = Msg;
    dialodWindow.show();
  }
}

class ActionDialog extends Dialog {
  constructor(Msg: string) {
    super();
    const dialogWindow = document.getElementById(
      "dialog-action"
    ) as HTMLDialogElement;
    const dialodTitle = document.getElementById(
      "action-title"
    ) as HTMLHeadElement;

    const dialodText = document.getElementById(
      "action-text"
    ) as HTMLParagraphElement;

    dialodTitle.style.color = "black";
    dialodTitle.innerText = Msg;
    dialodText.innerText = "";

    dialogWindow.show();
    for (let i = 1; i <= 5; i++) {
      setTimeout(() => {
        dialodText.innerText += "*";
      }, i * 1000);
      setTimeout(() => {
        dialogWindow.close();
      }, 6 * 1000);
    }
  }
}

class FeedDialog extends Dialog {
  constructor(employeeName: string) {
    super();
    const dialogWindow = document.getElementById(
      "dialog-feed"
    ) as HTMLDialogElement;
    const feedList = document.getElementById("feed-list") as HTMLUListElement;
    console.log(feedList);
    feedList.innerHTML = "";
    Animals.instance.getAllAnimals().forEach((a) => {
      const line = document.createElement("li");
      line.innerText = `${a.type} ${a.name}`;
      feedList.append(line);
      line.addEventListener("click", () => {
        const zookeeper = Zookeepers.instance.getZookeperByName(employeeName);
        zookeeper.feedAnimal(a);
        dialogWindow.close();
      });
    });

    dialogWindow.show();
  }
}

export class CreateDialog {
  d: Dialog;
  constructor(type: DialogType, msg: string) {
    switch (type) {
      case "Error": {
        this.d = new ErrorDialog(msg);
        break;
      }
      case "Action": {
        this.d = new ActionDialog(msg);
        break;
      }
      case "Feed": {
        this.d = new FeedDialog(msg);
        break;
      }
      default: {
        this.d = new ErrorDialog("Incorrect dialog type");
      }
    }
  }
}
