import {useState} from "react";
import './main.scss'
import {DefaultTranslateRepository, TranslateRepository} from "../repository/TranslateRepository.ts";

interface Props {
    transRepository?: TranslateRepository
}

function App(
    {transRepository = new DefaultTranslateRepository()}: Props
) {

    const [showTranslation, setShowTranslation] = useState<boolean>(false)
    const [originalWord, setOriginalWord] = useState<string>("")
    const [translatedWord, setTranslatedWord] = useState<string>("")

    const translateHandler = () => {
        transRepository?.translate(originalWord)
            .then((word: string) => {
                setTranslatedWord(word)
            })
    }

    return (
        <>
            <div className="container">
                <h1>英語日記🔤</h1>
                <p>あなたが書いた日記をDeepLが自動で英訳してくれます。</p>

                <div className="section">
                    <p>1. Write in Japanese about what happened today and what you learned !</p>
                    <textarea
                        aria-label="write_japanese"
                        onChange={(e) => {
                            setOriginalWord(e.target.value)
                        }}
                        cols={120}
                        rows={12}>
                    </textarea>
                </div>

                <div className="section">
                    <p>2. Translate the sentences you wrote in step1 into English on your own !</p>
                    <textarea
                        aria-label="write_english"
                        cols={120}
                        rows={12}>
                    </textarea>
                </div>

                <div className="section">
                    <p>3. Let's check the English translation !</p>
                    <div className="button-area">
                        <button className="translateBtn" onClick={() => {
                            translateHandler()
                            setShowTranslation(true)
                        }}>英訳
                        </button>
                        <div>
                            {showTranslation ? (
                                <button className="showhideBtn" onClick={() => {
                                        setShowTranslation(false)
                                    }}>非表示
                                    </button>
                            ) : (
                                <button className="showhideBtn" onClick={() => {
                                    setShowTranslation(true)
                                }}>表示</button>
                            )}
                        </div>
                    </div>
                    {showTranslation && (
                        <textarea
                            aria-label="check_translation"
                            value={translatedWord}
                            readOnly
                            disabled={false}
                            cols={120}
                            rows={12}>
                                    </textarea>
                    )}
                </div>

                <div className="section">
                    <p>4. Read aloud 100 times !</p>
                    <textarea
                        aria-label="speaking"
                        cols={120}
                        rows={12}>
                    </textarea>
                </div>
            </div>
        </>
    )
}

export default App