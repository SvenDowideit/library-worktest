import { request, useData } from "../data";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Loading } from '../components/Loading'

function Borrow() {
  const { bookId } = useParams();
  const [book, setBook] = useData("/book/getbook?id="+bookId, "GET");
  var action = "Borrow";

  if (!book) {
    return <Loading />
  }

  if (book?.borrowed) {
    action = "Return";
  }

  return (
    <Box>
      <Typography variant="h6">{book?.name}</Typography>
      <Box>
        By {book.author}
      </Box>
      <Box>{book.pages} pages in {book.language}</Box>
      <Box><BookBorrowOrReturnButton book={book} setBook={setBook}/></Box>
    </Box>
  );
}

export default Borrow;

function BookBorrowOrReturnButton(props) {
  const navigate = useNavigate();
  const [submitBeingHandled, setsubmitBeingHandled] = useState()

  const book = props.book;
  var action = "Borrow";

  if (book.borrowed) {
    action = "Return";
  }

  // TODO: this button should POST to /book/UpdateBookBorrowStatus
  const handleSubmit = async (e) => {
    setsubmitBeingHandled(true);  // UI indicator that the API request is in flight
    console.log('Submitting form'+JSON.stringify(book))
    request('/book/updatebookborrowstatus?bookId='+book.id, 'PUT').then(function(response) {
      console.log(response)
      props.setBook(response)
      setsubmitBeingHandled(false);
      return response.ok
    })

    console.log('Form submitted.')
  }

  return  <Button size="small" variant="contained" sx={{ mt: 2 }}  onClick={handleSubmit} disabled={submitBeingHandled}>
    {action} Book
  </Button>
}