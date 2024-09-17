import { useData } from "../data";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
      <Typography variant="h6">{action} Book {bookId}</Typography>
      <Box>
        {book?.name}
      </Box>
    </Box>
  );
}

export default Borrow;

function Loading() {
  return <Box>
    <Typography>Loading ...</Typography>
  </Box>
}