export class Filter {
    testName: string;
    webserverName: string | null;
    language: string | null;
    database: string | null;
    orm: string | null;

    constructor(testName: string) {
        this.testName = testName;
        this.webserverName = null;
        this.language = null;
        this.database = null;
        this.orm = null;
    }
}
