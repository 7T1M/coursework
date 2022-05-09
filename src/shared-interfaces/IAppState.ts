import ICity from "../shared-interfaces/ICity";
import IPoint from "../shared-interfaces/IPoint";
import { IClaimType } from "../shared-interfaces/IClaimType";
import { IService } from "../shared-interfaces/IService";
import Logger from "../logger/Logger";
import { IRoute } from "./IRoute";

export interface ILoggerObject {
  userName: string;
  logText: string;
}

export interface IAppState {
  authToken: string;
  cities: ICity[];
  points: IPoint[];
  routes: IRoute[];
  claimTypes: IClaimType[];
  services: IService[];
  logger: Logger | undefined;
}
