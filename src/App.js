/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
import React, { useReducer } from 'react';
import Header from './components/homePage/header';
import Body from './components/homePage/body';
import appReducer from './reducers/appReducer';
import initialState from './store/initialState';
import useImages from './customHooks/useImages';
import { UPLOAD_PHOTOS, DELETE_PHOTO } from './constants';
import './App.css';

export const HeaderContext = React.createContext();
export const BodyContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const {
    skip,
    limit,
    uploadedImages,
    uploadError,
    deleteError,
    uploadSuccess,
    deleteSuccess,
    page,
    album,
  } = state;

  const [images, error, loading] = useImages(skip, limit, uploadSuccess, deleteSuccess);

  const handlePaginationChange = (event, newPage) => {
    const newSkip = newPage === 1 ? 0 : newPage * 10;
    dispatch({ type: 'CHANGE_PAGE', skip: newSkip, page: newPage });
  };

  const handleDropdownChange = (e) => {
    dispatch({ type: 'CHANGE_ALBUM', album: e.target.value });
  };

  const handleImageChange = (e) => {
    dispatch({ type: 'LOAD_IMAGES', uploadedImages: e.target.files });
  };

  const handleImageUpload = () => {
    dispatch({
      type: 'UPLOAD_IMAGES',
      uploadedImages: [],
      album,
      uploadSuccess: false,
      uploadError: '',
    });
    const formData = new FormData();
    formData.append('album', album);
    Object.keys(uploadedImages).map((index) => formData.append('documents', uploadedImages[index]));
    if (uploadedImages.length) {
      fetch(UPLOAD_PHOTOS, {
        method: 'PUT',
        body: formData,
      }).then((response) => response.json())
        .then((data) => {
          if (data.message === 'OK') {
            alert('Images successfully uploaded.');
            dispatch({
              type: 'UPLOAD_IMAGES',
              uploadedImages: [],
              album: 'Travel',
              uploadSuccess: true,
              uploadError: '',
            });
          } else {
            dispatch({
              type: 'UPLOAD_IMAGES',
              uploadedImages: [],
              album,
              uploadSuccess: false,
              uploadError: 'Something went wrong.',
            });
          }
        }).catch((e) => {
          dispatch({
            type: 'UPLOAD_IMAGES',
            uploadedImages: [],
            album,
            uploadSuccess: false,
            uploadError: JSON.stringify(e),
          });
        });
    } else {
      alert('Please select some images.');
    }
  };

  const handleImageDelete = (name, album) => {
    const data = [{
      album,
      documents: name,
    }];
    dispatch({ type: 'DELETE_IMAGE', deleteSuccess: false, deleteError: '' });
    fetch(DELETE_PHOTO, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        if (data.message === 'OK') {
          alert('Image successfully deleted');
          dispatch({ type: 'DELETE_IMAGE', deleteSuccess: true, deleteError: '' });
        } else {
          dispatch({ type: 'DELETE_IMAGE', deleteSuccess: false, deleteError: 'Something went wrong.' });
        }
      }).catch((e) => {
        dispatch({ type: 'DELETE_IMAGE', deleteSuccess: false, deleteError: JSON.stringify(e) });
      });
  };

  const displayError = () => {
    if (error || uploadError || deleteError) {
      return true;
    }
    return false;
  };

  console.log(" App ");

  return (
    <div className="App">
      {displayError() && <h2> Something went wrong ... </h2>}
      {!displayError()
        ? (!loading ? <h2> Loading .... </h2> : (
          <>
            <HeaderContext.Provider value={{
              album, handleDropdownChange, handleImageChange, handleImageUpload,
            }}
            >
              <Header />
            </HeaderContext.Provider>
            <BodyContext.Provider value={{
              images, page, handlePaginationChange, handleImageDelete,
            }}
            >
              <Body />
            </BodyContext.Provider>
          </>
        )
        ) : null}
    </div>
  );
};

export default App;
