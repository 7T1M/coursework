// eslint-disable-next-line import/no-anonymous-default-export
export default {
  users: [
    {
      id: "20212022",
      name: "Иван",
      login: "vanyCoolMan",
      role: "Работяга",
      verified: "Да",
      rating: "100",
    },
    {
      id: "20222023",
      name: "Артем",
      login: "artemka2010",
      role: "Школьник",
      verified: "Нет",
      rating: "20",
    },
    {
      id: "20222023",
      name: "Денис",
      login: "pushkaDPR",
      role: "Министр",
      verified: "Да",
      rating: "100",
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
