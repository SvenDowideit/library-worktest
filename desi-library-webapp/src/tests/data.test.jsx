import { expect, test } from "vitest";
import { getAllBooks } from "../data";

test("Get all the books", () => {
    // TODO: this can't work, because it's a useEffect, so needs to be in a rendered component
  const books = getAllBooks();
  expect(books).toBeNull(); // should be null for a moment..
});
