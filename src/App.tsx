import { useEffect, useRef, useState } from "react";

import { getRandomText } from "./utils/functions";
import { TFinishedWord } from "./utils/types";
import ResultModal from "./components/ResultModal";

function App() {
  const [selectedText, setSelectedText] = useState<string[]>(getRandomText(150));
  const [finishedWords, setFinishedWords] = useState<TFinishedWord[]>([]);
  const [finishedWordsWidth, setFinishedWordsWidth] = useState<number>(0);
  const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [inputTextWidth, setInputTextWidth] = useState<number>(0);
  const [wrongWord, setWrongWord] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [timeEnd, setTimeEnd] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);

  const finishedWordsRef = useRef<HTMLDivElement>(null);
  const currentWordsRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);

  const handleChangeValue = (value: string) => {
    if (!isTypingStarted) {
      setIsTypingStarted(true);
    }

    setInputText(value);

    const currentWord = selectedText[currentWordIndex];
    if (currentWord.startsWith(value.trim())) {
      setWrongWord(false);
    } else {
      setWrongWord(true);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.metaKey && e.key === "a") {
      e.preventDefault();
    }

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

  const handleCloseModal = () => {
    setShowResultModal(false);
    setSelectedText(getRandomText(150));
    setFinishedWords([]);
    setCurrentWordIndex(0);
    setInputText('');
    setTimeEnd(false);
    setTimeLeft(60);
    setAccuracy(0);
    setWpm(0);
    setCpm(0);
  }

  useEffect(() => {
    if (finishedWordsRef.current) {
      setFinishedWordsWidth(finishedWordsRef.current.offsetWidth);
    }

    if (currentWordsRef.current) {
      setInputTextWidth(currentWordsRef.current.offsetWidth);
    }
  }, [finishedWords, inputText])

  useEffect(() => {
    if (isTypingStarted) {
      const correctWords = finishedWords.filter((word) => word.correct).length;
      const totalWords = finishedWords.length;
      const accuracy = Math.round((100 / totalWords) * correctWords);
      const cpmData = finishedWords.map((word) => word.word.split('')).flat().length;

      setAccuracy(accuracy);
      setWpm(correctWords);
      setCpm(cpmData);
    }
  }, [isTypingStarted, finishedWords]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTypingStarted && timeLeft !== 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isTypingStarted && timeLeft === 0) {
      setIsTypingStarted(false);
      setTimeEnd(true);
      setShowResultModal(true);
    }

    return () => clearInterval(interval);
  }, [isTypingStarted, setIsTypingStarted, timeLeft]);

  return (
    <div className="w-full min-h-[100vh] bg-[#000000] flex flex-col justify-center items-center gap-10 p-10">
      <h2 className="text-[60px] leading-[76px] text-[#FFFFFF] font-semibold tracking-[0.02em] max-w-[650px] text-center select-none">
        Reveal your <span className="text-[#FA00FB]">TYPING SPEED.</span> Start typing the text below.
      </h2>
      <div className="max-w-[800px] w-full grid grid-cols-4 gap-4 select-none">
        <div className="bg-[#FA00FB] p-4 rounded-xl">
          <h5 className="font-semibold text-bold text-[18px] leading-[24px]">
            Time Left
          </h5>
          <span className="font-bold text-[40px] leading-[56px] flex">
            <span className="block min-w-[43px]">{timeLeft}</span>s
          </span>
        </div>
        <div className="bg-[#FA00FB] p-4 rounded-xl">
          <h5 className="font-semibold text-bold text-[18px] leading-[24px]">
            WPM
          </h5>
          <span className="font-bold text-[40px] leading-[56px]">
            {wpm}
          </span>
        </div>
        <div className="bg-[#FA00FB] p-4 rounded-xl">
          <h5 className="font-semibold text-bold text-[18px] leading-[24px]">
            CPM
          </h5>
          <span className="font-bold text-[40px] leading-[56px]">
            {cpm}
          </span>
        </div>
        <div className="bg-[#FA00FB] p-4 rounded-xl">
          <h5 className="font-semibold text-bold text-[18px] leading-[24px]">
            % Accuracy
          </h5>
          <span className="font-bold text-[40px] leading-[56px]">
            {accuracy}%
          </span>
        </div>
      </div>
      <div
        onClick={() => textInputRef?.current?.focus()}
        className="bg-[#212121] max-w-[800px] w-full h-[80px] rounded-xl relative overflow-hidden"
      >
        <input
          className={`bg-transparent w-1/2 h-full text-[#FA00FB] text-[28px] leading-[36px] font-semibold tracking-[0.02em] outline-none text-end relative z-[2] select-none ${wrongWord ? 'line-through' : ''}`}
          onChange={(e) => handleChangeValue(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          ref={textInputRef}
          value={inputText}
          readOnly={timeEnd}
          type="text"
        />
        <div
          style={{ marginLeft: `-${wrongWord ? finishedWordsWidth + 8 : finishedWordsWidth + inputTextWidth}px` }}
          className="text-[#484747] text-[28px] leading-[36px] font-semibold tracking-[0.02em] absolute whitespace-nowrap left-1/2 top-1/2 translate-y-[-50%] h-full flex items-center mt-[1px] select-none"
        >
          {selectedText.join(' ')}
        </div>
        <div
          style={{ paddingRight: `${inputTextWidth}px` }}
          className="absolute text-[28px] leading-[36px] font-semibold tracking-[0.02em] top-1/2 translate-y-[-50%] whitespace-nowrap right-1/2 mt-[1px] bg-[#212121] select-none"
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
      {showResultModal && (
        <ResultModal
          onClose={handleCloseModal}
          accuracy={accuracy}
          wpm={wpm}
          cpm={cpm}
        />
      )}
    </div>
  );
}

export default App;
