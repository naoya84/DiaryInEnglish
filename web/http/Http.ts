export interface Http {
    translate(word: string): Promise<string>
}

export class NetworkHttp implements Http {
    async translate(word: string): Promise<string> {
        const API_KEY = '170d7c9a-733e-4c44-b44b-e74054f37f16:fx' ;
        const API_URL = 'https://api-free.deepl.com/v2/translate';
        const sourceLang= '&source_lang=JA&target_lang=EN'
        const content = encodeURI('auth_key=' + API_KEY + '&text=' + word + sourceLang)
        const url = API_URL + '?' + content

        const response = await fetch(url)
        const data = await response.json()
        return data["translations"][0]["text"] as Promise<string>
    }
}