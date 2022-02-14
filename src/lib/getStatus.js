export const getStatus = function (statusId) {
  switch (statusId) {
    case -1:
      return "Отклонена";
      break;
    case 0:
      return "Приостановлена";
      break;
    case 1:
      return "На рассмотрении";
      break;
    case 2:
      return "В работе";
      break;
    case 3:
      return "Выполнено";
      break;
    default:
      return null;
  }
};
