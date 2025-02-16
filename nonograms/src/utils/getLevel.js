import { easy, medium, hard } from "../data.js";

export function getLevel(level) {
    let nonograms = [];

    switch (level) {
        case "Easy":
            nonograms = easy;
            break;
        case "Medium":
            nonograms = medium;
            break;
        case "Hard":
            nonograms = hard;
            break;
        default:
            [];
    }

    return nonograms;
}
