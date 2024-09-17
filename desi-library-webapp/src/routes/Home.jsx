import { Button } from "@mui/material";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

function Home() {
  return (
    <Box>
      <Typography>Welcome to the DESI Library</Typography>
      <Button href="/books"  variant="contained">Goto list of books</Button>
    </Box>
  );
}

export default Home;
