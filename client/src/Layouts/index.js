import { Grid } from '@mui/material';
import Footer from 'components/Footer';
import Header from 'components/Header';
import Nav from 'components/Nav';
import React from 'react';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <Grid container>
        <Grid item xs={2} md={2}>
          <Nav />
        </Grid>
        <Grid item xs={10} md={10}>
          {props.children}
        </Grid>
      </Grid>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
