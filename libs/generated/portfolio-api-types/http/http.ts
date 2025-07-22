export class HttpFile {
    public data: Blob;
    public name: string;

    constructor(data: Blob, name: string) {
        this.data = data;
        this.name = name;
    }
}