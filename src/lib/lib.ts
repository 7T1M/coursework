import ICity from "../shared-interfaces/ICity";

import { IClaimType } from "../shared-interfaces/IClaimType";
import { IService } from "../shared-interfaces/IService";
import Decorator from "./decorator";

import tasksStatus, { TaskStatus } from "../models/taskStatus";
import newsTypes, { NewsType } from "../models/newsType";
import newsPrioritys, { NewsPriority } from "../models/newsPriority";

type instances = ICity | IClaimType | IService;

class Lib extends Decorator {
  getInstanceName(id: number, instances: instances[]): string | undefined {
    for (const item in instances) {
      if (instances[item].id === id) {
        return instances[item].name;
      }
    }
    return undefined;
  }

  getStatus(statusId: TaskStatus): string {
    return tasksStatus[statusId];
  }

  getNewsType(typeId: NewsType): string {
    return newsTypes[typeId];
  }

  getNewsPriority(priorityId: NewsPriority): string {
    return newsPrioritys[priorityId];
  }
}

const lib: Lib = new Lib();

export default lib;
