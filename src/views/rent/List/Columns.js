import { Button } from 'reactstrap';
import { getProduct, getReturnData } from '../../../redux/rent/action';
import { store } from '../../../redux/store';
export const columns = [
  {
    id: 1,
    name: '#',
    selector: 'id',
    width: '15px',
    minWidth: '15px',
    textAlign: 'center',
    colTextAlign: 'center',
    sort: false,
    cell: (row, index) => index + 1,
  },
  {
    id: 2,
    name: 'Name',
    width: '250px',
    minWidth: '150px',

    selector: 'name',
  },
  {
    id: 3,
    name: 'Code',
    selector: 'code',
    width: '100px',
    minWidth: '50px',
    textAlign: 'center',
    colTextAlign: 'center',
    cell: (row) => row.code,
  },
  {
    id: 4,
    name: 'Type',
    selector: 'type',
    width: '100px',
    minWidth: '50px',
    textAlign: 'center',
    colTextAlign: 'center',
    cell: (row) => row.type,
  },
  {
    id: 5,
    name: 'Availability',
    selector: 'availability',
    colColor: 'green',
    width: '100px',
    minWidth: '50px',
    textAlign: 'center',
    colTextAlign: 'center',
    cell: (row) => (row.availability ? 'YES' : 'NO'),
  },
  {
    id: 6,
    name: 'Need Repair',
    selector: 'needing_repair',
    colColor: 'green',
    width: '100px',
    minWidth: '50px',
    textAlign: 'center',
    colTextAlign: 'center',
    cell: (row) => (row.needing_repair ? 'YES' : 'NO'),
  },
  {
    id: 7,
    name: 'Durability',
    selector: 'durability',
    colColor: 'red',
    width: '100px',
    minWidth: '50px',

    cell: (row) =>
      ` ${row.durability.toString()}/${row.max_durability.toString()} `,
  },
  {
    id: 8,
    name: 'Mileage',
    selector: 'mileage',
    colColor: 'green',
    width: '80px',
    minWidth: '50px',
    textAlign: 'right',
    colTextAlign: 'right',
    cell: (row) => row.mileage,
  },
  {
    id: 9,
    name: 'Action',
    selector: '',
    colColor: 'green',
    width: '100px',
    minWidth: '100px',
    textAlign: 'center',
    colTextAlign: 'center',
    sort: false,
    cell: (row) => (
      <div>
        <Button
          color="success"
          className="me-1"
          outline
          size="sm"
          onClick={() => {
            store.dispatch(getProduct(row, true)); //Action for Book Product
          }}
        >
          Book
        </Button>
        <Button
          color="primary"
          outline
          size="sm"
          onClick={() => {
            store.dispatch(getReturnData(row, true)); //Action for Return Product
          }}
        >
          Return
        </Button>
      </div>
    ),
  },
];
