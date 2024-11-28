import { useEffect, useRef, useState } from "react";

import { getRandomText } from "./utils/functions";
import { TFinishedWord } from "./utils/types";

function App() {
  const [selectedText, setSelectedText] = useState<string[]>(getRandomText(150));
  const [finishedWords, setFinishedWords] = useState<TFinishedWord[]>([]);
  const [finishedWordsWidth, setFinishedWordsWidth] = useState<number>(0);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputTextWidth, setInputTextWidth] = useState<number>(0);
  const [wrongWord, setWrongWord] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const finishedWordsRef = useRef<HTMLDivElement>(null);
  const currentWordsRef = useRef<HTMLDivElement>(null);

  const handleChangeValue = (value: string) => {
    setInputText(value);

    const currentWord = selectedText[currentWordIndex];
    if (currentWord.startsWith(value.trim())) {
      setWrongWord(false);
    } else {
      setWrongWord(true);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ' && e.currentTarget.value.trim() !== '') {
      const currentWord = selectedText[currentWordIndex];
      const correct = currentWord === inputText.trim();

      setFinishedWords((prev) => [...prev, { word: currentWord, correct }]);

      setCurrentWordIndex((prev) => prev + 1);
      setInputText('');
    } else if (e.key === ' ' && e.currentTarget.value.trim() === '') {
      e.preventDefault();
    } else if (e.key === 'Backspace' && e.currentTarget.value === ' ') {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (finishedWordsRef.current) {
      setFinishedWordsWidth(finishedWordsRef.current.offsetWidth);
    }

    if (currentWordsRef.current) {
      setInputTextWidth(currentWordsRef.current.offsetWidth);
    }
  }, [finishedWords, inputText])

  return (
    <div className="w-full min-h-[100vh] bg-[#000000] flex flex-col justify-center items-center gap-10 p-10">
      <h2 className="text-[60px] leading-[76px] text-[#FFFFFF] font-semibold tracking-[0.02em] max-w-[650px] text-center">
        Reveal your <span className="text-[#FA00FB]">TYPING SPEED.</span> Start typing the text below.
      </h2>
      <div className="bg-[#212121] max-w-[800px] w-full h-[80px] rounded-xl relative overflow-hidden">
        <input
          className="bg-transparent w-1/2 h-full text-[#FA00FB] text-[28px] leading-[36px] font-semibold tracking-[0.02em] outline-none text-end relative z-[2]"
          onChange={(e) => handleChangeValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          value={inputText}
          type="text"
        />
        <div
          style={{ marginLeft: `-${finishedWordsWidth + inputTextWidth}px` }}
          className="text-[#484747] text-[28px] leading-[36px] font-semibold tracking-[0.02em] absolute whitespace-nowrap left-1/2 top-1/2 translate-y-[-50%] h-full flex items-center mt-[1px]"
        >
          {selectedText.join(' ')}
        </div>
        <div
          style={{ marginRight: `${inputTextWidth}px` }}
          className="absolute text-[28px] leading-[36px] font-semibold tracking-[0.02em] top-1/2 translate-y-[-50%] whitespace-nowrap right-1/2 mt-[1px]"
        >
          {finishedWords.map((word, index) => (
            <span key={index} className={word.correct ? 'text-[#484747]' : 'text-[#484747] line-through'}>
              {word.word}
              {index !== finishedWords.length - 1 && ' '}
            </span>
          ))}
        </div>
      </div>
      <div
        className="text-[28px] leading-[36px] font-semibold tracking-[0.02em] whitespace-nowrap absolute w-[90000px] top-[-50px]"
      >
        <div
          ref={finishedWordsRef}
          className="whitespace-break-spaces w-fit"
        >
          {finishedWords.map((word, index) => (
            <span key={index}>
              {word.word}
              {index !== finishedWords.length - 1 && ' '}
            </span>
          ))}
        </div>
        <div
          ref={currentWordsRef}
          className="whitespace-break-spaces w-fit"
        >
          {inputText}
        </div>
      </div>
    </div>
  );
}

export default App;
