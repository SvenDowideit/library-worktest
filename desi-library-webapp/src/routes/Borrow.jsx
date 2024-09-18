import { requestBookBorrow, requestBookReturn, getBook } from "../data";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useState } from "react";
import { useParams } from 'react-router-dom';

import { Loading } from '../components/Loading'

function useForceUpdate() {
  const [, setToggle] = useState(false);
  return () => setToggle(toggle => !toggle);
}

function Borrow() {
  const { bookId } = useParams();
  const [book, setBook] = getBook(bookId);
  const forceUpdate = useForceUpdate();
  
  if (!book) {
    return <Box><Loading /></Box>
  }

  return (
    <Box>
      <Typography variant="h6">{book?.name}</Typography>
      <Box>
        By {book.author}
      </Box>
      <Box>{book.pages} pages in {book.language}</Box>
      <Box><BookBorrowOrReturnButton book={book} setBook={setBook} force={forceUpdate}/></Box>
    </Box>
  );
}

export default Borrow;

function BookBorrowOrReturnButton(props) {
  const [submitBeingHandled, setsubmitBeingHandled] = useState()
  const book = props.book;
  var action = "Borrow";

  if (book.borrowed) {
    action = "Return";
  }

  const handleSubmit = async (e) => {
    setsubmitBeingHandled(true);  // UI indicator that the API request is in flight
    console.log('Submitting form'+JSON.stringify(book))
    var aRequest;
    if (book.borrowed) {
      aRequest = requestBookReturn(book.id)
    } else {
      aRequest = requestBookBorrow(book.id)
    }
    aRequest.then(function(response) {
      console.log(response)
      if (response.id != book.id) {
        console.log("ERROR: trying to "+action+"book, please refresh")

        // we got an error from the server
        // TODO: add some kind of error status notification
      } else {
        props.setBook(response)
        setsubmitBeingHandled(false);
        return response.ok
       }
    })

    console.log('Form submitted.')
  }

  return  <Button size="small" variant="contained" sx={{ mt: 2 }}  onClick={handleSubmit} disabled={submitBeingHandled}>
    {action} Book
  </Button>
}