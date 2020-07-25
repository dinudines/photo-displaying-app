import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const DeleteButton = ({id, album, name, handleImageDelete=f=>f}) => {
    return (
        <Button
            id={id}
            album={album}
            name={name}
            color="secondary"
            onClick={(e) => handleImageDelete(name, album)}
        >
            Delete
        </Button>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    handleImageDelete: PropTypes.func
};

export default DeleteButton;