interface IInstance {
  auth: string;
  storage: string;
  services: string;
  claims: string;
  service: string;
  claim: string;
  news: string;
  cities: string;

  shelters: string;
}

export default class httpConfig {
  private instance: IInstance;

  constructor(private host: string = "http://api.rep2u.ru") {
    this.host = host;
    this.instance = {
      auth: "/auth",
      storage: "/storage",
      services: "/services",
      claims: "/claims",
      service: "/service",
      claim: "/claim",
      news: "/news",

      cities: "/cities",

      shelters: "/shelters",
    };
  }

  login(): string {
    return this.host + this.instance.auth + "/signin";
  }
  signUp(): string {
    return this.host + this.instance.auth + "/signup";
  }
  addFileToStorage(): string {
    return this.host + this.instance.storage + "/load";
  }
  getServiceTypes(): string {
    return this.host + this.instance.services + "/types";
  }
  getServices(): string {
    return this.host + this.instance.services;
  }
  getClaims(): string {
    return this.host + this.instance.claims;
  }

  getFile(fileId: number): string {
    return this.host + this.instance.storage + "/" + fileId;
  }

  createClaimsTypes(): string {
    return this.host + this.instance.claim + "/type";
  }

  getNews(): string {
    return this.host + this.instance.news;
  }
  createNews(): string {
    return this.host + this.instance.news;
  }
  updateNews(id: number): string {
    return this.host + this.instance.news + `/${id}`;
  }

  deleteNews(id: number): string {
    return this.host + this.instance.news + `/${id}`;
  }
  getClaimCategories(): string {
    return this.host + this.instance.claims + "/types";
  }

  deleteClaimCategory(id: number): string {
    return this.host + this.instance.claim + `/type/${id}`;
  }

  getCities(): string {
    return this.host + this.instance.cities;
  }

  deleteClaim(id: number): string {
    return this.host + this.instance.claim + `/${id}`;
  }
  updateClaim(id: number): string {
    return this.host + this.instance.claim + `/${id}`;
  }
}
