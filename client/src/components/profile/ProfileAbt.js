import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbt = ({
  profile: {
    bio,
    user: { name }
  }
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(" ")[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line' />
      </Fragment>
    )}
  </div>
);

ProfileAbt.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbt;
