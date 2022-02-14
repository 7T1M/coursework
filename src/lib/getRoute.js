export const getRoute = function (routeId, routes) {
  for (const item in routes) {
    if (routes[item].id === routeId) {
      return routes[item].routeName;
    }
  }
  return "Нет такого маршрута";
};
