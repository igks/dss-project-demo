import { getError } from "../common";

const dummyObj = {
  key: { message: "content" },
};

describe("Common helper test suites", () => {
  it("return error status true", () => {
    const res = getError(dummyObj, "key");
    expect(res.status).toBe(true);
    expect(res.message).toEqual("content");
  });

  it("return error status false", () => {
    const res = getError(dummyObj, "none");
    expect(res.status).toBe(false);
    expect(res.message).toEqual(" ");
  });
});
