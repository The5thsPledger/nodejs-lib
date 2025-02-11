const cache = {}

class UrlTestada {
    private urlString : string;
    private urlStatus : number;

    constructor(urlString : string)
    constructor(urlString? : string, urlStatus? : number) {
        this.urlString = urlString ? urlString : "";
        this.urlStatus = urlStatus;
    }

    getUrlString() {
        return this.urlString;
    }

    setUrlString(urlString : string) {
        this.urlString = urlString;
    }

    getUrlStatus() {
        return this.urlStatus ? this.urlStatus : cache[this.urlString];
    }

    setUrlStatus(urlStatus : number) {
        this.urlStatus = urlStatus;
        pushCache(this);
    }
}

export default UrlTestada

function pushCache(urlTestada : UrlTestada) {
    cache[urlTestada.getUrlString()] = urlTestada.getUrlStatus();
    console.log(cache)
}
