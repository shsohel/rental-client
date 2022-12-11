let price;
let day;
let rentalPeriod;
let discount;
const rentFee = price * day;

let durablity = 100;

let types;

const priceWithDiscount = day > rentalPeriod ? rentFee + discount : rentFee;

const durablityCheck =
  types === 'pain' ? durablity - day * 1 : durablity - day * 2;

let mileage = day * 10;
