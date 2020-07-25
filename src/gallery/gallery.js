import React from 'react';
import PropTypes from 'prop-types';
import Photo from '../photo/photo';

const Gallery = ({ photos, handleImageDelete=f=>f}) => {
    return (
        <div className="Gallery">
            {
                photos.map(({ id, name, album, raw }, index) => (
                    <Photo key={index} id={id} album={album} name={name} raw={raw} handleImageDelete={handleImageDelete}> </Photo>
                ))
            }
        </div>
    )
};

Gallery.propTypes = {
    photos: PropTypes.array.isRequired,
    handleImageDelete: PropTypes.func
}

export default Gallery;