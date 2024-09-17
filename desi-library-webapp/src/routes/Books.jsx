import { useData } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Books() {
  const [booksData] = useData("/book/getallbooks", "GET");

  return (
    <>
      <Typography variant="h6">Current Books</Typography>
      <Box>
        {booksData && (booksData.map((book) => (
          <BookRow book={book} />
        )))}
      </Box>
    </>
  );
}

export default Books;

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