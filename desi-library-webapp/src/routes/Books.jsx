import { useData } from "../data";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Books() {
  const booksData = useData("/book/getallbooks", "GET");

  return (
    <>
      <Typography variant="h6">Current Books</Typography>
      <Box>
        {booksData && (booksData.map((book) => (
          <Typography key={book.id}>
            <span>{book.name}</span>
            <span> by </span>
            <span>{book.author}</span>
          </Typography>
        )))}
      </Box>
      <Button variant="contained" sx={{ mt: 2 }}>
        Borrow Book
      </Button>
    </>
  );
}

export default Books;
