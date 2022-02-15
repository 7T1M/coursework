import axios, { AxiosPromise } from "axios";
import httpConfig from "../configs/http";

class AdminServices {
  private http: httpConfig
  
  constructor(){
    this.http = new httpConfig();
  }
 

  login(login:string, password:string): AxiosPromise {
    return axios.post(this.http.login(), {
      login: login,
      password: password,
    });
  }

  signUp(login:string, password:string): AxiosPromise {
    return axios.post(this.http.signUp(), {
      login: login,
      password: password,
    });
  }

  addFileToStorage(token:string, file:any): AxiosPromise {
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

  getServicesTypes(token:string): AxiosPromise {
    return axios.get(this.http.getServiceTypes(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getServices(token:string): AxiosPromise {
    return axios.get(this.http.getServices(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getClaims(token:string): AxiosPromise {
    return axios.get(this.http.getClaims(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getClaimsTypes(token:string): AxiosPromise {
    return axios.get(this.http.getClaimCategories(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getTasks(token:string): AxiosPromise {
    return axios.get(this.http.getTasks(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getFileFromStorage(token:string, fileId:number): AxiosPromise {
    return axios.get(this.http.getFile(fileId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  createServiceType(token:string, name:string): AxiosPromise {
    return axios.put(
      this.http.createServiceType(),
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createService(token:string, data:any): AxiosPromise {
    return axios.put(
      this.http.createService(),
      {
        name: data.name,
        contactPhone: data.contactPhone,
        contactEmail: data.contactEmail,
        telegramToken: data.telegramToken ?? "",
        website: data.website,
        description: data.description,
        serviceType: data.serviceType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createClaim(token:string, data:any): AxiosPromise {
    return axios.put(
      this.http.createClaim(),
      {
        description: data.description,
        address: data.address,
        claimType: data.claimType,
        title: data.title,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createClaimType(token:string, data:any): AxiosPromise {
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
  getNews(token:string): AxiosPromise {
    return axios.get(this.http.getNews(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createNews(token:string, data:any): AxiosPromise {
    return axios.put(
      this.http.createNews(),
      {
        name: data.name,
        title: data.title,
        previewImageUrl: data.previewImageUrl,
        cityId: data.cityId,
        description: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateNews(token:string, data:any): AxiosPromise {
    return axios.post(
      this.http.updateNews(data.id),
      {
        name: data.name,
        title: data.title,
        description: data.description,
        cityId: data.cityId,
        previewImageUrl: data.previewImageUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  createDriver(token:string, data:any): AxiosPromise {
    return axios.put(
      this.http.createDriver(),
      {
        firstName: data.firstName,
        lastName: data.lastName,
        cityId: data.cityId,
        routeId: data.routeId,
        phone: data.phone,
        description: data.description,
        securityCode: data.securityCode,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getDrivers(token:string): AxiosPromise {
    return axios.get(this.http.getDrivers(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateDriver(token:string, data:any): AxiosPromise {
    return axios.post(
      this.http.updateDriver(data.id),
      {
        firstName: data.firstName,
        lastName: data.lastName,
        cityId: data.cityId,
        routeId: data.routeId,
        phone: data.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  getRoutes(token:string): AxiosPromise {
    return axios.get(this.http.getRoutes(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateRoute(token:string, data:any): AxiosPromise {
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
  deleteRoute(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteRoute(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteDriver(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteDriver(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteNews(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteNews(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getClaimCategories(token:string): AxiosPromise {
    return axios.get(this.http.getClaimCategories(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteClaimCategory(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteClaimCategory(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getUsers(token:string): AxiosPromise {
    return axios.get(this.http.getUsers(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteUser(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteUser(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  createRoute(token:string, data:any): AxiosPromise {
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

  getCities(token:string): AxiosPromise {
    return axios.get(this.http.getCities(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getPoints(token:string): AxiosPromise {
    return axios.get(this.http.getPoints(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  getGeoAdress(token:string, lat:number, lng:number): AxiosPromise {
    return axios.get(this.http.getGeoAdress(lat, lng), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  deleteClaim(token:string, id:number): AxiosPromise {
    return axios.delete(this.http.deleteClaim(id), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  updateClaim(token:string, data:any): AxiosPromise {
    return axios.post(
      this.http.updateClaim(data.id),
      {
        claimType: data.claimType,
        title: data.title,
        description: data.description,
        address: data.address,
        urlPreview: data.urlPreview,
        rate: data.rate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  updateTask(token:string, data:any): AxiosPromise {
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
}

const adminServices: AdminServices = new AdminServices();

export default adminServices;
