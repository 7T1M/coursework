interface IInstances {
  auth: string;
  storage: string;
  services: string;
  claims: string;
  service: string;
  claim: string;
  news: string;
  cities: string;
  routes: string;
  route: string;
  points: string;
  task: string;
  tasks: string;
}

export default class httpConfig {
  private instances: IInstances;

  constructor(private host: string = "http://api.rep2u.ru") {
    this.host = host;
    this.instances = {
      auth: "/auth",
      storage: "/storage",
      services: "/services",
      claims: "/claims",
      service: "/service",
      claim: "/claim",
      news: "/news",
      routes: "/routes",
      route: "/route",
      points: "/points",
      cities: "/cities",
      task: "/task",
      tasks: "/tasks",
    };
  }

  login(): string {
    return this.host + this.instances.auth + "/signin";
  }
  signUp(): string {
    return this.host + this.instances.auth + "/signup";
  }
  addFileToStorage(): string {
    return this.host + this.instances.storage + "/load";
  }
  getServiceTypes(): string {
    return this.host + this.instances.services + "/types";
  }
  getServices(): string {
    return this.host + this.instances.services;
  }
  getClaims(): string {
    return this.host + this.instances.claims;
  }
  getTasks(): string {
    return this.host + this.instances.tasks;
  }
  updateTask(id: number): string {
    return this.host + this.instances.task + `/${id}`;
  }
  getFile(fileId: number): string {
    return this.host + this.instances.storage + "/" + fileId;
  }

  createClaimsTypes(): string {
    return this.host + this.instances.claim + "/type";
  }

  getNews(): string {
    return this.host + this.instances.news;
  }
  createNews(): string {
    return this.host + this.instances.news;
  }
  updateNews(id: number): string {
    return this.host + this.instances.news + `/${id}`;
  }

  deleteNews(id: number): string {
    return this.host + this.instances.news + `/${id}`;
  }
  getClaimCategories(): string {
    return this.host + this.instances.claims + "/types";
  }

  deleteClaimCategory(id: number): string {
    return this.host + this.instances.claim + `/type/${id}`;
  }

  getCities(): string {
    return this.host + this.instances.cities;
  }
  getRoutes(): string {
    return this.host + this.instances.routes;
  }
  updateRoute(id: number): string {
    return this.host + this.instances.route + `/${id}`;
  }
  deleteRoute(id: number): string {
    return this.host + this.instances.route + `/${id}`;
  }

  deleteClaim(id: number): string {
    return this.host + this.instances.claim + `/${id}`;
  }
  updateClaim(id: number): string {
    return this.host + this.instances.claim + `/${id}`;
  }
  createRoute(): string {
    return this.host + this.instances.route;
  }
  getPoints(): string {
    return this.host + this.instances.points;
  }
}
