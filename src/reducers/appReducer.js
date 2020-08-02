export default function appReducer(state, action) {
  switch (action.type) {
    case 'DISPLAY_IMAGES':
      return {
        ...state,
        images: action.images,
        loading: action.loading,
        error: action.error,
      };
    case 'UPLOAD_IMAGES':
      return {
        ...state,
        uploadedImages: action.uploadedImages,
        album: action.album,
        uploadSuccess: action.uploadSuccess,
        uploadError: action.uploadError,
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        deleteSuccess: action.deleteSuccess,
        deleteError: action.deleteError,
      };
    case 'LOAD_IMAGES':
      return {
        ...state,
        uploadedImages: action.uploadedImages,
      };
    case 'CHANGE_PAGE':
      return {
        ...state,
        skip: action.skip,
        page: action.page,
      };
    case 'CHANGE_ALBUM':
      return {
        ...state,
        album: action.album,
      };
    default:
      return {
        ...state,
      };
  }
}
