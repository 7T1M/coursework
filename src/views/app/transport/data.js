// eslint-disable-next-line import/no-anonymous-default-export
export default {
  transport: [
    {
      id: "1",
      path: "37",
      drivers: "Иван, Андрей",
      start_point: "жд",
      end_point: "дмз",
      interval: "10 мин",
      working_hours: "8ч",
    },
    {
      id: "2",
      path: "17",
      drivers: "Иван, Андрей",
      start_point: "жд",
      end_point: "дмз",
      interval: "10 мин",
      working_hours: "8ч",
    },
    {
      id: "3",
      path: "70",
      drivers: "Иван, Андрей",
      start_point: "жд",
      end_point: "дмз",
      interval: "10 мин",
      working_hours: "8ч",
    },
  ],
  meta: {
    totalItems: 9,
    itemCount: 9,
    itemsPerPage: 100,
    totalPages: 1,
    currentPage: 1,
  },
  summary: {
    name: "Итого:",
    full_price: 85177,
    full_quantity: 2607,
    full_left_cost: 7596471,
    full_sales_costs: 299704,
  },
  links: {
    first: "https://api.salero.io/products/products?limit=100",
    previous: "",
    next: "",
    last: "https://api.salero.io/products/products?page=1&limit=100",
  },
};
