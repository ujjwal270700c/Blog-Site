import React, {useContext, useRef, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";


import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";


import AuthContext from '../auth/AuthContext'
import PostContext from '../post/PostContext'
import memories from "../images/memories.png";

import useStyles from "./styles";

const Navbar = () => {
  const classes = useStyles();
 



  const history = useHistory();
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const text = useRef("");
  const { user, logout } = authContext;
  const postContext = useContext(PostContext);
  const { filterPost, clearFilter, filtered } = postContext;
  // useEffect(() => {
  //   if (filtered === null) {
  //     text.current.value = "";
  //   }
  // });

  // const onChange = (e) => {
  //   console.log(text.current.value);
  //   if (text.current.value !== "" && text.current.value) {
  //     filterPost(e.target.value);
  //   } else {
  //     clearFilter();
  //   }
  // };

  let flag = null;
  if (localStorage.token) {
    flag = true;
  } else {
    flag = false;
  }
  const Exit = () => {
    logout();
  };
  

  return (
    <div>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
          <Typography
            component={Link}
            to="/"
            className={classes.heading}
            variant="h2"
            align="center"
          >
            Blog-Article{" "}
          </Typography>
          <img
            className={classes.image}
            src={memories}
            alt="icon"
            height="40"
          />
          {/* <LinkContainer to="/jobs">
                <Nav.Link>
                  <button type="button" class="btn btn-primary btn-sm">
                    Jobs
                  </button>
                </Nav.Link>
  </LinkContainer>*/}
        </div>

        <Toolbar className={classes.toolbar}>
          {localStorage.token ? (
            <>
              {/*<div>
                <Link className="btn btn-light my-3" to="/jobs">
                  Jobs
                </Link>
              </div>*/}

              <div className={classes.profile}>
                
                <Link to={`/profile`}>
                  <Typography className={classes.userName} variant="h6">
                    {localStorage.name}
                  </Typography>
                </Link>
                <Link to="/create-post">
                  <Typography className={classes.userName} variant="h6">
                 ADDPOST
                  </Typography>
                </Link>
                <Button
                  variant="contained"
                  className={classes.logout}
                  color="secondary"
                  onClick={Exit}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
           
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
