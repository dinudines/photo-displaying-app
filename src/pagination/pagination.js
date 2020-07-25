import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@material-ui/lab/Pagination';

const PaginationComponent = ({ count=5, handlePaginationChange=f=>f}) => {
    return (
        <div className='Pagination'>
            <Pagination count={count} color='primary' size='large' onChange={handlePaginationChange}/>
        </div>
    )
}

PaginationComponent.propTypes = {
    count: PropTypes.number,
    handlePaginationChange: PropTypes.func
}

export default PaginationComponent;