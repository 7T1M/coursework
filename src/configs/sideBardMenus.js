import {
  UserOutlined,
  StockOutlined,
  CarOutlined,
  IdcardOutlined,
  FormOutlined,
  AlertOutlined,
  BellOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  FileDoneOutlined,
  HeatMapOutlined 
} from "@ant-design/icons";

const menus = [
  {
    name: "Аналитика",
    path: "/app/analytic",
    access: "",
    icon: StockOutlined,
    key: "analytic",
  },
  {
    name: "Новости",
    path: "/app/news",
    access: "",
    icon: FileDoneOutlined,
    key: "news",
  },
  {
    name: "Роли и разрешения",
    path: "/app/roles",
    access: "",
    icon: IdcardOutlined,
    key: "roles",
  },
  {
    name: "Пользователи",
    path: "/app/users",
    access: "",
    icon: UserOutlined,
    key: "users",
  },
  {
    name: "Задания",
    path: "/app/tasks",
    access: "",
    icon: FormOutlined,
    key: "",
  },
  {
    name: "Заявки",
    path: "/app/claims",
    access: "",
    icon: FormOutlined,
    key: "claims",
  },
  {
    name: "Категории заявок",
    path: "/app/requests-categories",
    access: "",
    icon: UnorderedListOutlined,
    key: "requests-categories",
  },
  {
    name: "Тепловая карта",
    path: "/app/heatmap",
    access: "",
    icon: HeatMapOutlined,
    key: "heatmap",
  },
  {
    name: "Органы",
    path: "/app/services",
    access: "",
    icon: AlertOutlined,
    key: "services",
  },

  {
    name: "Маршруты",
    path: "/app/transport",
    access: "",
    icon: CarOutlined,
    key: "transport",
  },
  {
    name: "Водители",
    path: "/app/drivers",
    access: "",
    icon: TeamOutlined,
    key: "drivers",
  },
];
export default menus;
