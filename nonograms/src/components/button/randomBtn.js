import { Button } from "./button.js";
import { easy, medium, hard } from "../../data.js";


export class RandomGameBtn extends Button {
    constructor(container) {
        super('Random game', 'random-btn');
        this.container = container;

        this.setCallback('click', this.create.bind(this));
    }

    create() {
        const allGames = easy.concat(medium).concat(hard);

        let random = Math.floor(Math.random() * allGames.length);
        let randomGame = allGames[random];

        this.container.recreate(randomGame.level, randomGame.name);
    }
}