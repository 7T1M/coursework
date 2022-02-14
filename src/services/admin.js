import axios from "axios";
import httpConfig from "../configs/http";
import http from "../configs/http";

function login(login, password) {
  return axios.post(http.login, {
    login: login,
    password: password,
  });
}

function signUp(login, password) {
  return axios.post(http.signUp, {
    login: login,
    password: password,
  });
}

function addFileToStorage(token, file, fileId) {
  return axios.post(
    http.addFileToStorage(fileId),
    {
      file: file,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getServicesTypes(token) {
  return axios.get(httpConfig.getServiceTypes, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getServices(token) {
  return axios.get(httpConfig.getServices, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getClaims(token) {
  return axios.get(httpConfig.getClaims, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getClaimsTypes(token) {
  return axios.get(httpConfig.getClaimCategories, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getTasks(token) {
  return axios.get(httpConfig.getTasks, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function getFileFromStorage(token, fileId) {
  return axios.get(httpConfig.getFile(fileId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function createServiceType(token, name) {
  return axios.put(
    httpConfig.createServiceType,
    {
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createService(token, data) {
  return axios.put(
    httpConfig.createService,
    {
      name: data.name,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      telegramToken: data.telegramToken ?? "",
      website: data.website,
      description: data.description,
      serviceType: data.serviceType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createClaim(token, data) {
  console.log(data)
  return axios.put(
    httpConfig.createClaim,
    {
      description: data.description,
      address: data.address,
      claimType: data.claimType,
      title:data.title
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createClaimType(token, data) {
  return axios.put(
    httpConfig.createClaimType,
    {
      name: data.name,
      mnemonicName: data.mnemonicName,
      tag: data.tag,
      priority: data.priority,
      serviceControlId: data.serviceControlId,
      serviceExecuteId: data.serviceExecuteId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
function getNews(token) {
  return axios.get(http.getNews, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function createNews(token, data) {
  return axios.put(
    http.createNews,
    {
      name: data.name,
      title: data.title,
      previewImageUrl: data.previewImageUrl,
      cityId: data.cityId,
      description: data.description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function updateNews(token, data) {
  return axios.post(
    http.updateNews(data.id),
    {
      name: data.name,
      title: data.title,
      description: data.description,
      cityId: data.cityId,
      previewImageUrl: data.previewImageUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function createDriver(token, data) {
  return axios.put(
    http.createDriver,
    {
      firstName: data.firstName,
      lastName: data.lastName,
      cityId: data.cityId,
      routeId: data.routeId,
      phone: data.phone,
      description: data.description,
      securityCode: data.securityCode,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getDrivers(token) {
  return axios.get(http.getDrivers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function updateDriver(token, data) {
  return axios.post(
    http.updateDriver(data.id),
    {
      firstName: data.firstName,
      lastName: data.lastName,
      cityId: data.cityId,
      routeId: data.routeId,
      phone: data.phone,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
function getRoutes(token) {
  return axios.get(http.getRoutes, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function updateRoute(token, data) {
  return axios.post(
    http.updateRoute(data.id),
    {
      startPointId: data.startPointId,
      endPointId: data.endPointId,
      cityId: data.cityId,
      routeName: data.routeName,
      description: data.description ?? "",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
function deleteRoute(token, id) {
  return axios.delete(http.deleteRoute(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function deleteDriver(token, id) {
  return axios.delete(http.deleteDriver(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function deleteNews(token, id) {
  return axios.delete(http.deleteNews(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function getClaimCategories(token) {
  return axios.get(http.getClaimCategories, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function deleteClaimCategory(token, id) {
  return axios.delete(http.deleteClaimCategory(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function getUsers(token) {
  return axios.get(http.getUsers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function deleteUser(token, id) {
  return axios.delete(http.deleteUser(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function createRoute(token, data) {
  return axios.put(
    http.createRoute,
    {
      startPointId: data.startPointId,
      endPointId: data.endPointId,
      cityId: data.cityId,
      routeName: data.routeName,
      typeId: data.typeId ?? 1,
      description: "Городской маршут",
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

function getCities(token) {
  return axios.get(http.getCities, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function getPoints(token) {
  return axios.get(http.getPoints, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function getGeoAdress(token, lat, lng) {
  return axios.get(http.getGeoAdress(lat, lng), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function deleteClaim(token, id) {
  return axios.delete(http.deleteClaim(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
function updateClaim(token, data) {
  return axios.post(
    http.updateClaim(data.id),
    {
      claimType: data.claimType,
      title: data.title,
      description: data.description,
      address: data.address,
      urlPreview: data.urlPreview,
      rate: data.rate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
function updateTask(token, data) {
  return axios.post(
    http.updateTask(data.id),
    {
      claimId: data.claimId,
      serviceId: data.serviceId,
      typeId: data.typeId,
      rate: data.rate,
      statusId: data.statusId,
      explanation: data.explanation,
      description: data.description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
const exportedObject = {
  login,
  signUp,
  addFileToStorage,
  getServicesTypes,
  getServices,
  getClaims,
  getTasks,
  getClaimsTypes,
  getFileFromStorage,
  createServiceType,
  createService,
  createClaim,
  createClaimType,
  getNews,
  createNews,
  updateNews,
  createDriver,
  getDrivers,
  updateDriver,
  getRoutes,
  updateRoute,
  deleteRoute,
  deleteDriver,
  deleteNews,
  getClaimCategories,
  deleteClaimCategory,
  getUsers,
  deleteUser,
  createRoute,
  getCities,
  getPoints,
  getGeoAdress,
  deleteClaim,
  updateClaim,
  updateTask,
};
export default exportedObject;
