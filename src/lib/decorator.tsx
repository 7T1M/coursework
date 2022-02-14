import { Tag } from "antd";

export default class Decorator {
  verificationTag(status: boolean) {
    if (status === true) {
      return <Tag color={"green"}>Да</Tag>;
    } else {
      return <Tag color={"red"}>Нет</Tag>;
    }
  }

  ratingTag(rate: number) {
    if (rate) {
      if (rate < 33) {
        return <Tag color={"red"}>{rate}</Tag>;
      } else if (rate >= 33 && rate < 66) {
        return <Tag color={"yellow"}>{rate}</Tag>;
      } else if (rate >= 66) {
        return <Tag color={"green"}>{rate}</Tag>;
      }
    } else {
      return "Нет рейтинга ";
    }
  }
}
