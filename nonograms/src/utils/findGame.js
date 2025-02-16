import { easy, hard, medium } from "../data.js";
import { getLevel } from "./getLevel.js";

const allGames = easy.concat(medium).concat(hard);

export function findGame(gameName) {
    return allGames.find(game => game.name === gameName);
}

export function findNextGame(gameName) {
    const currentGame = findGame(gameName);
    const currentLevelGames = getLevel(currentGame.level);
    let currentGameIndex = currentLevelGames.indexOf(currentGame);

    const nextGameIndex = currentGameIndex < 4 ? ++currentGameIndex : 0;

    return currentLevelGames[nextGameIndex];
}