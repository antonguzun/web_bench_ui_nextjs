export enum OrmOption {
  All = "0",
  UseOrm = "1",
  WithoutOrm = "2",
}

export class FiltersState {
  webserverName: string;
  language: string;
  database: string;
  orm: OrmOption;

  constructor(
    webserverName: string,
    language: string,
    database: string,
    orm: OrmOption,
  ) {
    this.webserverName = webserverName;
    this.language = language;
    this.database = database;
    this.orm = orm;
  }
}
