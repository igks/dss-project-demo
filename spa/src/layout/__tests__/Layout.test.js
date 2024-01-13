import { fireEvent, render, screen } from "@testing-library/react";
import TestWrapper from "../../__tests__/Wrapper";
import Layout from "..";

const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Layout component test suite", () => {
  describe("Render side bar", () => {
    it("render side navigation", () => {
      render(
        <TestWrapper>
          <Layout />
        </TestWrapper>
      );

      expect(screen.getByTestId("side-nav-container")).toBeInTheDocument();
      expect(screen.getByTestId("side-nav-title")).toBeInTheDocument();

      const groupTitle = screen.queryAllByTestId("side-nav-group-title");
      expect(groupTitle.length).toEqual(2);

      const groupLink = screen.queryAllByTestId("side-nav-link");
      expect(groupLink.length).toEqual(3);
    });

    it("navigate when click the link", () => {
      render(
        <TestWrapper>
          <Layout />
        </TestWrapper>
      );

      const groupLink = screen.queryAllByTestId("side-nav-link");
      fireEvent.click(groupLink[0]);
      expect(mockUseNavigate).toBeCalledTimes(1);
    });
  });

  describe("Render body", () => {
    it("render body container", () => {
      render(
        <TestWrapper>
          <Layout />
        </TestWrapper>
      );

      expect(screen.getByTestId("body-content-container")).toBeInTheDocument();
    });
  });

  describe("Render nav bar", () => {
    it("render top nav bar", () => {
      render(
        <TestWrapper>
          <Layout />
        </TestWrapper>
      );

      expect(screen.getByTestId("nav-bar")).toBeInTheDocument();
    });
  });
});
