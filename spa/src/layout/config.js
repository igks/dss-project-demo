import { PATH } from "./../constants/path";
export const menu = [
  {
    group: "ADMIN",
    child: [
      {
        label: "Category",
        path: PATH.category,
      },
      {
        label: "Product",
        path: PATH.product,
      },
    ],
  },
  {
    group: "USER",
    child: [
      {
        label: "Product",
        path: PATH.product,
      },
    ],
  },
];
