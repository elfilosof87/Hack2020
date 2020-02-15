import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost, history }) => {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    author: "",
    condition: "",
    category: ""
  });

  const { text, author, title, condition, category } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className='large text-primary'>Post here</h1>
      <p className='lead'>
        <i className='fas fa-code-branch' /> Add your education details
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault();
          addPost(formData, history);
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Title'
            name='title'
            value={title}
            onChange={e => onChange(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Author'
            name='author'
            value={author}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className='form-group'>
          <select name='category' value={category} onChange={e => onChange(e)}>
            <option>*Category</option>
            <option value='10th'>10th</option>
            <option value='PUC'>PUC</option>
            <option value='Engineering 1st Year'>Engineering 1st Year</option>
            <option value='Engineering 2nd Year'>Engineering 2nd Year</option>
            <option value='Engineering 3rd Year'>Engineering 3rd Year</option>
            <option value='Engineering 4th Year'>Engineering 4th Year</option>
            <option value='Question Papers'>Question Papers</option>
            <option value='Fiction'>Fiction</option>
          </select>
        </div>
        <div className='form-group'>
          <select
            name='condition'
            value={condition}
            onChange={e => onChange(e)}
          >
            <option>*Condition</option>
            <option value='Excellent'>Excellent</option>
            <option value='Very Good'>Very Good</option>
            <option value='Good'>Good</option>
            <option value='Below Average'>Below Average</option>
          </select>
        </div>

        <div className='form-group'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='* Description'
            value={text}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' className='btn btn-primary my-1' />
      </form>
    </Fragment>
  );
};

addPost.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(withRouter(PostForm));
