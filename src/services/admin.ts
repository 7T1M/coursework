import axios, { AxiosPromise } from "axios";
import httpConfig from "../configs/http";
import { IApiResponse } from "../shared-interfaces/ApiResponseModels";
import ICity from "../shared-interfaces/ICity";
import { IClaimData } from "../shared-interfaces/IClaimData";
import { IClaimType } from "../shared-interfaces/IClaimType";
import { IRoute } from "../shared-interfaces/IRoute";

import { IService } from "../shared-interfaces/IService";
import { ITask } from "../shared-interfaces/ITask";

import { INews } from "../views/app/news/INews";

class AdminServices {
  private http: httpConfig;

  constructor() {
    this.http = new httpConfig();
  }

  login(login: string, password: string): AxiosPromise {
    return axios.post(this.http.login(), {
      login: login,
      password: password,
    });
  }

  signUp(login: string, password: string): AxiosPromise {
    return axios.post(this.http.signUp(), {
      login: login,
      password: password,
    });
  }

  addFileToStorage(token: string, file: HTMLImageElement): AxiosPromise {
    return axios.post(
      this.http.addFileToStorage(),
      {
        file: file,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getServicesTypes(token: string): AxiosPromise {
    return axios.get(this.http.getServiceTypes(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getServices(token: string): AxiosPromise<IApiResponse<IService>> {
    return axios.get<IApiResponse<IService>>(this.http.getServices(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getClaims(token: string): AxiosPromise<IApiResponse<IClaimData>> {
    return axios.get<IApiResponse<IClaimData>>(this.http.getClaims(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getClaimsTypes(token: string): AxiosPromise<IApiResponse<IClaimType>> {
    return axios.get<IApiResponse<IClaimType>>(this.http.getClaimCategories(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getFileFromStorage(token: string, fileId: number): AxiosPromise {
    return axios.get(this.http.getFile(fileId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createClaimType(token: string, data: any): AxiosPromise {
    return axios.put(
      this.http.createClaimsTypes(),
      {
        name: data.name,
        mnemonicName: data.mnemonicName,
        tag: data.tag,
        priority: data.priority,
        serviceControlId: data.serviceControlId,
        serviceExecuteId: data.serviceExecuteId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getNews(token: string): AxiosPromise<IApiResponse<INews>> {
    return axios.get<IApiResponse<INews>>(this.http.getNews(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createNews(token: string, data: any): AxiosPromise {
    return axios.put(
      this.http.createNews(),
      {
        name: data.name,
        title: data.title,
        previewImageUrl: data.previewImageUrl,
        cityId: data.cityId,
        description: data.description,
        priority: data.priority,
        type: data.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateNews(token: string, data: any): AxiosPromise {
    return axios.post(
      this.http.updateNews(data.id),
      {
        name: data.name,
        title: data.title,
        description: data.description,
        cityId: data.cityId,
        previewImageUrl: data.previewImageUrl,
        priority: data.priority,
        type: data.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  deleteNews(token: string, id: number): AxiosPromise {
    return axios.delete(this.http.deleteNews(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getClaimCategories(token: string): AxiosPromise {
    return axios.get(this.http.getClaimCategories(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteClaimCategory(token: string, id: number): AxiosPromise {
    return axios.delete(this.http.deleteClaimCategory(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getCities(token: string): AxiosPromise<IApiResponse<ICity>> {
    return axios.get<IApiResponse<ICity>>(this.http.getCities(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteClaim(token: string, id: number): AxiosPromise {
    return axios.delete(this.http.deleteClaim(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateClaim(token: string, data: IClaimData): AxiosPromise {
    return axios.post(
      this.http.updateClaim(data.id),
      {
        claimType: data.claimType,
        title: data.title,
        description: data.description,
        address: data.address,
        urlPreview: data.urlPreview,
        rate: data.rate,
        status: data.status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  updateRoute(token: string, data: any): AxiosPromise {
    return axios.post(
      this.http.updateRoute(data.id),
      {
        startPointId: data.startPointId,
        endPointId: data.endPointId,
        cityId: data.cityId,
        routeName: data.routeName,
        description: data.description ?? "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  deleteRoute(token: string, id: number): AxiosPromise {
    return axios.delete(this.http.deleteRoute(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getRoutes(token: string): AxiosPromise<IApiResponse<IRoute>> {
    return axios.get<IApiResponse<IRoute>>(this.http.getRoutes(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateTask(token: string, data: any): AxiosPromise {
    return axios.post(
      this.http.updateTask(data.id),
      {
        claimId: data.claimId,
        serviceId: data.serviceId,
        typeId: data.typeId,
        rate: data.rate,
        statusId: data.statusId,
        explanation: data.explanation,
        description: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getTasks(token: string): AxiosPromise<IApiResponse<ITask>> {
    return axios.get<IApiResponse<ITask>>(this.http.getTasks(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createRoute(token: string, data: any): AxiosPromise {
    return axios.put(
      this.http.createRoute(),
      {
        startPointId: data.startPointId,
        endPointId: data.endPointId,
        cityId: data.cityId,
        routeName: data.routeName,
        typeId: data.typeId ?? 1,
        description: "Городской маршут",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

const adminServices: AdminServices = new AdminServices();

export default adminServices;
