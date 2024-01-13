import { render, screen } from "@testing-library/react";
import {
  DeleteButton,
  EditButton,
  PrimaryButton,
  SecondaryButton,
} from "../styled.component";

describe("Common component test suites", () => {
  it("render primary button", () => {
    render(<PrimaryButton>Primary Button</PrimaryButton>);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "#0469cf",
    });
  });

  it("render secondary button", () => {
    render(<SecondaryButton>Secondary Button</SecondaryButton>);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "#535657",
    });
  });

  it("render edit button", () => {
    render(<EditButton>Secondary Button</EditButton>);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "#d18902",
    });
  });

  it("render delete button", () => {
    render(<DeleteButton>Secondary Button</DeleteButton>);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveStyle({
      backgroundColor: "#b01c05",
    });
  });
});
