
import React, { useEffect,useContext } from "react";

import { Container, Row, Col, Image } from "react-bootstrap";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";


import moment from "moment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { Button } from "react-bootstrap";
import PostContext from '../post/PostContext'

import useStyles from "./style";

const ShowPost = ({ match }) => {
  const classes = useStyles();

  const postContext=useContext(PostContext)
  const {GetPostBypost,posts}=postContext
console.log(posts);
  useEffect(() => {
    GetPostBypost(match.params.id);
  }, []);

  console.log(posts);
  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.side}>
          <Typography variant="h3" align="center" color="secondary">
            {posts.name}
          </Typography>
          <Typography variant="h6" align="center" color="secondary">
            <ThumbUpAltIcon fontSize="small" /> Likes {posts.likeCount}
            {"  "}
          </Typography>
          <Typography variant="h4" align="center" color="secondary">
            <Button type="submit" variant="outline-success" className="p-2">
              Follow
            </Button>
          </Typography>
        </Paper>

        <Paper className={classes.main}>
          <Typography variant="h4" align="center" color="textSecondary">
            {posts.title}
          </Typography>
          <Typography variant="h5" align="center" color="secondary">
            {posts.name}
            {"  "}
            {posts.tags && posts.tags.map((tag) => `#${tag}`)}
          </Typography>
          <Typography variant="h5" align="center" color="secondary">
            {moment(posts.createdAt).fromNow()}
          </Typography>

          <Container>
            <Row>
              <Col xs={20} md={10}>
                <Image src={posts.selectedFile} fluid />
              </Col>
            </Row>
          </Container>
          <Typography variant="h5" paragraph="true" color="initial">
            {posts.message}
          </Typography>
          {/*<Typography variant="h5" paragraph="true" color="initial">
            <ReactMarkdown source={posts.sanitizedHtml} />
  </Typography>*/}
        </Paper>
      </div>
    </>
  );
};

export default ShowPost;
