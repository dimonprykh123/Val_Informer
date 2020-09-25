export default class NBUService {
    _url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange"

    async getDate(url) {
        const res = await fetch(`${this._url}${url}`)
        if(!res.ok){
            throw new Error('no data')
        }
        const body = await res.json()
        return body
    }

    _transformResponse = (date) => {
        return {
            rate:Math.floor(date.rate*10000)/10000,
            //date.rate,
            //.toFixed(2),
            cc: date.cc,
            name: date.txt,
            id: date.r030,
            data:date.exchangedate
        }
    }

    async getTodayInfo() {
        const res = await this.getDate("?json")
        return res.map(this._transformResponse)
    }

    async getNewDate(data) {
        const response = await this.getDate(`?date=${data}&json`)
        return response.map(this._transformResponse)
    }

    async getSearchInfo(val, date) {
        const response = await this.getDate(`?valcode=${val}&date=${date}&json`)
        return response.map(this._transformResponse)
    }
}