import { act, renderHook, waitFor } from "@testing-library/react";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useLazyGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../category";
import TestWrapper from "../../../helpers/TestWrapper";
import { categoryMocked } from "../../../__mocks__/data/category";

describe("Category service test suites", () => {
  it("get all categories", async () => {
    const { result } = renderHook(() => useGetCategoriesQuery(), {
      wrapper: TestWrapper,
    });
    const resp = await result.current.refetch();
    await waitFor(() => {
      expect(resp.data.data).toMatchObject([categoryMocked]);
    });
  });

  it("get single category", async () => {
    const {
      result: {
        current: [loadAction],
      },
    } = renderHook(() => useLazyGetCategoryQuery(), {
      wrapper: TestWrapper,
    });
    await act(async () => {
      const resp = await loadAction(1).unwrap();
      await waitFor(() => {
        expect(resp.data).toMatchObject(categoryMocked);
      });
    });
  });

  it("create new category", async () => {
    const {
      result: {
        current: [addAction],
      },
    } = renderHook(() => useCreateCategoryMutation(), {
      wrapper: TestWrapper,
    });
    await act(async () => {
      const resp = await addAction({
        name: "category name",
      }).unwrap();
      expect(resp.message).toEqual("success");
    });
  });

  it("update existing category", async () => {
    const {
      result: {
        current: [updateAction],
      },
    } = renderHook(() => useUpdateCategoryMutation(), {
      wrapper: TestWrapper,
    });
    await act(async () => {
      const resp = await updateAction({
        id: 1,
        name: "category name",
      }).unwrap();
      expect(resp.message).toEqual("success");
    });
  });

  it("delete category", async () => {
    const {
      result: {
        current: [deleteAction],
      },
    } = renderHook(() => useDeleteCategoryMutation(), {
      wrapper: TestWrapper,
    });
    await act(async () => {
      const resp = await deleteAction(1).unwrap();
      expect(resp.message).toEqual("success");
    });
  });
});
