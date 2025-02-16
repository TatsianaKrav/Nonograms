import { Audio } from "../components/audio/audio.js";
import { Timer } from "../components/timer/timer.js";
import { PopupResult } from "../components/popup/popupResult.js";

export function checkGameEnd() {
    let result = false;
    const game = JSON.parse(localStorage.getItem('currGame'));
    let currentGameFilledCells = 0;
    const currentGameCells = document.querySelectorAll(
        "td:not(.left-cell):not(.top-cell)"
    );

    Array.from(currentGameCells).forEach((item) => {
        if (item.classList.contains("filled")) {
            currentGameFilledCells++;
        }
    });

    const nonogramFilledCells = game.image
        .flat()
        .filter((item) => item === 1).length;

    if (currentGameFilledCells === nonogramFilledCells) {
        result = checkResult(game);
    }

    return result;
}

export function handleGameEnd(timer, scoreTable, container, soundObj) {
    const result = checkGameEnd();
    const game = JSON.parse(localStorage.getItem('currGame'));

    if (result) {
        const currentField = document.getElementsByClassName('field')[0];

        if (currentField.classList.contains('continue')) {
            const savedTimer = JSON.parse(localStorage.getItem("savedGame")).timer;
            const currentTimer = document.getElementsByClassName('timer')[0];
            const currentTimerVal = currentTimer.innerText;

            const newTimer = new Timer();
            currentTimer.replaceWith(newTimer.getElement());
            Object.assign(timer, savedTimer);
            newTimer.setTime(currentTimerVal);
            timer.setTime(currentTimerVal);
        }

        const timerVal = timer.getTime();
        const sound = new Audio();
        const soundOff = soundObj.getValue();

        setTimeout(() => {
            const popup = new PopupResult(timerVal, container, game.name);
            popup.open();
            /* const sound = new Audio(); */
            timer.stop();

            if (!soundOff) {
                sound.win();
            }
        }, 1000)

        handleScoreTable(game, timer, scoreTable);
    }
}

function handleScoreTable(game, timer, scoreTable) {
    let lastGames = localStorage.getItem('lastGames');
    lastGames = lastGames === 'undefined' || !lastGames ? [] : JSON.parse(lastGames);

    const nonogram = {
        gameName: game.name,
        gameLevel: game.level,
        gameTime: timer.getTime(),
    };


    if (lastGames.length < 5) {
        lastGames.push(nonogram);
    } else {
        lastGames.shift();
        lastGames.push(nonogram);
    };

    const sortedLastGames = sortTable(lastGames);
    localStorage.setItem('lastGames', JSON.stringify(lastGames));

    scoreTable.update(sortedLastGames);
}

function checkResult(nonogram) {
    const currentGameCells = document.querySelectorAll(
        "td:not(.left-cell):not(.top-cell):not(.empty):not(.score-cell)"
    );

    const gameAnswers = String(nonogram.image.flat()).split(",").join("");

    let stringResult = "";

    Array.from(currentGameCells).forEach((item) => {
        if (item.classList.contains("filled")) {
            stringResult += "1";
        } else {
            stringResult += "0";
        }
    });

    return gameAnswers === stringResult;
}

function sortTable(arr) {
    arr.sort((a, b) => {
        return calculateTimer(a.gameTime) - calculateTimer(b.gameTime);
    });

    return arr;
}

function calculateTimer(time) {
    let minStr = time.slice(0, 2);
    let secStr = time.slice(3, 5);

    let min = Number(minStr);
    let sec = Number(secStr);

    min = min > 0 ? min * 60 : min;
    return min + sec;
}