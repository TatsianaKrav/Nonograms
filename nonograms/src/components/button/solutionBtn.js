import { Button } from "../button/button.js";

export class SolutionBtn extends Button {
    constructor(currentGame, timer, container) {
        super('Solution', 'solution-btn');
        this.currentGame = currentGame;
        this.timer = timer;
        this.container = container;

        this.setCallback('click', this.show.bind(this));
    }

    show() {
        const gameAnswers = String(this.currentGame.image.flat()).split(",").join("");

        const cells = document.querySelectorAll(
            "td:not(.left-cell):not(.top-cell):not(.empty):not(.score-cell)"
        );

        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove('not');
            cells[i].classList.remove('filled');

            if (gameAnswers[i] === "1") {
                cells[i].classList.add('filled');
            }
        }

        const field = document.getElementsByClassName('field')[0];
        field.classList.add('done');

        if (field.classList.contains('continue')) {
           /*  const savedTimer = JSON.parse(localStorage.getItem("savedGame")).timer;
            Object.assign(this.timer, savedTimer);
            this.timer.id = savedTimer.id;
            this.timer.stop(); */

         /*    localStorage.removeItem('savedGame'); */

          /*   Object.assign(this.timer, this.container.fieldWrapper.timer);
            this.timer.restore();
            this.timer.stop();
            clearInterval(this.timer.id);
            console.log(this.timer); */

          /*   console.log(this.container.fieldWrapper.timer); */
        }

      /*   console.log(this.timer); */

        clearInterval(this.timer.id);
    }
} 