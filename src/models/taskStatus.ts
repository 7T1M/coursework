export enum TaskStatus {
  Decline = -1,
  Stoped,
  OnReview,
  InProgress,
  Complete,
}

const tasksStatus: { [property: string]: string } = {
  "-1": "Отклонена",
  0: "Приостановлена",
  1: "На рассмотрении",
  2: "В работе",
  3: "Выполнено",
};

export default tasksStatus;
