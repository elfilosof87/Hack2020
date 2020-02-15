import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className='surround'>
      <div className='dash-buttons'>
        <Link to='/edit-profile' class='btn btn-light'>
          <i className='fas fa-user-circle text-primary'></i> Edit Profile
        </Link>

        <Link to='/add-education' class='btn btn-light'>
          <i className='fas fa-graduation-cap text-primary'></i> Add Education
        </Link>
      </div>
    </div>
  );
};

export default DashboardActions;
