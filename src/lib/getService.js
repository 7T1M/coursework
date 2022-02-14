export const getService = function (service, services) {
  for (const item in services) {
    console.log(item);
    if (services[item].id === service) {
      return services[item].name;
    }
  }
  return "Нет такого органа";
};
