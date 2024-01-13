import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import TestWrapper from "../../../../helpers/TestWrapper";
import Category from "..";
import * as service from "../../../../data/services/category";
import { PATH } from "../../../../constants/path";
import { server } from "../../../../__mocks__/server";
import { rest } from "msw";
import { mockEmptyCategory, resetServer } from "../../../../__mocks__/handler";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

const renderCategory = () => {
  render(
    <TestWrapper>
      <Category />
    </TestWrapper>
  );
};

describe("Category table test suites", () => {
  it("render loading state", () => {
    renderCategory();

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("render title and add new button", async () => {
    renderCategory();

    await waitFor(() => {
      expect(screen.getByTestId("category-title")).toBeInTheDocument();
      expect(screen.getByTestId("category-add-new-button")).toBeInTheDocument();
    });
  });

  it("render empty data info", async () => {
    mockEmptyCategory();
    renderCategory();

    await waitFor(() => {
      expect(screen.getByTestId("no-data-info")).toBeInTheDocument();
    });
  });

  it("render category table", async () => {
    renderCategory();

    await waitFor(() => {
      expect(screen.getByTestId("category-table")).toBeInTheDocument();
      expect(screen.getByTestId("edit-button")).toBeInTheDocument();
      expect(screen.getByTestId("delete-button")).toBeInTheDocument();
    });
  });

  it("navigate when click add button", async () => {
    renderCategory();

    await waitFor(() => {
      const button = screen.getByTestId("category-add-new-button");
      fireEvent.click(button);
      expect(mockUseNavigate).toBeCalledWith(PATH.form_category);
    });
  });

  it("navigate when click edit button", async () => {
    renderCategory();

    await waitFor(() => {
      const button = screen.getByTestId("edit-button");
      fireEvent.click(button);
      expect(mockUseNavigate).toBeCalledWith(PATH.form_category, {
        state: { id: 1 },
      });
    });
  });

  it("show prompt when click delete", async () => {
    renderCategory();

    await waitFor(() => {
      const domConfirm = window.confirm;
      window.confirm = jest.fn(() => {});
      const mockConfirm = jest.spyOn(window, "confirm");
      const button = screen.getByTestId("delete-button");
      fireEvent.click(button);
      expect(mockConfirm).toBeCalledTimes(1);
      window.confirm = domConfirm;
    });
  });

  it("delete on confirmed", async () => {
    renderCategory();

    await waitFor(async () => {
      const domConfirm = window.confirm;
      const domAlert = window.alert;
      window.confirm = jest.fn(() => true);
      window.alert = jest.fn(() => true);
      const mockConfirm = jest.spyOn(window, "confirm");
      const mockAlert = jest.spyOn(window, "alert");
      const button = screen.getByTestId("delete-button");
      fireEvent.click(button);
      expect(mockConfirm).toBeCalledTimes(1);
      await waitFor(() => {
        expect(mockAlert).toBeCalledWith("success");
      });
      window.confirm = domConfirm;
      window.alert = domAlert;
    });
  });
});
