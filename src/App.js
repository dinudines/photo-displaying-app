/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import Header from './components/homePage/header';
import Body from './components/homePage/body';
import useImages from './customHooks/useImages';
import { UPLOAD_PHOTOS, DELETE_PHOTO } from './constants';
import './App.css';

const HeaderContext = React.createContext();
const BodyContext = React.createContext();

const App = () => {
  const [skip, setSkip] = useState(0);
  const [limit] = useState(10);
  const [uploadedImages, setUploadedImages] = useState('');
  const [uploadError, setUploadError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [isNewImagesUploaded, setIsNewImagesUploaded] = useState(false);
  const [isImageDeleted, setIsImageDeleted] = useState(false);
  const [images, error, loading] = useImages(skip, limit, isNewImagesUploaded, isImageDeleted);
  const [page, setPage] = useState(1);
  const [album, setAlbum] = useState('Travel');

  const handlePaginationChange = (event, newPage) => {
    const newSkip = newPage === 1 ? 0 : newPage * 10;
    setSkip(newSkip);
    setPage(newPage);
  };

  const handleDropdownChange = (e) => {
    setAlbum(e.target.value);
  };

  const handleImageChange = (e) => {
    setUploadedImages(e.target.files);
  };

  const handleImageUpload = () => {
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
            setUploadedImages([]);
            setAlbum('Travel');
            setIsNewImagesUploaded(!isNewImagesUploaded);
          } else {
            setUploadError('Something went wrong.');
          }
        }).catch((e) => {
          setUploadError(JSON.stringify(e));
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
          setIsImageDeleted(!isImageDeleted);
        } else {
          setDeleteError(true);
        }
      }).catch((e) => {
        setDeleteError(JSON.stringify(e));
      });
  };

  const displayError = () => {
    if (error || uploadError || deleteError) {
      return <div> Something went wrong !!</div>;
    }
  };

  return (
    <div className="App">
      { displayError() }
      { loading ? (
        <div> Loading ... </div>
      ) : (
        <>
          <HeaderContext.Provider value={{
            album, handleDropdownChange, handleImageChange, handleImageUpload,
          }}
          >
            <Header album={album} />
          </HeaderContext.Provider>
          <BodyContext.Provider value={{ images, page, handlePaginationChange, handleImageDelete }}>
            <Body images={images} />
          </BodyContext.Provider>
        </>
      )}
    </div>
  );
};

export {
  App,
  HeaderContext,
  BodyContext,
};
