import { render, screen } from "@testing-library/react";
import LandingPage from "../LandingPage";

describe("Landing page test suite", () => {
  it("render landing page", () => {
    render(<LandingPage />);

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });
});
