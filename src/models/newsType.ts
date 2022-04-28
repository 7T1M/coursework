export enum NewsType {
  None,
  News,
  Article,
  Alert,
  Advertising,
}

const newsTypes: { [property: string]: string } = {
  0: "Отсутсвует",
  1: "Новость",
  2: "Статья",
  3: "Оповещение",
  4: "Реклама",
};

export default newsTypes;
