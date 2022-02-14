
var httpConfig = {
  host: "http://localhost:3000",
  modifier: {
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
  },
  get login() {
    return this.host + this.modifier.auth + "/signin";
  },
  get signUp() {
    return this.host + this.modifier.auth + "/signup";
  },
  get addFileToStorage() {
    return this.host + this.modifier.storage + "/load";
  },
  get getServiceTypes() {
    return this.host + this.modifier.services + "/types";
  },
  get getServices() {
    return this.host + this.modifier.services;
  },
  get getClaims() {
    return this.host + this.modifier.claims;
  },
  get getTasks() {
    return this.host + this.modifier.tasks;
  },
  getFile(fileId) {
    return this.host + this.modifier.storage + "/" + fileId;
  },
  get createServiceType() {
    return this.host + this.modifier.service + "/types";
  },
  get createService() {
    return this.host + this.modifier.service;
  },
  get createClaim() {
    return this.host + this.modifier.claim;
  },
  get createClaimsTypes() {
    return this.host + this.modifier.claim + "/type";
  },
  get createDriver() {
    return this.host + this.modifier.driver;
  },
  get getNews() {
    return this.host + this.modifier.news;
  },
  get createNews() {
    return this.host + this.modifier.news;
  },
  updateNews(id) {
    return this.host + this.modifier.news + `/${id}`;
  },
  get getDrivers() {
    return this.host + this.modifier.drivers;
  },
  updateDriver(id) {
    return this.host + this.modifier.driver + `/${id}`;
  },
  get getRoutes() {
    return this.host + this.modifier.routes;
  },
  updateRoute(id) {
    return this.host + this.modifier.route + `/${id}`;
  },
  deleteRoute(id) {
    return this.host + this.modifier.route + `/${id}`;
  },
  deleteDriver(id) {
    return this.host + this.modifier.driver + `/${id}`;
  },
  deleteNews(id) {
    return this.host + this.modifier.news + `/${id}`;
  },
  get getClaimCategories() {
    return this.host + this.modifier.claims + "/types";
  },
  // updateClaimCategory(token,data){
  //   return this.host + this.modifier.claim +
  // }
  deleteClaimCategory(id) {
    return this.host + this.modifier.claim + `/type/${id}`;
  },
  get getUsers() {
    return this.host + this.modifier.users;
  },
  deleteUser(id) {
    return this.host + this.modifier.user + `/${id}`;
  },
  get createRoute() {
    return this.host + this.modifier.route;
  },
  get getCities() {
    return this.host + this.modifier.cities;
  },
  get getPoints() {
    return this.host + this.modifier.points;
  },
  getGeoAdress(lat, lng) {
    return this.host + this.modifier.geo + `/${lat}/${lng}`;
  },
  deleteClaim(id) {
    return this.host + this.modifier.claim + `/${id}`;
  },
  updateClaim(id) {
    return this.host + this.modifier.claim + `/${id}`;
  },
  updateTask(id) {
    return this.host + this.modifier.task + `/${id}`;
  },
};

export default httpConfig;
