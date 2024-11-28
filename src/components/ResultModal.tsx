import { FC, useState } from "react"

import Modal from "./Modal"

type TResultModalProps = {
    onClose: () => void,
    accuracy: number,
    wpm: number,
    cpm: number,
}

const ResultModal: FC<TResultModalProps> = ({ onClose, accuracy, wpm, cpm }) => {
    const [nicknameError, setNicknameError] = useState<boolean>(false)
    const [shareResults, setShareResults] = useState<boolean>(false)
    const [nickname, setNickname] = useState<string>('')

    const handleChangeNickname = (value: string) => {
        setNickname(value)
        setNicknameError(false)
    }

    const handleSaveAndShare = () => {
        if (nickname.trim() === '') {
            setNicknameError(true)
            return;
        }

        const results = {
            nickname,
            accuracy,
            wpm,
            cpm,
        }

        console.log(results)
        onClose()
    }

    return (
        <Modal
            onClose={onClose}
            bodyStyles={{ padding: 0 }}
            customModalClasses="w-[100vw] h-[100vh]"
            customBodyClasses="flex justify-center items-center w-[100vw]"
        >
            <div className={`max-w-[500px] w-full bg-[#212121] p-6 rounded-xl shadow-lg flex flex-col select-none ${shareResults ? 'gap-4' : 'gap-10'}`}>
                {shareResults ? (
                    <>
                        <div className="flex flex-col gap-2 text-[#FFFFFF]">
                            <h5 className="text-[32px] leading-[40px] font-semibold text-[#FFFFFF] uppercase">
                                Enter your Nickname to share the result:
                            </h5>
                            <p className="text-[#484747]">
                                Your results will be shared with the nickname you provide. You can also skip this step.
                            </p>
                        </div>
                        <input
                            className={`h-[50px] w-full rounded-lg bg-[#000000] outline-none text-[#FFFFFF] px-4 text-[18px] leading-[24px] ${nicknameError ? 'outline outline-[1px] outline-red-900' : ''}`}
                            onChange={(e) => handleChangeNickname(e.target.value)}
                            placeholder="Nickname"
                            value={nickname}
                            type="text"
                        />
                        <div className="flex items-center gap-2 w-full">
                            <button onClick={onClose} className="w-full h-[44px] rounded-lg bg-[#FFFFFF] text-[#000000] font-medium text-[20px] leading-[24px] hover:bg-[#f0eeee] transition-colors duration-300 select-none">
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveAndShare}
                                className="w-full h-[44px] rounded-lg bg-[#FA00FB] text-[#000000] font-medium text-[20px] leading-[24px] hover:bg-[#db36db] transition-colors duration-300 select-none"
                            >
                                Save
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <h5 className="text-[32px] leading-[40px] font-semibold text-[#FFFFFF] uppercase">
                            Your results are as follows:
                        </h5>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-[20px] leading-[28px] text-[#FFFFFF] font-medium">
                                CPM: <span className="text-[#FA00FB]">{cpm}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[20px] leading-[28px] text-[#FFFFFF] font-medium">
                                WPM: <span className="text-[#FA00FB]">{wpm}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[20px] leading-[28px] text-[#FFFFFF] font-medium">
                                Accuracy: <span className="text-[#FA00FB]">{accuracy}%</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full">
                            <button onClick={onClose} className="w-full h-[44px] rounded-lg bg-[#FFFFFF] text-[#000000] font-medium text-[20px] leading-[24px] hover:bg-[#f0eeee] transition-colors duration-300 select-none">
                                Try Again
                            </button>
                            <button
                                onClick={() => setShareResults(true)}
                                className="w-full h-[44px] rounded-lg bg-[#FA00FB] text-[#000000] font-medium text-[20px] leading-[24px] hover:bg-[#db36db] transition-colors duration-300 select-none"
                            >
                                Share
                            </button>
                        </div>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default ResultModal