import { useEffect, useState } from "react";

/**
 * Ask the server to give us a list of books
 * @returns bookDataArray
 */
export const getAllBooks = () => {
  const [booksData] =  useData("/book/getallbooks", "GET");
  return booksData;
}

/**
 * Ask the server to give us a specific book
 * @param bookId
 * @returns [bookData, setBookData]
 */
export const getBook = (bookId) => {
  const [data, setData] =  useData("/book/getbook?id="+bookId, "GET");
  return [data, setData];
}

/**
 * ask the server to toggle the borrow status
 * @param {*} bookId 
 * @returns Promise(of a BookData)
 */
export const requestBookBorrowToggle = (bookId) => {
  return request('/book/updatebookborrowstatus?bookId='+bookId, 'PUT');
}

/**
 * useData hook for communicating with the backend.
 * @param {*} path Relative path from root, ie /books/getallbooks
 * @param {*} method HTTP method to use, ie GET
 * @param {*} body Body if chosen method requires it.
 * @returns The data that was requested.
 */
const useData = (path, method, body) => {
  const [data, setData] = useState();

  useEffect(() => {
    let ignore = false;
    request(path, method, body).then((json) => {
      if (!ignore) {
        setData(json);
      }
    });
    return () => {
      ignore = true;
    };
  }, [path, method, body]);

  return [data, setData];
};


const baseUrl = "http://localhost:5000";

const request = async (path, method, body) => {
  const resp = await fetch(`${baseUrl}${path}`, {
    method,
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: body && JSON.stringify(body),
  });

  /** This artificial delay is intentional -- please do not remove it! */
  return await new Promise((resolve) =>
    setTimeout(() => resolve(resp.json()), 2000)
  );
};
