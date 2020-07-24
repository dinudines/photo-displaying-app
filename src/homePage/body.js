import React from 'react';
import PropTypes from 'prop-types';
import Gallery from '../gallery/gallery';
import Pagination from '../pagination/pagination';

const Body = ({images, handleImageDelete=f=>f, handlePaginationChange=f=>f}) => {
    return (
        <React.Fragment>
            <Gallery photos={images} handleImageDelete={handleImageDelete}/>
            <Pagination handlePaginationChange={handlePaginationChange}/>
        </React.Fragment>
    )
}

Body.propTypes = {
    images: PropTypes.array.isRequired,
    handleImageDelete: PropTypes.func.isRequired,
    handlePaginationChange: PropTypes.func.isRequired
}

export default Body;