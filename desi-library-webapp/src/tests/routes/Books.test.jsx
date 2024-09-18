import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Books from "../../routes/Books";
import {sleep} from "../util"

test("Renders Books route", async () => {
    // TODO: need to add the fetch mock here too - tho without, it /is/ an e2e test
  render(<Books />);

  expect(screen.getByText(/Current Books/i)).toBeDefined();

  expect(screen.getByText(/Loading/i)).toBeDefined();
  await sleep(2500);    // Deal with the 2 second promise delay

  expect(screen.getByText(/Clean Code: A Handbook of Agile Software Craftsmanship/)).toBeInTheDocument();

});
