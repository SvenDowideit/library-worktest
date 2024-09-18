import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Books from "../../routes/Books";

test("Renders Books route", () => {
  render(<Books />);

  expect(screen.getByText(/Current Books/i)).toBeDefined();

//   Can we find Loading, and then wait til it's gone?
});
