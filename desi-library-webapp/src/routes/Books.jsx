import { useData } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Loading } from '../components/Loading'


function Books() {
  const [booksData, setBooks] = useData("/book/getallbooks", "GET");

  return (
    <>
      <Typography variant="h6">Current Books</Typography>
      <Box>
        <BookList booksData={booksData} />
      </Box>
    </>
  );
}

export default Books;

function BookList(props) {
  if (!props.booksData) {
    return <Loading  />
  }
  return props.booksData.map((book) => (
    <BookRow book={book} />
  ))
}

function BookRow(props) {
  const book = props.book;

  return <Typography key={book.id}>
    <span>{book.name}</span>
    <span> by </span>
    <span>{book.author}</span>
    <BookBorrowOrReturnLink book={book} />
</Typography>
}

function BookBorrowOrReturnLink(props) {
  const book = props.book;
  var action = "Borrow";

  if (book.borrowed) {
    action = "Return";
  }
  return   <Button size="small" variant="contained" sx={{ mt: 2 }} href={"/borrow/"+book.id}>
  {action} Book
</Button>
}