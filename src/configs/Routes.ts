import IMenu from "../shared-interfaces/IAppRoute";

import News from "../views/app/news/News";
import RequestsCategory from "../views/app/requests-category/RequestsCategory";
import Requests from "../views/app/requests/Requests";

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
    name: "Категории заявок",
    link: "/app/claim-types",
    path: "claim-types",
    component: RequestsCategory,
    icon: "UnorderedListOutlined",
    key: "requests-categories",
  },
];
export default menus;
