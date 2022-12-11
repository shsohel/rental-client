import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import { confirmDialog } from '../../../components/confirm-diablog';
import CustomModal from '../../../components/custom-modal';
import FormLoader from '../../../components/loader/FormLoader';
import {
  returnModalOpen,
  returnProduct,
  updateRentData,
} from '../../../redux/rent/action';
import { dayCalculate } from '../../../utility/Utils';

const ReturnModal = ({ openModal }) => {
  //Redux Dispatch
  const dispatch = useDispatch();
  //Rent Reudx Store
  const { userRent, isDataSubmitProgress } = useSelector(
    ({ products }) => products
  );

  ///The function works when you click "YES" button of Primary Modal
  const handleModelSubmit = () => {
    //Day Calculation
    let day = 0;
    ///if product return after Rent End Date
    //Additional Day Calculation
    if (new Date(userRent?.rentEndDate) < new Date()) {
      day =
        dayCalculate(userRent?.rentEndDate, new Date()) + userRent.rentDuration;
    } else {
      day = userRent.rentDuration;
    }

    ///Price Calculation
    const rentFee = userRent?.productPrice * day;

    ///Price Re-calculate with Discount
    const priceWithDiscount =
      day > userRent?.minimum_rent_period
        ? rentFee + (userRent?.discount ?? 0)
        : rentFee;

    ///Last Confirm Action
    confirmDialog({
      title: 'Return a product',
      confirmButtonText: 'Yes !',
      cancelButtonText: 'No',
      text: `
      <b>Your rent price is ${priceWithDiscount} </b>
      <br/>
      <br/>
       <h5>Do you want to proceed?</h5>      
      `,
    }).then(async (e) => {
      if (e.isConfirmed) {
        //Update Rent object after confirm
        const rentObj = {
          productReturn: true,
          returnPrice: priceWithDiscount,
          additionalDay: day - userRent.rentDuration,
        };

        //Redux ( Return )action
        //Api calling action
        dispatch(returnProduct(rentObj, userRent?.id));
      }
    });
  };

  //Primary Modal Close after Click "X" icon of The right side of top
  const handleModalToggleClose = () => {
    dispatch(returnModalOpen(false));
  };

  return (
    <div>
      <CustomModal
        modalTypeClass="vertically-centered-modal"
        className="modal-dialog modal-md"
        openModal={openModal}
        handleMainModelSubmit={handleModelSubmit}
        handleMainModalToggleClose={handleModalToggleClose}
        title="Product Return"
        extraButton={true}
        submitBtnName="Yes"
        buttonComponents={
          <Button
            color="danger"
            size="sm"
            onClick={() => {
              handleModalToggleClose();
            }}
          >
            NO
          </Button>
        }
      >
        <>
          {/* Loader after Confirm to Submit */}
          <div hidden={!isDataSubmitProgress}>
            <FormLoader />
          </div>
          <div hidden={isDataSubmitProgress}>
            <ListGroup className="mb-2">
              <ListGroupItem>
                <b>Name :</b> {userRent?.product}
              </ListGroupItem>
              <ListGroupItem>
                <b>Code :</b> {userRent?.productCode}
              </ListGroupItem>
              <ListGroupItem>
                <b>Mileage :</b> {userRent?.usedMileage ?? 'NA'}
              </ListGroupItem>
            </ListGroup>
          </div>
        </>
      </CustomModal>
    </div>
  );
};
export default ReturnModal;
