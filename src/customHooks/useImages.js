import { useEffect, useReducer } from 'react';
import fetch from 'isomorphic-fetch';
import appReducer from '../reducers/appReducer';
import initialState from '../store/initialState';
import { GET_PHOTOS } from '../constants';

const useImages = (skip, limit, uploadSuccess, deleteSuccess) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { images, loading, error } = state;

  useEffect(() => {
    dispatch({
      type: 'DISPLAY_IMAGES', loading: true, images, error: '',
    });

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
        if (data.message === 'OK') {
          dispatch({
            type: 'DISPLAY_IMAGES', loading: true, images: data.documents, error,
          });
        } else {
          dispatch({
            type: 'DISPLAY_IMAGES', loading: false, images, error: 'Something went wrong.',
          });
        }
      }).catch((e) => {
        dispatch({
          type: 'DISPLAY_IMAGES', loading: false, images, error: JSON.stringify(e),
        });
      });
  }, [skip, limit, uploadSuccess, deleteSuccess]);

  return [images, error, loading];
};

export default useImages;
