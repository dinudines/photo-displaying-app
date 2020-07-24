import React from 'react';
import Header from './homePage/header';
import fetch from 'isomorphic-fetch';
import { GET_PHOTOS, UPLOAD_PHOTOS, DELETE_PHOTO } from './constants';
import './App.css';
import Body from './homePage/body';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      loading: false,
      error: false,
      skip: 0,
      limit: 10,
      page: 1,
      uploadImages: '',
      key: '',
      album: 'Travel'
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
  }

  componentDidMount() {
    const { skip, limit } = this.state;
    this.setState({ loading: true });
    this.handleDataChange(skip, limit);
  }

  handlePaginationChange(event, page) {
    const { limit } = this.state;
    const skip = page === 1 ? 0 : page * 10;
    this.setState({
      loading: true,
      page: page
    }); 
    this.handleDataChange(skip, limit);
  }

  handleDropdownChange(e) {
    this.setState({ album: e.target.value });
  }

  handleDataChange(skip, limit) {
    fetch(GET_PHOTOS, {
      method: 'POST',
      body: JSON.stringify({
        skip: skip,
        limit: limit
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        if (data.message === 'OK') {
          this.setState({
            loading: true,
            images: data.documents
          })
        } else {
          this.setState({
            loading: true,
            error: true
          })
        }
    })
  }

  handleImageChange(e) {
    this.setState({ uploadImages: e.target.files});
  }

  handleImageUpload() {
    const { album, uploadImages } = this.state;
    const formData = new FormData();
    formData.append('album', album);
    Object.keys(uploadImages).map(index => 
      formData.append('documents', uploadImages[index])
    );
    
    if (uploadImages.length > 0) {
      fetch(UPLOAD_PHOTOS, {
        method: 'PUT',
        body : formData
      }).then(response => response.json())
        .then(data => {
          if (data.message === 'OK') {
            alert('Images successfully uploaded');
            this.setState({
              uploadImages: [],
              album: 'Travel'
            });
            this.handlePaginationChange("", this.state.page);
          } else {
            this.setState({
              error: true
            });
          }
      });
    } else {
      alert('Please choose some images.')
    }
  }

  handleImageDelete(name, album) {
    const data = [{
      album: album,
      documents: name
    }];
    fetch(DELETE_PHOTO, {
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        if (data.message === 'OK') {
          alert('Image successfully deleted');
          this.handlePaginationChange("", this.state.page);
        } else {
          this.setState({
            error: true
          });
        }
      });
  }

  render() {
    const { images, loading, error, key, album } = this.state;
    return (
      <div className='App'>
        <Header
          key={key}
          album={album}
          handleImageChange={this.handleImageChange}
          handleImageUpload={this.handleImageUpload}
          handleDropdownChange={this.handleDropdownChange}
        />
        {loading ?
          error ? <div> Something went wrong !!</div> :
            <Body
              images={images}
              handleImageDelete={this.handleImageDelete}
              handlePaginationChange={this.handlePaginationChange}
            /> : 
            <div> Loading ... </div>
          }
      </div>
    )
  }

}

export default App;