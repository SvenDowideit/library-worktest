import { useData } from "../data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Routes, Route, useParams } from 'react-router-dom';

function Borrow() {
  const { bookId } = useParams();
  const book = useData("/book/getbook?id="+bookId, "GET");
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
      <Box><BookBorrowOrReturnButton book={book}/></Box>
    </Box>
  );
}

export default Borrow;

function BookBorrowOrReturnButton(props) {
  const book = props.book;
  var action = "Borrow";

  if (book.borrowed) {
    action = "Return";
  }

  // TODO: this button should POST to /book/UpdateBookBorrowStatus

  return   <Button size="small" variant="contained" sx={{ mt: 2 }} href={"/borrow/"+book.id}>
  {action} Book
</Button>
}

function Loading() {
  return <Box>
    <Typography>Loading ...</Typography>
  </Box>
}