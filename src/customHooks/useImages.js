import { useState, useEffect } from 'react';
import fetch from 'isomorphic-fetch';
import { GET_PHOTOS } from '../constants';

const useImages = (skip, limit, isNewImagesUploaded, isImageDeleted) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(GET_PHOTOS, {
      method: 'POST',
      body: JSON.stringify({
        skip,
        limit,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.message === 'OK') {
          setImages(data.documents);
        } else {
          setError('Something went wrong !');
        }
      }).catch((e) => {
        setError(JSON.stringify(e));
      });
  }, [skip, limit, isNewImagesUploaded, isImageDeleted]);

  return [images, error, loading];
};

export default useImages;
