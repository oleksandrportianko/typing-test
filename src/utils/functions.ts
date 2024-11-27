import { WORDS_LIST } from "./constants";

export const getRandomText = (length: number) => {
    const wordsLength = WORDS_LIST.length;

    let randomText = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * wordsLength);
        randomText += WORDS_LIST[randomIndex] + ' ';
    }

    return randomText;
}