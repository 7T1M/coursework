export const getClaimType = function (claimTypeId, types) {
  for (const item in types) {
    if (types[item].id === claimTypeId) {
      return types[item].name;
    }
  }
  return "Нет такой категории";
};
