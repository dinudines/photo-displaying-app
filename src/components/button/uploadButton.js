/* eslint-disable import/no-cycle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import { HeaderContext } from '../../App';

const UploadButtonComponent = () => {
  const { handleImageChange, handleImageUpload } = useContext(HeaderContext);

  return (
    <>
      <input
        accept="image/*"
        id="upload-image"
        type="file"
        onChange={(e) => handleImageChange(e)}
        multiple
      />
      <label htmlFor="contained-button-file">
        <Button type="submit" size="small" variant="contained" color="primary" component="span" onClick={handleImageUpload}>
          Upload
        </Button>
      </label>
    </>
  );
};

export default UploadButtonComponent;
