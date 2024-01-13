import { rest } from "msw";
import { categoryMocked } from "./data/category";
import { server } from "./server";

export const handlers = [
  rest.get(
    `${process.env.REACT_APP_DOMAIN_SERVICE}/category`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          data: [categoryMocked],
        })
      );
    }
  ),
  rest.get(
    `${process.env.REACT_APP_DOMAIN_SERVICE}/category/1`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          data: categoryMocked,
        })
      );
    }
  ),
  rest.post(
    `${process.env.REACT_APP_DOMAIN_SERVICE}/category`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: "success",
        })
      );
    }
  ),
  rest.put(
    `${process.env.REACT_APP_DOMAIN_SERVICE}/category/1`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          message: "success",
        })
      );
    }
  ),
  rest.delete(
    `${process.env.REACT_APP_DOMAIN_SERVICE}/category/1`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: false,
          message: "success",
        })
      );
    }
  ),
];

export const mockEmptyCategory = () => {
  return server.use(
    rest.get(
      `${process.env.REACT_APP_DOMAIN_SERVICE}/category`,
      (req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            data: [],
          })
        );
      }
    )
  );
};
