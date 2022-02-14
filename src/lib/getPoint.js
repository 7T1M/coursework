export const getPoint = function (pointId, points) {
  for (const item in points) {
    if (points[item].id === pointId) {
      return points[item].name;
    }
  }
  return "Нет такой точки";
};
