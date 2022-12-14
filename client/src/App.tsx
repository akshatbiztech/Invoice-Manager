import React from "react";
import { Container, AppBar, Typography } from "material-ui/core";

function App() {
  return (
    <Container maxwidth="lg">
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">
          Memories
        </Typography>
      </AppBar>
    </Container>
  );
}

export default App;
