import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import FormCategory from "./../FormCategory";
import TestWrapper from "../../../../helpers/TestWrapper";
import * as service from "../../../../data/services/category";
import { PATH } from "../../../../constants/path";
import * as router from "react-router-dom";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
  useLocation: jest.fn(),
}));

const renderForm = () => {
  render(
    <TestWrapper>
      <FormCategory />
    </TestWrapper>
  );
};

describe("Form category test suites", () => {
  it("render form category", () => {
    renderForm();

    expect(screen.getByTestId("form-title")).toBeInTheDocument();
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("save-button")).toBeInTheDocument();
  });

  it("navigate when click back", () => {
    renderForm();

    const back = screen.getByTestId("back-button");
    fireEvent.click(back);
    expect(mockUseNavigate).toBeCalledWith(PATH.category);
  });

  it("submit new form", async () => {
    renderForm();

    const input = screen.getByTestId("input-name");
    const save = screen.getByTestId("save-button");

    const domAlert = window.alert;
    window.alert = jest.fn(() => true);
    const mockAlert = jest.spyOn(window, "alert");
    fireEvent.change(input, { target: { value: "category name" } });
    expect(input.value).toEqual("category name");

    fireEvent.click(save);
    await waitFor(() => {
      expect(mockAlert).toBeCalledWith("success");
    });
    window.alert = domAlert;
  });

  it("load category if id exist", async () => {
    const mockLocation = { state: { id: 1 } };
    const useLocationMock = jest.spyOn(router, "useLocation");
    useLocationMock.mockImplementation(() => mockLocation);
    renderForm();

    const input = screen.getByTestId("input-name");
    await waitFor(() => {
      expect(input.value).toEqual("Category 1");
    });
  });

  it("submit updated form", async () => {
    const mockLocation = { state: { id: 1 } };
    const useLocationMock = jest.spyOn(router, "useLocation");
    useLocationMock.mockImplementation(() => mockLocation);
    renderForm();

    const input = screen.getByTestId("input-name");
    const save = screen.getByTestId("save-button");

    const domAlert = window.alert;
    window.alert = jest.fn(() => true);
    const mockAlert = jest.spyOn(window, "alert");
    fireEvent.change(input, { target: { value: "category update" } });
    expect(input.value).toEqual("category update");

    fireEvent.click(save);
    await waitFor(() => {
      expect(mockAlert).toBeCalledWith("success");
    });
    window.alert = domAlert;
  });
});
