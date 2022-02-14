import ICity from "../shared-interfaces/ICity";
import IPoint from "../shared-interfaces/IPoint";
import { IRoute } from "../shared-interfaces/IRoute";
import { IClaimType } from "../shared-interfaces/IClaimType";
import { IService } from "../shared-interfaces/IService";
import Decorator from "./decorator";

enum Statuses {
  Decline = -1,
  Stoped,
  OnReview,
  InProgress,
  Complete,
}

class Lib extends Decorator {
  getCity(cityId: number, cities: ICity[]): string {
    for (const item in cities) {
      if (cities[item].id === cityId) {
        return cities[item].name;
      }
    }
    return "Нет такого города";
  }

  getPoint(pointId: number, points: IPoint[]): string {
    for (const item in points) {
      if (points[item].id === pointId) {
        return points[item].name;
      }
    }
    return "Нет такой точки";
  }
  getRoute(routeId: number, routes: IRoute[]):string {
    for (const item in routes) {
      if (routes[item].id === routeId) {
        return routes[item].routeName;
      }
    }
    return "Нет такого маршрута";
  }
  getClaimType(claimTypeId: number, types: IClaimType[]):string {
    for (const item in types) {
      if (types[item].id === claimTypeId) {
        return types[item].name;
      }
    }
    return "Нет такой категории";
  }
  getService(service: number, services: IService[]):string {
    for (const item in services) {
      if (services[item].id === service) {
        return services[item].name;
      }
    }
    return "Нет такого органа";
  }
  getStatus(statusId: number):string {
    switch (statusId) {
      case Statuses.Decline:
        return "Отклонена";

      case Statuses.Stoped:
        return "Приостановлена";

      case Statuses.OnReview:
        return "На рассмотрении";

      case Statuses.InProgress:
        return "В работе";

      case Statuses.Complete:
        return "Выполнено";
        
      default:
        return "Нет такого статуса";
    }
  }
}

const lib = new Lib();

export default lib;
