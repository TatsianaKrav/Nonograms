import { Game } from "./src/game.js";

const game = new Game();
localStorage.removeItem('theme');
game.init('Easy');

console.log('Для удобства проверки можно "зачеркивать"подсказки нажатием левой кнопки мыши');