import React, { useReducer } from "react";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";
import AuthToken from '../auth/AuthToken'
import axios from "axios";
import {
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
  CLEAR_CURRENT_POST,
  GET_POST,
  FILTER_POST,
  CLEAR_FILTER_POST,
  GET_POSTBYUSER,
  LIKE,
  GET_POSTBYPOST,ADD_COMMENT,REMOVE_COMMENT,POST_ERROR
} from "../auth/action";

if (localStorage.token) {
  AuthToken(localStorage.token);
  console.log('tokensakjbcvaskbvcas');
}
const PostState = (props) => {
  const initialState = {
    posts: [],
    post:null,
    current: null,
    filtered:null
  };
  const [state, dispatch] = useReducer(PostReducer, initialState);

  const AddPost = async (post) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      await axios.post("https://blog-app334.herokuapp.com/api/posts", post, config);
      dispatch({
        type: ADD_POST,
        payload: post,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetPost = async () => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("https://blog-app334.herokuapp.com/api/posts", config);
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetPostByUser = async (id) => {
    console.log(id);
    try {
      const res = await axios.get(`https://blog-app334.herokuapp.com/api/posts/${id}`);
      console.log(res.data);
      dispatch({
        type: GET_POSTBYUSER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const GetPostBypost = async (id) => {
    console.log(id);
    try {
      const res = await axios.get(`https://blog-app334.herokuapp.com/api/posts/${id}/bypost`);
      console.log(res.data);
      dispatch({
        type: GET_POSTBYPOST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (_id) => {
    try {
      console.log(_id, "ahscjgasvcgav");
      await axios.delete(`https://blog-app334.herokuapp.com/api/posts/${_id}`);
      dispatch({ type: DELETE_POST, payload: _id });
    } catch (error) {
      console.log(error);
    }
  };
  const setCurrent = (post) => {
    dispatch({ type: SET_CURRENT_POST, payload: post });
  };
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT_POST });
  };
  const updatePost = async (post) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      console.log(post._id, "ahscjgasvcgav");
      const res = await axios.patch(`https://blog-app334.herokuapp.com/api/posts/${post._id}`, post, config);
      dispatch({ type: UPDATE_POST, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const likePost = async (_id) => {
    const config = {
      headers: {
        "Conten-Type": "application/json",
      },
    };
    try {
      const res = await axios.patch(`https://blog-app334.herokuapp.com/api/posts/${_id}/likePost`, config);
      dispatch({ type: LIKE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const filterPost=(text)=>{
    dispatch({ type: FILTER_POST, payload: text });
  }
  const clearFilter=(text)=>{
    dispatch({ type: CLEAR_FILTER_POST, payload: text });
  }
  const addComment = async(postId, formData) => {
    console.log(postId,formData);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const res = await axios.post(
        `https://blog-app334.herokuapp.com/api/posts/comment/${postId}`,
        formData,
        config
      );
  
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
  
    
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  // Delete comment
   const deleteComment = async(postId, commentId) => {
    try {
      await axios.delete(`https://blog-app334.herokuapp.com/api/posts/comment/${postId}/${commentId}`);
  
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentId
      });
  
    
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
  
  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        post: state.post,
        current: state.current,
        filtered:state.filtered,
        AddPost,
        GetPost,
        GetPostByUser,
        deletePost,
        setCurrent,
        clearCurrent,
        updatePost,
        likePost,
        filterPost,
        clearFilter,
        GetPostBypost,addComment,deleteComment
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
