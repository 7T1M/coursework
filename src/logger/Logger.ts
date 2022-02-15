import moment from "moment";

export default class Logger {
  public logText: string = "";
  public userName: string;

  constructor(userName: string, logText?: string) {
    this.userName = userName;
    if (logText) {
      this.logText = logText;
    }
  }

  downloadLog() {
    let download: HTMLElement = document.getElementById("fileDownload")!;
    download.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(this.logText)})`
    );
    download.setAttribute("download", `${this.userName}Log.txt`);
    download.click();
  }

  userLogin(): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} авторизовался`
    );
    this.logText +=
      "-".repeat(100) +
      "\n" +
      moment().format("MMMM Do YYYY, h:mm:ss") +
      `=== Пользователь ${this.userName} авторизовался \n`;
  }
  userLogout(): void {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `==== ${this.userName} вышел из аккаунта`
    );
    this.logText +=
      "-".repeat(100) +
      "\n" +
      moment().format("MMMM Do YYYY, h:mm:ss") +
      `==== ${this.userName} вышел из аккаунта \n`;
    this.downloadLog();
  }

  userChangePage(page: string) {
    console.log(
      moment().format("MMMM Do YYYY, h:mm:ss"),
      `=== Пользователь ${this.userName} перешел на страницу  ${page} \n`
    );
    this.logText +=
      "-".repeat(100) +
      "\n" +
      moment().format("MMMM Do YYYY, h:mm:ss") +
      `=== Пользователь ${this.userName} перешел на страницу  ${page} \n`;
  }
}
