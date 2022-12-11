import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'reactstrap';
import DataTable from '../../../components/DataTable';
import ListLoader from '../../../components/loader/ListLoader';
import { getProductQuery } from '../../../redux/rent/action';
import { cleanObj } from '../../../utility/Utils';
import BookModal from '../form/BookModal';
import ReturnModal from '../form/ReturnModal';
import { columns } from './Columns';

const ProductList = () => {
  //Initial Data for Filter
  const initialFilterData = {
    name: '',
    code: '',
    type: '',
    mileage: null,
    availability: null,
  };
  //Dispatch
  const dispatch = useDispatch();

  //Redux Store Data of specific products
  const {
    total,
    products,
    isProductDataLoaded,
    isBookModalOpen,
    isReturnModalOpen,
  } = useSelector(({ products }) => products);

  ///Pagination Local State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('name');
  const [orderBy, setOrderBy] = useState('asc');

  //Filter State
  const [filter, setFilter] = useState(initialFilterData);

  useEffect(() => {
    ///Pagination and Filter Query real time update if onChange anything
    const query = {
      _page: currentPage,
      _limit: rowPerPage,
      _sort: sortBy,
      _order: orderBy,
      ...cleanObj(filter),
    };

    //Get dispatch(redux) Function/Method of product by Query and Filter
    dispatch(getProductQuery(query));
  }, [dispatch, currentPage, rowPerPage, sortBy, orderBy, filter]);

  //The action will be fired when table column's header click
  const handleSort = (sort) => {
    setSortBy(sort);
    setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
  };

  //Pagination
  //The action will  work when the page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  //Pagination
  //The action will  work when the row change
  const handleRowPerPage = (perPageRow) => {
    const rowNo = Number(perPageRow);
    setRowPerPage(rowNo);
    setCurrentPage(1);
  };

  ///OnChange of Filter
  const handleFilter = (e) => {
    const { name, value, type, checked } = e.target;

    setFilter({
      ...filter,
      [name]:
        type === 'text' ? value : type === 'number' ? Number(value) : checked,
    });
  };

  //Clear Filter Data
  const clearFilter = () => {
    setFilter(initialFilterData);
    //Forcefully Clear
    dispatch(getProductQuery([]));
  };

  ///Filter Array
  /// Filter option available on the table if you define a property of the array
  const filterArray = [
    {
      name: (
        <Input
          id="name"
          bsSize="sm"
          placeholder="Name"
          name="name"
          onChange={(e) => {
            handleFilter(e);
          }}
        />
      ),
      code: (
        <Input
          bsSize="sm"
          placeholder="Code"
          name="code"
          onChange={(e) => {
            handleFilter(e);
          }}
        />
      ),
      type: (
        <Input
          bsSize="sm"
          placeholder="Type"
          name="type"
          onChange={(e) => {
            handleFilter(e);
          }}
        />
      ),
      mileage: (
        <Input
          type="number"
          bsSize="sm"
          placeholder="Mileage"
          name="mileage"
          onChange={(e) => {
            handleFilter(e);
          }}
        />
      ),
      availability: (
        <div className="text-center">
          <div>
            <input
              type="checkbox"
              // bsSize="sm"
              name="availability"
              onChange={(e) => {
                handleFilter(e);
              }}
            />
          </div>
        </div>
      ),
      needing_repair: (
        <div className="text-center">
          <div>
            <input
              type="checkbox"
              // bsSize="sm"
              name="needing_repair"
              onChange={(e) => {
                handleFilter(e);
              }}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="m-5">
      {/* Reusable Data Table */}
      <DataTable
        title="Product List"
        headerActionComponent={
          <>
            <Button
              className="me-1"
              outline
              size="sm"
              onClick={() => {
                clearFilter();
              }}
            >
              Clear Filter
            </Button>
          </>
        }
        minWidth="900px"
        data={products}
        columns={columns} //Please see the column components
        filter={true}
        filterArray={filterArray}
        handlePagination={handlePagination}
        handleRowPerPage={handleRowPerPage}
        handleSort={handleSort}
        currentPage={currentPage}
        rowPerPage={rowPerPage}
        totalRecord={total}
        pagination={true}
        isDataLoading={!isProductDataLoaded}
        LoaderComponent={
          <ListLoader
            rowLength={rowPerPage}
            colLength={columns?.length}
            hidden={isProductDataLoaded}
          />
        }
      />

      {/* Modal open conditionally */}
      {isBookModalOpen && <BookModal openModal={isBookModalOpen} />}
      {isReturnModalOpen && <ReturnModal openModal={isReturnModalOpen} />}
    </div>
  );
};

export default ProductList;
