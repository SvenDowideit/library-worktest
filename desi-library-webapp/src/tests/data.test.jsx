import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import { beforeAll, afterEach, afterAll, expect, test } from "vitest";
import {renderHook, waitFor, act} from '@testing-library/react'
import { getAllBooks } from "../data";
import {sleep} from "./util"

const server = setupServer(
    http.get('http://localhost:5000/book/getallbooks', () => {
        console.log("calling mock getallbooks")
          // ...and respond to them using this JSON response.
          return HttpResponse.json([
              {
                "id": 1,
                "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
                "author": "Robert C. Martin",
                "borrowed": false
              },
              {
                "id": 2,
                "name": "Test Driven Development: By Example",
                "author": "Kent Beck",
                "borrowed": true
              },
              {
                "id": 3,
                "name": "Design Patterns: Elements of Reusable Object-Oriented Software",
                "author": "Erich Gamma; Richard Helm; Ralph Johnson; John Vlissides",
                "borrowed": false
              },
              {
                "id": 4,
                "name": "The Mythical Man-Month",
                "author": "Fred Brooks",
                "borrowed": false
              },
              {
                "id": 5,
                "name": "The Phoenix Project",
                "author": "Gene Kim; Kevin Behr; George Spafford",
                "borrowed": false
              }
            ])
        })
  );
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); 


test("Get all the books", async () => {
    // https://testing-library.com/docs/react-testing-library/api/#renderhook
    const { result }  = renderHook(() => getAllBooks())
    //await result.fetch();
    expect(result.current).toBeUndefined();

    await sleep(2500);    // Deal with the 2 second promise delay

    await act(async () => {
        await waitFor(() => {
            expect(result.current).toBeDefined();
        });
      });
    expect(result.current).toHaveLength(5)

});

// TODO: also test getBook and requestBookBorrowToggle