import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const UploadButtonComponent = ({ handleImageChange=f=>f, handleImageUpload=f=>f}) => {
    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

UploadButtonComponent.propTypes = {
    handleImageChange: PropTypes.func,
    handleImageUpload: PropTypes.func
}

export default UploadButtonComponent;