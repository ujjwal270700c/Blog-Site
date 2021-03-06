import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


import Moment from 'react-moment';
import PostContext from '../post/PostContext';



const CommentItem = ({ postId,comment: { _id, text, name, avatar, user, date }}) => {
const postContext=useContext(PostContext)
const {deleteComment}=postContext
    return (
       <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>
      { user === localStorage._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type='button'
          className='btn btn-danger'
        >
          <i className='fas fa-times' />
        </button>
      )}
    </div>
  </div>
    )
}

export default CommentItem



