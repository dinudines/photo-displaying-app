/* eslint-disable import/no-cycle */
import React from 'react';
import UploadButton from '../button/uploadButton';
import Dropdown from '../button/dropdown';

const Header = () => (
  <div className="Header">
    <div className="Header-title">
      <h3> Photo App </h3>
    </div>
    <div className="Header-dropdown">
      <Dropdown />
    </div>
    <div className="Header-upload-button">
      <UploadButton />
    </div>
  </div>
);

export default Header;
