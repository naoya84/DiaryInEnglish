import {describe, expect, test, vi} from "vitest";
import {NetworkHttp} from "../../http/Http.ts";
import {DefaultTranslateRepository} from "../../repository/TranslateRepository.ts";

describe('App', () => {
    test('Translateメソッドが呼ばれた時、NetworkHttpのtranslateメソッドが正しく呼ばれる', () => {
        const http = new NetworkHttp()
        const spyHttp = vi.spyOn(http, 'translate')
        const translateRepository = new DefaultTranslateRepository(http)

        translateRepository.translate("こんにちは")

        expect(spyHttp).toHaveBeenCalledWith("こんにちは")
    })

    test('Translateメソッドが呼ばれた時、NetworkHttpのtranslateメソッドが正しい値を返す', async () => {
        const http = new NetworkHttp()
        vi.spyOn(http, 'translate').mockReturnValue(Promise.resolve("hello"))

        const translateRepository = new DefaultTranslateRepository(http)
        const result = await translateRepository.translate("こんにちは")

        expect(result).toEqual("hello")
    })
})