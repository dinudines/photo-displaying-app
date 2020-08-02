/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import { HeaderContext } from '../../App';

const Dropdown = () => {
  const { album, handleDropdownChange } = useContext(HeaderContext);

  return (
    <>
      <InputLabel htmlFor="dropdown">Select an Album</InputLabel>
      <select id="dropdown" onChange={(e) => handleDropdownChange(e)} value={album}>
        <option value="Travel">Travel</option>
        <option value="Personal">Personal</option>
        <option value="Food">Food</option>
        <option value="Nature">Nature</option>
        <option value="Other">Other</option>
      </select>
    </>
  );
};

export default React.memo(Dropdown);
