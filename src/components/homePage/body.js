/* eslint-disable import/no-cycle */
import React from 'react';
import Gallery from '../gallery/gallery';
import Pagination from '../pagination/pagination';

const Body = () => (
  <>
    <Gallery />
    <Pagination />
  </>
);

export default Body;
