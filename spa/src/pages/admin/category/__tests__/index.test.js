import { render, screen, waitFor } from "@testing-library/react";
import TestWrapper from "../../../../__tests__/Wrapper";
import Category from "..";

describe("Category table test suites", () => {
  it("render loading state", () => {
    render(
      <TestWrapper>
        <Category />
      </TestWrapper>
    );

    expect(screen.getByTestId("loading-state")).toBeInTheDocument();
  });

  it("render title and add new button", async () => {
    render(
      <TestWrapper>
        <Category />
      </TestWrapper>
    );
    await waitFor(() => {
      expect(screen.getByTestId("category-title")).toBeInTheDocument();
      expect(screen.getByTestId("category-add-new-button")).toBeInTheDocument();
    });
  });
});
