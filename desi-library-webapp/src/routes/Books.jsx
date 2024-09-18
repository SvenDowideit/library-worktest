import { getAllBooks } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Loading } from '../components/Loading'


function Books() {
  const booksData = getAllBooks();

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
  return <Table>
            <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Authors</TableCell>
            <TableCell>Borrow</TableCell>
          </TableRow>
        </TableHead>
    {props.booksData.map((book) => (
    <BookRow book={book} />
  ))}
  </Table>
}

function BookRow(props) {
  const book = props.book;

  return <TableRow key={book.id}>
    <TableCell>{book.name}</TableCell>
    <TableCell>{book.author}</TableCell>
    <TableCell><BookBorrowOrReturnLink book={book} /></TableCell>
</TableRow>
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