import IMenu from "../shared-interfaces/IAppRoute";

import News from "../views/app/news/News";
import RequestsCategory from "../views/app/requests-category/RequestsCategory";
import Requests from "../views/app/requests/Requests";
import Tasks from "../views/app/tasks/Tasks";
import Transport from "../views/app/transport/Transport";

const menus: IMenu[] = [
  {
    name: "Новости",
    link: "/app/news",
    path: "news",
    component: News,

    icon: "FileDoneOutlined",
    key: "news",
  },

  {
    name: "Заявки",
    link: "/app/claims",
    component: Requests,
    path: "claims",
    icon: "FormOutlined",
    key: "claims",
  },
  {
    name: "Задания",
    link: "/app/tasks",
    path: "tasks",
    component: Tasks,
    icon: "FormOutlined",
    key: "tasks",
  },
  {
    name: "Категории заявок",
    link: "/app/claim-types",
    path: "claim-types",
    component: RequestsCategory,
    icon: "UnorderedListOutlined",
    key: "requests-categories",
  },
  {
    name: "Маршруты",
    link: "/app/transport",
    path: "transport",
    component: Transport,

    icon: "BranchesOutlined",
    key: "transport",
  },
];
export default menus;
