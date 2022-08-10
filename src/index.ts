import "./style.css";
import { UI } from "peasy-ui";
import monster from "./assets/whitemonster.png";
import card from "./assets/whitecard.png";
import building from "./assets/whitebuilding.png";
import effect from "./assets/whiteeffect.png";
import user from "./assets/whiteuser.png";

const myApp = document.getElementById("myApp");

const uiStringTemplate = `
  <div class="container">
    <div class="toast_container">
        <div  class="toast_entry" \${msg<=*messages} >
            <div class="toast_message">Card was played</div>
            <div  class="toast_img_container bloom">
                    <img class="toast_img" src="${card}" alt=""/>    
            </div>
            <div  class="toast_close">X</div>
        </div>
    </div>
    <button \${click@=>click}>Toast</button>
    <button \${click@=>remove}>untoast</button>
    
  </div>
`;

const model = {
  click: (event, model) => {
    model.messages.push({});
  },
  remove: (event, model) => {
    let numelements = model.messages.length;
    if (numelements > 0) {
      let index = Math.floor(Math.random() * numelements);
      model.messages.splice(index, 1);
    }
  },
  messages: [],
};
const myUI = UI.create(myApp, uiStringTemplate, model);

setInterval(() => UI.update(), 1000 / 60);
