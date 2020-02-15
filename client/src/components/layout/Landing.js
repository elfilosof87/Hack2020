import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='hero'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Book Share</h1>
          <p className='lead'>Share and post your books and stuff</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
      <div class='cube'></div>
      <div class='cube'></div>
      <div class='cube'></div>
      <div class='cube'></div>
      <div class='cube'></div>
      <div class='cube'></div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
