/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { BodyContext } from '../../App';

const DeleteButton = ({ id, album, name }) => {
  const { handleImageDelete } = useContext(BodyContext);

  return (
    <Button
      id={id}
      album={album}
      name={name}
      color="secondary"
      onClick={() => handleImageDelete(name, album)}
    >
      Delete
    </Button>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default React.memo(DeleteButton);
