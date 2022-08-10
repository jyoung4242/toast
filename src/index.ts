import "./style.css";
import { UI } from "peasy-ui";
import card from "./assets/whitecard.png";
import monster from "./assets/whitemonster.png";
import effect from "./assets/whiteeffect.png";
import user from "./assets/whiteuser.png";
import building from "./assets/whitebuilding.png";

const myApp = document.getElementById("myApp");

const uiStringTemplate = `
  <div class="container">
    <div class="toast_container">
        <div  class="toast_entry" \${msg<=*messages} >
            <div class="toast_message" \${===msg.showing}>\${msg.msg}</div>
            <div \${mouseover@=>msg.hover} \${mouseout@=>msg.leaving} class="toast_img_container bloom">
                    <img class="toast_img" src="\${msg.img}" alt=""/>    
            </div>
            <div data-id="\${msg.$index}" \${click@=>msg.close} class="toast_close">X</div>
        </div>
    </div>
    <button \${click@=>click}>Toast</button>
   
  </div>
`;

const model = {
  click: (event, model) => {
    let index = Math.floor(Math.random() * 5);
    let config = {
      timeOut: 20000,
      isShowing: false,
      get showing() {
        return this.isShowing;
      },
      hover: (event, model, element) => {
        element.classList.remove("bloom");
        model.msg.isShowing = true;
      },
      leaving: (event, model, element) => {
        model.msg.isShowing = false;
      },
      close: (_event, model, _element, _at, context) => {
        context.$parent.$model.messages = context.$parent.$model.messages.filter(m => m !== model.msg);
      },
    };
    switch (index) {
      case 0:
        config["img"] = card;
        config["msg"] = "Tower Defense Card has been played";
        break;
      case 1:
        config["img"] = monster;
        config["msg"] = "The goblin has attacked player 3";
        break;
      case 2:
        config["img"] = user;
        config["msg"] = "It is now Player 1's turn";
        break;
      case 3:
        config["img"] = effect;
        config["msg"] = "Player 3 cannot draw any cards this turn";
        break;
      case 4:
        config["img"] = building;
        config["msg"] = "The Cellar has gained an influence point";
        break;
      default:
        config["img"] = card;
        config["msg"] = "Tower Defense Card has been played";
        break;
    }

    model.messages.push(config);
  },

  messages: [],
};
const myUI = UI.create(myApp, uiStringTemplate, model);

setInterval(() => UI.update(), 1000 / 60);

setInterval(() => {
  //update all toast timers
  const numMessages = model.messages.length;
  if (numMessages > 0) {
    for (let index = numMessages - 1; index >= 0; index--) {
      if (!model.messages[index].isShowing) {
        model.messages[index].timeOut -= 500;
        if (model.messages[index].timeOut <= 0) {
          model.messages.splice(index, 1);
        }
      }
    }
  }
}, 500);
