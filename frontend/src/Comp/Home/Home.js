import React, { useState, useEffect } from "react";

import { Container, Grow, Grid } from "@material-ui/core";
import { TextField, Button, Typography, Paper } from "@material-ui/core";


import Posts from "../Post/Posts";


import Quotes from "../Quotes/Quotes";
import Footer from "../Footer/Footer";

const Home = () => {

 
  return (
    <>
    
     

      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={20} sm={11}>
              <Posts  />
            </Grid>

            {/* <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper></Paper>
            </Grid> */}
          </Grid>
        </Container>
      </Grow>

      <Quotes />
      <Footer />
    </>
  );
};

export default Home;