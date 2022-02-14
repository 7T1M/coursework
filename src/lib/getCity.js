export const getCity = function (cityId, cities) {
  for (const item in cities) {
  
    if (cities[item].id === cityId) {
      return cities[item].name;
    }
  }
  return "Нет такого города";
 };
