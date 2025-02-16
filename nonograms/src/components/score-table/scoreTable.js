import { ElementCreator } from "../../utils/elementCreator.js";

export class ScoreTable extends ElementCreator {
    constructor(currentTheme) {
        super('table', 'score');
        this.currentTheme = currentTheme;

        this.create();
    }

    create() {
        const options = ['', 'Game', 'Level', 'Time'];

        const tHead = new ElementCreator('thead');
        this.tBody = new ElementCreator('tbody');

        const row = this.createRow(options);
        tHead.append(row);

        if (this.currentTheme) this.setClasses('dark');

        //render results
        let lastGames = localStorage.getItem('lastGames');

        if (lastGames) {
            lastGames = JSON.parse(lastGames);

            for (let i = 0; i < lastGames.length; i++) {

                const options = [i + 1, lastGames[i].gameName, lastGames[i].gameLevel, lastGames[i].gameTime];
                const row = this.createRow(options);
                this.tBody.append(row);
            }
        }

        this.append(tHead, this.tBody)
    }

    update(arr) {
        const rows = this.tBody.getChildren();

        if (rows.length < arr.length) {
            const diff = arr.length - rows.length;

            for (let i = rows.length; i < arr.length; i++) {

                const options = [i + 1, arr[i].gameName, arr[i].gameLevel, arr[i].gameTime];
                const row = this.createRow(options);
                this.tBody.append(row);
            }

        } else {
            const newtBody = new ElementCreator('tbody');
            this.tBody.getElement().replaceWith(newtBody.getElement());
            Object.assign(this.tBody, newtBody);

            for (let i = 0; i < arr.length; i++) {

                const options = [i + 1, arr[i].gameName, arr[i].gameLevel, arr[i].gameTime];
                const row = this.createRow(options);
                this.tBody.append(row);
            }
        }
    }


    createRow(options) {
        const row = new ElementCreator('tr');

        options.forEach((option) => {
            const cell = new ElementCreator('td', 'score-cell', option);
            row.append(cell);
        })

        return row;
    }
}