/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import Photo from '../photo/photo';
import { BodyContext } from '../../pages/homePage';

const Gallery = () => {
  const { images } = useContext(BodyContext);

  return (
    <div className="Gallery">
      {
        images.map(({
          id, name, album, raw,
        }, index) => (
          <Photo key={index} id={id} album={album} name={name} raw={raw}> </Photo>
        ))
      }
    </div>
  );
};

export default React.memo(Gallery);
