/* eslint-disable import/no-cycle */
import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from '../button/deleteButton';

const Photo = ({ id, album, name, raw }) => (
  <div className="Photo">
    <div className="content">
      <h4>
        {album}
      </h4>
    </div>
    <div className="image">
      <img src={raw} alt="" />
    </div>
    <div className="content">
      <h5>
        {name}
      </h5>
      <DeleteButton
        id={id}
        album={album}
        name={name}
      />
    </div>
  </div>
);

Photo.propTypes = {
  id: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  raw: PropTypes.string.isRequired,
};

export default React.memo(Photo);
