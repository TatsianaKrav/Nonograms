import { FieldWrapper } from "./components/field-wrapper/field-wrapp.js";
import { ElementCreator } from "./utils/elementCreator.js";
import { ButtonsWrapper } from "./components/btns-wrapper/btnsWrapp.js";
import { SelectsWrapper } from "./components/selectsWrapp/selectsWrapp.js";
import { ScoreTableWrapper } from "./components/score-table-wrapper/scoreTableWrapp.js";
import { Theme } from "./components/theme/theme.js";
import { Burger } from "./components/burger/burger.js";


export class Game extends ElementCreator {
    fieldWrapper;
    btnsWrapper;
    levelObj;
    gameObj;

    constructor() {
        super('div', 'container');
    }

    init(levelName, gameName, restoreFlag) {
        this.menu = new ElementCreator('div', 'menu');
        this.menu.setCallback('click', (e) => {
            const target = e.target;

            if (target.classList.contains('open')) {
                this.menu.removeClasses('open');
            }
        })

        const selectsWrapper = new SelectsWrapper(levelName, gameName, this, this.menu);
        this.levelObj = selectsWrapper.getSelections()[0];
        this.gameObj = selectsWrapper.getSelections()[1];
        const scoreTableWrapper = new ScoreTableWrapper();
        const scoreTable = scoreTableWrapper.getScoreTable();
        const theme = new Theme();

        this.btnsWrapper = new ButtonsWrapper(this.levelObj, this);
        this.fieldWrapper = new FieldWrapper(this.levelObj, this.gameObj, scoreTable, this, '', restoreFlag);
        const timer = this.fieldWrapper.getTimer();
        const field = this.fieldWrapper.getField();
        const currentGame = this.fieldWrapper.getCurrentGame();
        this.btnsWrapper.create(timer, field, currentGame);

        this.burger = new Burger(this.menu);


        this.menu.append(selectsWrapper, this.btnsWrapper, theme, scoreTableWrapper);
        this.append(this.burger, this.menu, this.fieldWrapper);
        this.prependTo(document.body);
    }

    recreate(levelName, gameName, openedBurger, restored) {
        Array.from(this.getChildren()).forEach(child => child.remove());
        this.init(levelName, gameName, restored);
        if (openedBurger) this.menu.setClasses('open');
    }
}

