import {describe, expect, test, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../App.tsx";
import userEvent from "@testing-library/user-event";
import {DefaultTranslateRepository} from "../../repository/TranslateRepository.ts";

describe('App', () => {
    describe('render', () => {
        test('レンダーされた時に4つのセクションとtextareaとボタンが表示される', () => {
            render(<App/>)
            expect(screen.getByText('英語日記🔤')).toBeInTheDocument()

            expect(screen.getByText('1. Write in Japanese about what happened today and what you learned !')).toBeInTheDocument()
            expect(screen.queryByLabelText("write_japanese")).toBeInTheDocument()

            expect(screen.getByText('2. Translate the sentences you wrote in step1 into English on your own !')).toBeInTheDocument()
            expect(screen.queryByLabelText("write_english")).toBeInTheDocument()

            expect(screen.getByText('3. Let\'s check the English translation !')).toBeInTheDocument()
            expect(screen.getByRole('button', {name: "英訳"})).toBeInTheDocument()
            expect(screen.getByRole('button', {name: "表示"})).toBeInTheDocument()
            expect(screen.queryByLabelText("check_translation")).not.toBeInTheDocument()

            expect(screen.getByText('4. Read aloud 100 times !')).toBeInTheDocument()
            expect(screen.queryByLabelText("speaking")).toBeInTheDocument()
        })
        test('表示ボタンを押した時に非表示ボタンとtextareaが表示される', async () => {
            render(<App/>)
            const showButton = screen.getByRole('button', {name: "表示"})
            userEvent.click(showButton)

            expect(await screen.findByRole('button', {name: "非表示"})).toBeInTheDocument()
            expect(await screen.queryByLabelText("check_translation")).toBeInTheDocument()
        })
    })
    describe('translation', () => {
        test('英訳ボタンと表示ボタンを押した時、translateRepositoryのtranslateメソッドが正しく呼ばれる', async () => {
            const translateRepository = new DefaultTranslateRepository()
            const spyTranslate = vi.spyOn(translateRepository, 'translate')
            render(<App transRepository={translateRepository}/>)

            const textarea = screen.getByLabelText("write_japanese")
            await userEvent.type(textarea, "こんにちは")

            const showButton = screen.getByRole('button', {name: "表示"})
            await userEvent.click(showButton)

            const translateButton = screen.getByRole('button', {name: "英訳"})
            await userEvent.click(translateButton)

            expect(spyTranslate).toHaveBeenCalledWith("こんにちは")
        })
        test('英訳ボタンと表示ボタンを押した時、translateRepositoryのtranslateメソッドの返り値が表示される', async () => {
            const translateRepository = new DefaultTranslateRepository()
            vi.spyOn(translateRepository, 'translate').mockResolvedValue("今日もお疲れ様でした")
            render(<App transRepository={translateRepository}/>)

            const showButton = screen.getByRole('button', {name: "表示"})
            userEvent.click(showButton)

            const translateButton = screen.getByRole('button', {name: "英訳"})
            userEvent.click(translateButton)

            const textarea = await screen.findByLabelText("check_translation") as HTMLTextAreaElement
            expect(textarea.value).toBe("今日もお疲れ様でした")
        })
    })
})
