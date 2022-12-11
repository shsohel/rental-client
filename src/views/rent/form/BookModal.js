import moment from 'moment/moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { confirmDialog } from '../../../components/confirm-diablog';
import CustomModal from '../../../components/custom-modal';
import FormLoader from '../../../components/loader/FormLoader';
import { getProduct, postRentData } from '../../../redux/rent/action';
import { dayCalculate } from '../../../utility/Utils';

const BookModal = ({ openModal }) => {
  //Redux dispatch
  const dispatch = useDispatch();

  //Redux store (products)
  const { selectedProduct, isDataSubmitProgress } = useSelector(
    ({ products }) => products
  );

  ///Date Local State
  const [date, setDate] = useState({
    startDate: '',
    endDate: '',
  });

  ///Date onChange Function
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setDate({
      ...date,
      [name]: value,
    });
  };

  ///The function works when you click "YES" button of Primary Modal
  const handleModelSubmit = () => {
    //Total day calculation from day range ( 'From Date' and 'To Date')
    const day = dayCalculate(date?.startDate, date?.endDate);

    ///Rent Estimated Price
    const rentFee = selectedProduct?.price * day;

    //Price if the product have any discount and minimum rental period cross
    const priceWithDiscount =
      day > selectedProduct?.minimum_rent_period
        ? rentFee + (selectedProduct?.discount ?? 0)
        : rentFee;

    ///Mileage Calculation
    const usedMileage =
      selectedProduct?.type === 'meter' ? day * 10 : day * (10 / 2);

    //Durability Calculation
    const durabilityDecrease =
      selectedProduct?.type === 'pain'
        ? selectedProduct?.durability - (day * 1 + usedMileage / 10)
        : selectedProduct?.durability - (day * 2 + usedMileage / 10);

    ///Confirm Modal open when user click "YES" of Primary Modal
    confirmDialog({
      title: 'Book a product',
      confirmButtonText: 'Yes !',
      cancelButtonText: 'No',
      text: `
      <b>Your estimated price is ${priceWithDiscount} </b>
      <br/>
      <br/>
       <h5>Do you want to proceed?</h5>      
      `,
    }).then(async (e) => {
      if (e.isConfirmed) {
        ///Rent Object for "POST"
        const rentObj = {
          userName: 'shsohel',
          userId: 'e3cc88cb-f23a-4bb2-8094-2f1183c06944',
          product: selectedProduct?.name,
          productCode: selectedProduct?.code,
          rentPrice: priceWithDiscount,
          usedMileage,
          rentStarDate: date.startDate,
          rentEndDate: date.endDate,
          rentDuration: day,
          remainingDurability: durabilityDecrease, //Remaining durability from products
          productReturn: false,
        };
        //Redux action post data
        //Api calling action
        dispatch(postRentData(rentObj));
      }
    });
  };

  //Primary Modal Close after Click "X" icon of The right side of top
  const handleModalToggleClose = () => {
    dispatch(getProduct(null, false));
  };

  return (
    <div>
      <CustomModal
        modalTypeClass="vertically-centered-modal"
        className="modal-dialog modal-md"
        openModal={openModal}
        handleMainModelSubmit={handleModelSubmit}
        handleMainModalToggleClose={handleModalToggleClose}
        title="Product Book"
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
                <b>Name :</b> {selectedProduct?.name}
              </ListGroupItem>
              <ListGroupItem>
                <b>Code :</b> {selectedProduct?.code}
              </ListGroupItem>
              <ListGroupItem>
                <b>Mileage :</b> {selectedProduct?.mileage ?? 'NA'}
              </ListGroupItem>
              <ListGroupItem>
                <b>Discount :</b> {selectedProduct?.discount ?? 'Na'}
              </ListGroupItem>
            </ListGroup>

            <h6 className="text-center bg-light p-1">Day</h6>
            <div className="d-flex justify-space-around align-items-center">
              <Label>
                <b>From</b>
              </Label>
              <Input
                className="m-1"
                type="date"
                name="startDate"
                value={date.startDate}
                min={moment(new Date()).format('YYYY-MM-DD')}
                max={
                  date.endDate.length
                    ? moment(date.endDate).format('YYYY-MM-DD')
                    : '3000-12-12'
                }
                onChange={(e) => handleOnChange(e)}
              />
              <Label>
                <b> To</b>{' '}
              </Label>
              <Input
                type="date"
                className="m-1"
                name="endDate"
                value={date.endDate}
                min={
                  date.startDate?.length
                    ? moment(date.startDate).format('YYYY-MM-DD')
                    : moment(new Date()).format('YYYY-MM-DD')
                }
                max={'3000-12-12'}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
          </div>
        </>
      </CustomModal>
    </div>
  );
};
export default BookModal;
