import { toast } from 'react-toastify';
import { baseAxios } from '../../../services';
import { notify } from '../../../utility/Notifications';
import { convertQueryString } from '../../../utility/Utils';
import {
  DATA_SUBMIT_PROGRESS,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_PRODUCT_RENT,
  IS_BOOK_MODAL_OPEN,
  IS_PRODUCT_DATA_LOADED,
  IS_RETURN_MODAL_OPEN,
} from '../action-types';

///Action run when list data progressing
export const rentDataLoaded = (condition) => (dispatch) => {
  dispatch({
    type: IS_PRODUCT_DATA_LOADED,
    isProductDataLoaded: condition,
  });
};

//Book Modal Open Action
export const bookModalOpen = (condition) => (dispatch) => {
  dispatch({
    type: IS_BOOK_MODAL_OPEN,
    isBookModalOpen: condition,
  });
};
//Return Modal Open Action

export const returnModalOpen = (condition) => (dispatch) => {
  dispatch({
    type: IS_RETURN_MODAL_OPEN,
    isReturnModalOpen: condition,
  });
};

//Form Data Submitted Progress
export const dataSubmitProgress = (condition) => (dispatch) => {
  dispatch({
    type: DATA_SUBMIT_PROGRESS,
    isDataSubmitProgress: condition,
  });
};

///Get Product when user click "Book Button"
export const getProduct = (product, condition) => (dispatch) => {
  dispatch({
    type: GET_PRODUCT_BY_ID,
    selectedProduct: product,
  });
  dispatch(bookModalOpen(condition));
};

///Get Product Rent Data when user click "Return Button"
/// Data Query by Product and User
//
export const getReturnData = (product, condition) => (dispatch) => {
  dispatch(rentDataLoaded(true));
  const query = {
    productCode: product.code,
    userName: 'shsohel',
    userId: 'e3cc88cb-f23a-4bb2-8094-2f1183c06944',
    productReturn: false,
  };
  const apiEndpoint = `/rents?${convertQueryString(query)}`;
  baseAxios
    .get(apiEndpoint)
    .then((response) => {
      if (response.status === 200) {
        ///Check same rent product of last data
        ///Because I have not real API
        const rent = response.data[response.data.length - 1];
        dispatch({
          type: GET_PRODUCT_RENT,
          userRent: {
            ...rent,
            productPrice: product.price,
            minimum_rent_period: product.minimum_rent_period,
            discount: product?.discount,
          },
        });
        dispatch(rentDataLoaded(true));

        if (!response.data.length) {
          notify('warning', 'You did not rent the product.');
        } else {
          dispatch(returnModalOpen(condition));
        }
      }
    })
    .catch((e) => {
      dispatch(returnModalOpen(true));
      dispatch(rentDataLoaded(false));

      notify('warning', 'Server Side ERROR');
    });
};

//Get List Data by Query
export const getProductQuery = (query) => async (dispatch) => {
  dispatch(rentDataLoaded(false));
  const apiEndpoint = `/products?${convertQueryString(query)}`;
  await baseAxios
    .get(apiEndpoint)
    .then((response) => {
      console.log();
      if (response.status === 200) {
        dispatch({
          type: GET_PRODUCTS_BY_QUERY,
          products: response.data,
          total: Number(response.headers['x-total-count']),
          query,
        });
        dispatch(rentDataLoaded(true));
      }
    })
    .catch((e) => {
      dispatch(rentDataLoaded(true));
      notify('warning', 'Server Side ERROR');
    });
};

//POST: submit rent
export const postRentData = (rentData) => async (dispatch) => {
  dispatch(dataSubmitProgress(true));
  const apiEndpoint = `/rents`;
  await baseAxios
    .post(apiEndpoint, rentData)
    .then((response) => {
      if (response.status === 201) {
        notify('success', 'The rent has been submitted successfully');
        dispatch(bookModalOpen(false));
        dispatch(dataSubmitProgress(false));
      }
    })
    .catch((e) => {
      dispatch(dataSubmitProgress(false));
      notify('warning', 'Server Side ERROR');
    });
};

//UPDATE : return product
export const returnProduct = (rentData, id) => async (dispatch) => {
  dispatch(dataSubmitProgress(true));

  const apiEndpoint = `/rents/${id}`;
  await baseAxios
    .patch(apiEndpoint, rentData)
    .then((response) => {
      if (response.status === 200) {
        dispatch(dataSubmitProgress(false));

        notify('success', 'The product has been returned successfully');

        dispatch(returnModalOpen(false));
      }
    })
    .catch((e) => {
      dispatch(dataSubmitProgress(false));

      notify('warning', 'Server Side ERROR');
    });
};
