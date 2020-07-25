import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from '../button/deleteButton';

const Photo = ({ id, album, name, raw, handleImageDelete=f=>f}) => {
    return (
        <div className='Photo'>
            <div className='content'>
                <h4> {album} </h4>
            </div>
            <div className='image'>
                <img src={raw} alt=""/>
            </div>
            <div className='content'>
                <h5> {name} </h5>
                <DeleteButton
                    id={id}
                    album={album}
                    name={name}
                    handleImageDelete={handleImageDelete}>
                </DeleteButton>
            </div>
        </div>
    )
};

Photo.propTypes = {
    id: PropTypes.string.isRequired,
    album: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    raw: PropTypes.string.isRequired,
    handleImageDelete: PropTypes.func
}

export default Photo;