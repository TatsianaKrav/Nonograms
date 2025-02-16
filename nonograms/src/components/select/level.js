import { ElementCreator } from "../../utils/elementCreator.js";

export class Level extends ElementCreator {
    constructor(levelName, parent, container, menu) {
        super('select', 'levels');
        this.levelName = levelName;
        this.parent = parent;
        this.container = container;
        this.menu = menu;

        this.create();
        this.setCallback('change', this.change.bind(this));
    }

    create() {
        const options = ['Easy', 'Medium', 'Hard'];

        for (let i = 0; i < options.length; i++) {
            const option = new ElementCreator('option', '', options[i], { value: options[i] });

            if (options[i] === this.levelName) {
                option.setAttributes({ selected: '' });
            }
            this.append(option);
        }
    }

    restore(savedLevel, gameName, container, restored) {
        this.parent.updateGamesSelect(savedLevel, gameName, container, '', restored);
    }

    change(gameName) {
        const openedBurger = this.menu.checkCLasses('open');
        this.parent.updateGamesSelect(this.getValue(), gameName, this.container, openedBurger);
    }

    getValue() {
        return this.getElement().value;
    }

    setValue(value) {
        const options = this.getElement().options;
        const option = Array.from(options).find(el => el.innerText.toLowerCase() === value);
        option.setAttribute('selected', '');
    }
}