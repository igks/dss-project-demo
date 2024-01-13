import { rest } from "msw";
import { categoryMocked } from "./data/category";

export const handlers = [
  rest.get("http://localhost:3000/category", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [categoryMocked],
      })
    );
  }),
];
