# DESI Library - Work Test

## Instructions

- You are expected to complete this work test by yourself, no help from anyone else is allowed. You are however, allowed to use the internet to search for existing technical advice and documentation.
- You will need to fork this repository and complete all the tasks required for this work test.
- To submit this work test you will have to send us the link for the forked repository that you pushed the commits to.
- This test needs to be completed before 11:59PM on Wednesday the 18th. Any commits submitted after this will NOT be assessed.
- Do not commit unncessary files to your repository.

## Work Test Scenario

As a developer you are required to implement some new features and update existing features based on the tasks below. The scenario for this test is a web app responsible for managing the DESI library.

The front-end is implemented in React 18 and the web API is implemented with ASP.NET Core 8.

## Tasks

- Some pages in the app aren't working, so it needs to be fixed.
  - [x] fixed Books use before fetch() crash
  - [ ] CONSIDER replacing with axios or something that has a 'loading' state
  - [x] add a loading... placeholder
- Implement a routing mechanism for the home and borrow pages.
  - [x] add /borrow route
  - [x] CONSIDER removing the `Root` / route and using just `Home` as / (why have 2 "homes"?)
- [x] Add a button on the home page that will redirect users to the list of books.
  - [x] added a Button
- Display more information about each book on the books page.
  - [x] Implement the `/book/getbook` API request.
  - [x] Add more info on on the /books page
  - [ ] task implies we should use `/book/getbook` on the books page
  - [ ] CONSIDER makeing getallbooks return all the info that will be displayed there, and
  - [ ] CONSIDER a `/book/1` ... page that shows that specific book, it's status etc.. (this is basically what /borrow/:bookId is, so ... rename?)
- Implement a new feature on the borrow page to be able to borrow a book and return it.
  - [x] CLIENT UX: Prevent books from being borrowed until they are returned. (button only shows the available action)
  - [x] SERVER API: Prevent books from being borrowed until they are returned. (need to change to a borrow/return API)
- Show the users which books cannot be borrowed.
 - [x] Added Borrowed bool to the SimpleBookDto class, so the /books list can show it ()
 - [x] Add similar to the /borrow page
 - [ ] when we have the concept of different users, there will need to be a third state - someone else borrowed
- [x] Implement unit tests.
- [x] The project should compile and run after the changes.

This work test code is not necessarily best practice code, if you think it can be improved we encourage you to do so and detail why at the bottom of this README.

### Optional Challenges

- Add authentication.
- [x] Add a database.
- Implement e2e tests.
- Change the architecture to support a better design. Your ideal implementation for this problem.

You are welcome to add additional packages for these challenges as needed. Please detail why you have added a package at the bottom of the README.

## How to Run

### Tooling

- Download and install the [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download).
  - Ubuntu: `sudo apt install dotnet-sdk-8.0 dotnet8`
- Download and install [Node.js 20](https://nodejs.org/en/download).
  - Or use [`nvm`](https://github.com/nvm-sh/nvm) to manage multiple versions of Node.js
  - run `nvm install` from the `desi-library-webapp` dir
- [React Developer Tools](https://react.dev/learn/react-developer-tools) can be installed into your browser to help debug issues

### Frontend

The frontend was bootstrapped with [Vite](https://vitejs.dev/).

To install the Node dependencies, run `npm install`

To start the dev server, run `npm run dev` and it should be hosted at <http://localhost:5173/>

Unit tests are run with [Vitest](https://vitest.dev/). You can run tests by running `npm run test` and check code coverage with `npm run coverage`

### Backend

To start the backend API, run `dotnet run` in the API folder. It should be hosted at <http://localhost:5000/> 

## Your Comments

1. In implementing /borrow/:bookId, I've changed the API response to return the updated book object. This is then used to cause the page to update.
   - of course, this is kinda wrong, as we can't mutate the _books...
2. I've changed useData to also return the set() function, and have exported request to make the borrow toggle API call consistent.
3. I've removed the *Borrow* menu Item, as it's only useful when called with a bookId - see the return/borrow buttons in the Book list
4. moving to SQLite as the Book database
  * `sqlite3 /home/sven/Documents/MyData.db -cmd "select * from Book;"`
  * the location of the database is printed out by the server, but it's platform dependent
  * if the SQLite DB file doesn't exist, re-initialise it with the original data
5. replaced the toggle book status API with a borrow, and a return API endpoint, and updated the UI
  * there is a race condition if the user has more than one browser open to the same borrow page - and I havn't found the way to trigger a re-render.
6. set the Book.Borrow value to not be in the database, and used the BookBorrowRecs table, and generated the values.

Yup, I'd love to have had time to work out how to write tests for the BooksContext and API - that was interesting :)

