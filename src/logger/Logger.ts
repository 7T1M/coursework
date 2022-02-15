import moment from "moment";

export default class Logger {
  constructor(private userName: string) {}

  userLogin(): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} авторизовался`
    );
  }
  userLogout(): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `==== ${this.userName} вышел из аккаунта`
    );
  }
  userCreateRecord(recordName: string, page: string): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} создал запись ${recordName} на странице ${page}`
    );
  }
  userEditRecor(recordName: string, page: string): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} изменил запись ${recordName} на странице ${page}`
    );
  }
  userRemoveRecord(recordName: string, page: string): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} удалил запись ${recordName} на странице ${page}`
    );
  }
}


