export enum NewsPriority {
  None,
  Low,
  Normal,
  High,
  Urgent,
}

const newsPrioritys: { [property: string]: string } = {
  0: "Отсутсвует",
  1: "Низкий",
  2: "Обычный",
  3: "Высокий",
  4: "Неотложный",
};

export default newsPrioritys;
