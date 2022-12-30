type Invoice = {
  invoice_num: Number;
  customer_name: String;
  mobile_number: Number;
  date: String;
  cart: {
    product: [];
    rate: [];
    qty: [];
  };
  totalAmount: Number;
  if_paid: Boolean;
};

export default Invoice;
