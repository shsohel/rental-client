import {
  DATA_SUBMIT_PROGRESS,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_DROPDOWN,
  GET_PRODUCT_RENT,
  IS_BOOK_MODAL_OPEN,
  IS_PRODUCT_DATA_LOADED,
  IS_RETURN_MODAL_OPEN,
} from '../action-types';

const initialState = {
  products: [],
  selectedProduct: {},
  userRent: {},
  productDropdown: [],
  total: 1,
  query: {},
  isProductDataLoaded: true,
  isBookModalOpen: false,
  isReturnModalOpen: false,
  isDataSubmitProgress: false,
};

const rentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_QUERY:
      return {
        ...state,
        products: action.products,
        total: action.total,
        query: action.query,
      };
    case IS_PRODUCT_DATA_LOADED:
      return {
        ...state,
        isProductDataLoaded: action.isProductDataLoaded,
      };
    case IS_BOOK_MODAL_OPEN:
      return {
        ...state,
        isBookModalOpen: action.isBookModalOpen,
      };
    case IS_RETURN_MODAL_OPEN:
      return {
        ...state,
        isReturnModalOpen: action.isReturnModalOpen,
      };
    case GET_PRODUCT_RENT:
      return {
        ...state,
        userRent: action.userRent,
      };
    case DATA_SUBMIT_PROGRESS:
      return {
        ...state,
        isDataSubmitProgress: action.isDataSubmitProgress,
      };
    case GET_PRODUCT_DROPDOWN:
      return {
        ...state,
        isReturnModalOpen: action.isReturnModalOpen,
        productDropdown: action.productDropdown,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        selectedProduct: action.selectedProduct,
      };

    default:
      return state;
  }
};
export default rentReducer;
