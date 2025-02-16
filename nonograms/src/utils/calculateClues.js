export function calculateClues(nonogram) {
    let maxTop = 0;
    let maxLeft = 0;

    nonogram.topClues.forEach((item) => {
        maxTop = item.length > maxTop ? item.length : maxTop;
    });

    nonogram.leftClues.forEach((item) => {
        maxLeft = item.length > maxLeft ? item.length : maxLeft;
    });

    return [maxTop, maxLeft];
}