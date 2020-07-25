import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';

const Dropdown = ({album, handleDropdownChange=f=>f}) => {
    return (
        <React.Fragment>
            <InputLabel htmlFor="dropdown">Album</InputLabel>
            <select id="dropdown" onChange={(e) => handleDropdownChange(e)} value={album}>
                <option value="Travel">Travel</option>
                <option value="Personal">Personal</option>
                <option value="Food">Food</option>
                <option value="Nature">Nature</option>
                <option value="Other">Other</option>
            </select>
        </React.Fragment>
    )
}

Dropdown.propTypes = {
    album: PropTypes.oneOf(['Travel', 'Food', 'Personal', 'Nature', 'Other']).isRequired,
    handleDropdownChange: PropTypes.func
}

export default Dropdown;