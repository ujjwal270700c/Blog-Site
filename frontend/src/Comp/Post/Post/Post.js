import React, { useContext } from "react";
import {Link} from 'react-router-dom'
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import useStyles from "../../Profile/poststyle";
import moment from "moment";
import PostContext from "../../../post/PostContext";
import CommentIcon from "@material-ui/icons/Comment";

const Post = ({ post }) => {
  const postContext = useContext(PostContext);
  const { likePost } = postContext;

  const classes = useStyles();
  const Likes = ({post}) => {
    if (post.like&& post.likes.length > 0) {
      return post.likes.find((like) => like === localStorage.id) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };
  const Coments = () => {
    return (
      <>
       <Link to={`/post/${post._id}`}>
       <CommentIcon fontSize="small" />
        &nbsp;Read More
          </Link>
       
      </>
    );
  };
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => likePost(post._id)}>
          <Likes  post={post}/>
        </Button>

        <Button size="small" color="primary">
          <Coments />
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;

