/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { BodyContext } from '../../App';

const PaginationComponent = () => {
  const { page, handlePaginationChange } = useContext(BodyContext);

  return (
    <div className="Pagination">
      <Pagination count={5} color="primary" size="large" page={page} onChange={handlePaginationChange} />
    </div>
  );
};

export default React.memo(PaginationComponent);
