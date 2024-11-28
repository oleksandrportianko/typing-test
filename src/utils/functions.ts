import { WORDS_LIST } from "./constants";

// Function to get a random text with a given length
// params: length: number
// returns: string[]
export const getRandomText = (length: number) => {
    const wordsLength = WORDS_LIST.length;

    let randomTextList = [];

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * wordsLength);
        randomTextList.push(WORDS_LIST[randomIndex]);
    }

    return randomTextList;
}