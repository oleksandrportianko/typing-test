import { useRef, useState } from "react";

import { getRandomText } from "./utils/functions";

function App() {
  const [selectedText, setSelectedText] = useState<string>(getRandomText(150));
  const [inputText, setInputText] = useState<string>('');

  const lengthRef = useRef<HTMLDivElement>(null);

  console.log(lengthRef.current?.scrollWidth);

  return (
    <div className="w-full min-h-[100vh] bg-[#000000] flex flex-col justify-center items-center gap-10 p-10">
      <h2 className="text-[60px] leading-[76px] text-[#FFFFFF] font-semibold tracking-[0.02em] max-w-[650px] text-center">
        Reveal your <span className="text-[#FA00FB]">TYPING SPEED.</span> Start typing the text below.
      </h2>
      <div className="bg-[#212121] max-w-[800px] w-full h-[80px] rounded-xl relative overflow-hidden">
        <input
          className="bg-transparent w-1/2 h-full text-[#FA00FB] text-[28px] leading-[36px] font-semibold tracking-[0.02em] outline-none text-end relative z-[2]"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          type="text"
        />
        <div
          style={{ marginLeft: `-${lengthRef?.current?.scrollWidth}px` }}
          className="text-[#484747] text-[28px] leading-[36px] font-semibold tracking-[0.02em] absolute whitespace-nowrap left-1/2 top-1/2 translate-y-[-50%] h-full flex items-center mt-[1px]"
        >
          {selectedText}
        </div>
      </div>
      <div
        className="whitespace-nowrap text-[28px] leading-[36px] font-semibold tracking-[0.02em] opacity-0"
        ref={lengthRef}
      >
        {inputText}
      </div>
    </div>
  );
}

export default App;
