import React from 'react';
import PropTypes from 'prop-types';
import UploadButton from '../button/uploadButton';
import Dropdown from '../button/dropdown';

const Header = ({album, handleImageChange=f=>f, handleImageUpload=f=>f, handleDropdownChange=f=>f}) => {
    return (
        <div className="Header">
            <div className="Header-title">
                <h3> Photo App </h3>
            </div>
            <div className="Header-dropdown">
                <Dropdown album={album} handleDropdownChange={handleDropdownChange}/>
            </div>
            <div className="Header-upload-button">
                <UploadButton handleImageChange={handleImageChange} handleImageUpload={handleImageUpload}/>
            </div>
        </div>
    )
}

Header.propTypes = {
    album: PropTypes.string.isRequired,
    handleImageChange: PropTypes.func.isRequired,
    handleImageUpload: PropTypes.func.isRequired,
    handleDropdownChange: PropTypes.func.isRequired
}

export default Header;