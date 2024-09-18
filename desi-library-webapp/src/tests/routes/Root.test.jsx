import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Root from "../../routes/Root";

test("Renders root route", () => {
  render(<Root />);

  expect(screen.getByText(/DESI Library/i)).toBeDefined();
});
