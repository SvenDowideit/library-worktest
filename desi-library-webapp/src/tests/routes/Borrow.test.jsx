
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'

import {
    MemoryRouter,
    Routes,
    Route,
  } from "react-router-dom";
import { beforeAll, afterEach, afterAll, expect, test } from "vitest";
import { render, screen, waitFor, act } from "@testing-library/react";
import Borrow from "../../routes/Borrow";
import {sleep} from "../util"


const server = setupServer(
    http.get('http://localhost:5000/book/getbook', ({ request }) => {
        const url = new URL(request.url)
        const Id = url.searchParams.get('id')
        // ...and respond to them using this JSON response.
        console.log("calling mock getbook: "+Id)
        return HttpResponse.json(
            {
              "id": 1,
              "name": "Clean Code: A Handbook of Agile Software Craftsmanship",
              "author": "Robert C. Martin",
              "borrowed": false
            })
          })
  );
  
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
  

test("Renders Borrow route got Book 1", async () => {
    render(
        <MemoryRouter initialEntries={["/borrow/1"]}>
            <Routes>
            <Route path="borrow/" >
                <Route path=":bookId" element={<Borrow />} />
            </Route>
            </Routes>
        </MemoryRouter>
        );

  expect(screen.getByText(/Loading/i)).toBeDefined();
  await sleep(2500);    // Deal with the 2 second promise delay

  expect(screen.getByText(/Clean Code: A Handbook of Agile Software Craftsmanship/)).toBeInTheDocument();

});
