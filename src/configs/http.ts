
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
  login() {
    return this.host + this.modifier.auth + "/signin";
  }
  signUp() {
    return this.host + this.modifier.auth + "/signup";
  }
  addFileToStorage() {
    return this.host + this.modifier.storage + "/load";
  }
  getServiceTypes() {
    return this.host + this.modifier.services + "/types";
  }
  getServices() {
    return this.host + this.modifier.services;
  }
  getClaims() {
    return this.host + this.modifier.claims;
  }
  getTasks() {
    return this.host + this.modifier.tasks;
  }
  getFile(fileId:number) {
    return this.host + this.modifier.storage + "/" + fileId;
  }
  createServiceType() {
    return this.host + this.modifier.service + "/types";
  }
  createService() {
    return this.host + this.modifier.service;
  }
  createClaim() {
    return this.host + this.modifier.claim;
  }
  createClaimsTypes() {
    return this.host + this.modifier.claim + "/type";
  }
  createDriver() {
    return this.host + this.modifier.driver;
  }
  getNews() {
    return this.host + this.modifier.news;
  }
  createNews() {
    return this.host + this.modifier.news;
  }
  updateNews(id:number) {
    return this.host + this.modifier.news + `/${id}`;
  }
  getDrivers() {
    return this.host + this.modifier.drivers;
  }
  updateDriver(id:number) {
    return this.host + this.modifier.driver + `/${id}`;
  }
  getRoutes() {
    return this.host + this.modifier.routes;
  }
  updateRoute(id:number) {
    return this.host + this.modifier.route + `/${id}`;
  }
  deleteRoute(id:number) {
    return this.host + this.modifier.route + `/${id}`;
  }
  deleteDriver(id:number) {
    return this.host + this.modifier.driver + `/${id}`;
  }
  deleteNews(id:number) {
    return this.host + this.modifier.news + `/${id}`;
  }
  getClaimCategories() {
    return this.host + this.modifier.claims + "/types";
  }
  // updateClaimCategory(tokendata){
  //   return this.host + this.modifier.claim +
  // }
  deleteClaimCategory(id:number) {
    return this.host + this.modifier.claim + `/type/${id}`;
  }
  getUsers() {
    return this.host + this.modifier.users;
  }
  deleteUser(id:number) {
    return this.host + this.modifier.user + `/${id}`;
  }
  createRoute() {
    return this.host + this.modifier.route;
  }
  getCities() {
    return this.host + this.modifier.cities;
  }
  getPoints() {
    return this.host + this.modifier.points;
  }
  getGeoAdress(lat:number, lng:number) {
    return this.host + this.modifier.geo + `/${lat}/${lng}`;
  }
  deleteClaim(id:number) {
    return this.host + this.modifier.claim + `/${id}`;
  }
  updateClaim(id:number) {
    return this.host + this.modifier.claim + `/${id}`;
  }
  updateTask(id:number) {
    return this.host + this.modifier.task + `/${id}`;
  }
};

