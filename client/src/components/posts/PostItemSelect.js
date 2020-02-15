import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItemSelect = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  selectValue,
  post: {
    _id,
    text,
    name,
    title,
    author,
    category = selectValue,
    condition,
    avatar,
    user,
    likes,
    comments,
    date
  },
  showActions
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <h3>{title}</h3>
      <p className='my-1'>{text}</p>
      <p className='my-1'>
        By: <span className='text-primary'>{author}</span>
      </p>
      <p className='my-1'>
        Category: <span className='text-primary'>{category}</span>
      </p>
      <p className='my-1'>
        Condition: <span className='text-primary'>{condition}</span>
      </p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-up' />{" "}
            <span>
              {likes.length > 0 && (
                <span className='text-primary'>{likes.length}</span>
              )}
            </span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'
          >
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            Discussion{" "}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItemSelect.defaultProps = {
  showActions: true
};

PostItemSelect.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItemSelect
);
