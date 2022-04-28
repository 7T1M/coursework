import ICity from "../shared-interfaces/ICity";

import { IClaimType } from "../shared-interfaces/IClaimType";
import { IService } from "../shared-interfaces/IService";
import Logger from "../logger/Logger";

export interface ILoggerObject {
  userName: string;
  logText: string;
}

export interface IAppState {
  authToken: string;
  cities: ICity[];

  claimTypes: IClaimType[];
  services: IService[];
  logger: Logger | undefined;
}
