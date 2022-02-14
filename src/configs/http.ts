
export default class httpConfig  {
  host = "http://192.168.1.30:3000"
  modifier = {
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
  }
  login(): string {
    return this.host + this.modifier.auth + "/signin";
  }
  signUp(): string {
    return this.host + this.modifier.auth + "/signup";
  }
  addFileToStorage(): string {
    return this.host + this.modifier.storage + "/load";
  }
  getServiceTypes(): string {
    return this.host + this.modifier.services + "/types";
  }
  getServices(): string {
    return this.host + this.modifier.services;
  }
  getClaims(): string {
    return this.host + this.modifier.claims;
  }
  getTasks(): string {
    return this.host + this.modifier.tasks;
  }
  getFile(fileId:number): string {
    return this.host + this.modifier.storage + "/" + fileId;
  }
  createServiceType(): string {
    return this.host + this.modifier.service + "/types";
  }
  createService(): string {
    return this.host + this.modifier.service;
  }
  createClaim(): string {
    return this.host + this.modifier.claim;
  }
  createClaimsTypes(): string {
    return this.host + this.modifier.claim + "/type";
  }
  createDriver(): string {
    return this.host + this.modifier.driver;
  }
  getNews(): string {
    return this.host + this.modifier.news;
  }
  createNews(): string {
    return this.host + this.modifier.news;
  }
  updateNews(id:number): string {
    return this.host + this.modifier.news + `/${id}`;
  }
  getDrivers(): string {
    return this.host + this.modifier.drivers;
  }
  updateDriver(id:number): string {
    return this.host + this.modifier.driver + `/${id}`;
  }
  getRoutes(): string {
    return this.host + this.modifier.routes;
  }
  updateRoute(id:number): string {
    return this.host + this.modifier.route + `/${id}`;
  }
  deleteRoute(id:number): string {
    return this.host + this.modifier.route + `/${id}`;
  }
  deleteDriver(id:number): string {
    return this.host + this.modifier.driver + `/${id}`;
  }
  deleteNews(id:number): string {
    return this.host + this.modifier.news + `/${id}`;
  }
  getClaimCategories(): string {
    return this.host + this.modifier.claims + "/types";
  }
  // updateClaimCategory(tokendata){
  //   return this.host + this.modifier.claim +
  // }
  deleteClaimCategory(id:number): string {
    return this.host + this.modifier.claim + `/type/${id}`;
  }
  getUsers(): string {
    return this.host + this.modifier.users;
  }
  deleteUser(id:number): string {
    return this.host + this.modifier.user + `/${id}`;
  }
  createRoute(): string {
    return this.host + this.modifier.route;
  }
  getCities(): string {
    return this.host + this.modifier.cities;
  }
  getPoints(): string {
    return this.host + this.modifier.points;
  }
  getGeoAdress(lat:number, lng:number): string {
    return this.host + this.modifier.geo + `/${lat}/${lng}`;
  }
  deleteClaim(id:number): string {
    return this.host + this.modifier.claim + `/${id}`;
  }
  updateClaim(id:number): string {
    return this.host + this.modifier.claim + `/${id}`;
  }
  updateTask(id:number): string {
    return this.host + this.modifier.task + `/${id}`;
  }
};

