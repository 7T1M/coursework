import Logger from "../logger/Logger";
import { Interface } from "readline";
import ICity from "../shared-interfaces/ICity";
import IPoint from "../shared-interfaces/IPoint";
import { IRoute } from "../shared-interfaces/IRoute";
import { IClaimType } from "../shared-interfaces/IClaimType";
import { IService } from "../shared-interfaces/IService";

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
  logger: Logger | null ;
}
