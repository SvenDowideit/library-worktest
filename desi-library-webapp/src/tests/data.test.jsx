import { expect, test } from "vitest";
import {renderHook} from '@testing-library/react'
import { getAllBooks } from "../data";

test("Get all the books", () => {
    // https://testing-library.com/docs/react-testing-library/api/#renderhook
  const {books} = renderHook(() => getAllBooks())
  expect(books).toBeUndefined();
  // TODO: now, how to wait 3 seconds?

});

// TODO: also test getBook and requestBookBorrowToggle