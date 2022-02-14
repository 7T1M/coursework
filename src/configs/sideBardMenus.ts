import {
  UserOutlined,
  StockOutlined,
  CarOutlined,
  IdcardOutlined,
  FormOutlined,
  AlertOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";

interface IMenu {
  name: string;
  path: string;
  icon: any;
  key: string;
}

const menus: IMenu[] = [
  {
    name: "Аналитика",
    path: "/app/analytic",

    icon: StockOutlined,
    key: "analytic",
  },
  {
    name: "Новости",
    path: "/app/news",

    icon: FileDoneOutlined,
    key: "news",
  },
  {
    name: "Роли и разрешения",
    path: "/app/roles",

    icon: IdcardOutlined,
    key: "roles",
  },
  {
    name: "Пользователи",
    path: "/app/users",

    icon: UserOutlined,
    key: "users",
  },
  {
    name: "Задания",
    path: "/app/tasks",

    icon: FormOutlined,
    key: "",
  },
  {
    name: "Заявки",
    path: "/app/claims",

    icon: FormOutlined,
    key: "claims",
  },
  {
    name: "Категории заявок",
    path: "/app/requests-categories",

    icon: UnorderedListOutlined,
    key: "requests-categories",
  },
  {
    name: "Тепловая карта",
    path: "/app/heatmap",

    icon: HeatMapOutlined,
    key: "heatmap",
  },
  {
    name: "Органы",
    path: "/app/services",

    icon: AlertOutlined,
    key: "services",
  },

  {
    name: "Маршруты",
    path: "/app/transport",

    icon: CarOutlined,
    key: "transport",
  },
  {
    name: "Водители",
    path: "/app/drivers",

    icon: TeamOutlined,
    key: "drivers",
  },
];
export default menus;
