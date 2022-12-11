import { Fragment } from 'react';
import ReactPaginate from 'react-paginate';
import { Table } from 'reactstrap';
import '../assets/styles/components/custom-data-table.scss';
const DataTable = ({
  title,
  data = [],
  columns = [],
  filter = false,
  filterArray = [],
  expandableRow = false,
  expandableIcons = null,
  handlePagination,
  handleRowPerPage,
  handleSort,
  rows = [5, 10, 15, 20],
  currentPage,
  rowPerPage,
  totalRecord,
  pagination = false,
  minWidth,
  isDataLoading = false,
  LoaderComponent,
  headerActionComponent,
}) => {
  const count = Number(Math.ceil(totalRecord / rowPerPage));

  const onSort = (column) => {
    if (column?.sort || column?.sort === undefined) {
      handleSort(column.selector);
    }
  };

  return (
    <div className="custom-data-table">
      <div className="dt-info-header">
        <label className="dt-title">{title}</label>
        <div>{headerActionComponent}</div>
      </div>
      <Table
        responsive
        bordered
        size="sm"
        striped
        hover
        style={{ minWidth: minWidth ?? '' }}
      >
        <thead>
          <tr>
            {expandableRow && <th style={{ width: '40px' }}> EX</th>}
            {columns?.map((column, index) => (
              <Fragment key={index + 1}>
                <th
                  onClick={() => {
                    onSort(column);
                  }}
                  className="text-nowrap dt-header"
                  style={{
                    width: column?.width ?? '',
                    minWidth: column?.minWidth ?? '',
                    maxWidth: column?.maxWidth ?? '',
                    color: column?.color ?? '',
                    backgroundColor: column?.backgroundColor ?? '',
                    textAlign: column?.textAlign ?? '',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                  }}
                >
                  {column.name}
                </th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {filter &&
            filterArray.map((filter, index) => (
              <tr key={index + 1}>
                {expandableRow && <td> </td>}
                {columns.map((c, indx) => (
                  <Fragment key={indx + 1}>
                    <td>{filter[c.selector]}</td>
                  </Fragment>
                ))}
              </tr>
            ))}
          {data.map((d, index) => (
            <tr key={index + 1} hidden={isDataLoading}>
              {expandableRow && (
                <td style={{ textAlign: 'center' }}>
                  {expandableIcons.openIcon}
                </td>
              )}
              {columns.map((c, indx) => (
                <Fragment key={indx + 1}>
                  <td
                    style={{
                      width: c?.width ?? '',
                      minWidth: c?.minWidth ?? '',
                      maxWidth: c?.maxWidth ?? '',
                      color: c?.colColor ?? '',
                      backgroundColor: c?.colBackgroundColor ?? '',
                      textAlign: c?.colTextAlign ?? '',
                      paddingRight: '10px',
                      paddingLeft: '10px',
                    }}
                  >
                    {c?.cell ? c.cell(d, index) : d[c.selector]}
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
          {LoaderComponent}
        </tbody>
      </Table>
      {pagination && (
        <div className="pagination">
          <ReactPaginate
            previousLabel={'Pre'}
            nextLabel={'Next'}
            pageCount={count || 1}
            activeClassName="active"
            forcePage={currentPage !== 0 ? currentPage - 1 : 0}
            onPageChange={(page) => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={
              'pagination react-paginate justify-content-end my-2 pr-1'
            }
          />
          <div className="row-per-page">
            <label htmlFor="rowPerPageId">Row Per page:</label>
            <select
              value={rowPerPage}
              onChange={(e) => {
                handleRowPerPage(e.target.value);
              }}
              name="rowPerPage"
              id="rowPerPageId"
            >
              {rows.map((row, index) => (
                <option key={index + 1} value={row}>
                  {row}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
export default DataTable;
