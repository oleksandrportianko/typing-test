export type TFinishedWord = {
    word: string;
    correct: boolean;
}

export type TTypingResult = {
    accuracy: number;
    cpm: number;
    id: string;
    nickname: string;
    timestamp: number;
    wpm: number;
}