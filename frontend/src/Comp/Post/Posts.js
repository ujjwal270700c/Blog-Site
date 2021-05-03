import React,{useContext,useEffect} from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import PostContext from '../../post/PostContext'

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
 const postContext=useContext(PostContext);
 const {posts,GetPost}=postContext
  const classes = useStyles();
useEffect(() => {
    GetPost()
}, [])
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <Post post={post}  />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
