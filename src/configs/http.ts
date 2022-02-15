interface IInstance {
  auth: string;
  storage: string;
  services: string;
  claims: string;
  service: string;
  claim: string;
  news: string;
  task: string;
  tasks: string;
  drivers: string;
  routes: string;
  route: string;
  driver: string;
  users: string;
  user: string;
  cities: string;
  points: string;
  geo: string;
}

export default class httpConfig {
  private instance: IInstance;
  constructor(private host = "http://192.168.1.30:3000") {
    this.host = host;
    this.instance = {
      auth: "/auth",
      storage: "/storage",
      services: "/services",
      claims: "/claims",
      service: "/service",
      claim: "/claim",
      news: "/news",
      task: "/task",
      tasks: "/tasks",
      drivers: "/drivers",
      routes: "/routes",
      route: "/route",
      driver: "/driver",
      users: "/users",
      user: "/user",
      cities: "/cities",
      points: "/points",
      geo: "./geo",
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
  getTasks(): string {
    return this.host + this.instance.tasks;
  }
  getFile(fileId: number): string {
    return this.host + this.instance.storage + "/" + fileId;
  }
  createServiceType(): string {
    return this.host + this.instance.service + "/types";
  }
  createService(): string {
    return this.host + this.instance.service;
  }
  createClaim(): string {
    return this.host + this.instance.claim;
  }
  createClaimsTypes(): string {
    return this.host + this.instance.claim + "/type";
  }
  createDriver(): string {
    return this.host + this.instance.driver;
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
  getDrivers(): string {
    return this.host + this.instance.drivers;
  }
  updateDriver(id: number): string {
    return this.host + this.instance.driver + `/${id}`;
  }
  getRoutes(): string {
    return this.host + this.instance.routes;
  }
  updateRoute(id: number): string {
    return this.host + this.instance.route + `/${id}`;
  }
  deleteRoute(id: number): string {
    return this.host + this.instance.route + `/${id}`;
  }
  deleteDriver(id: number): string {
    return this.host + this.instance.driver + `/${id}`;
  }
  deleteNews(id: number): string {
    return this.host + this.instance.news + `/${id}`;
  }
  getClaimCategories(): string {
    return this.host + this.instance.claims + "/types";
  }
  // updateClaimCategory(tokendata){
  //   return this.host + this.modifier.claim +
  // }
  deleteClaimCategory(id: number): string {
    return this.host + this.instance.claim + `/type/${id}`;
  }
  getUsers(): string {
    return this.host + this.instance.users;
  }
  deleteUser(id: number): string {
    return this.host + this.instance.user + `/${id}`;
  }
  createRoute(): string {
    return this.host + this.instance.route;
  }
  getCities(): string {
    return this.host + this.instance.cities;
  }
  getPoints(): string {
    return this.host + this.instance.points;
  }
  getGeoAdress(lat: number, lng: number): string {
    return this.host + this.instance.geo + `/${lat}/${lng}`;
  }
  deleteClaim(id: number): string {
    return this.host + this.instance.claim + `/${id}`;
  }
  updateClaim(id: number): string {
    return this.host + this.instance.claim + `/${id}`;
  }
  updateTask(id: number): string {
    return this.host + this.instance.task + `/${id}`;
  }
}
