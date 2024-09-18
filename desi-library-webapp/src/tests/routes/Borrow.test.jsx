import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Borrow from "../../routes/Borrow";

test("Renders Borrow route", () => {
  render(<Borrow />);

  expect(screen.getByText(/Loading/i)).toBeDefined();
});
