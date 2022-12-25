import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

interface InvoiceFormProps {
  onSubmit: (formData: InvoiceData) => void;
}

interface InvoiceData {
  name: string;
  invoiceNumber: string;
  mobileNumber: string;
  date: string;
  products: Product[];
}

interface Product {
  name: string;
  rate: number;
  quantity: number;
  total: number;
}

function InvoiceForm() {
  return (
    <>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" />
        </Form.Group>
        <Form.Group controlId="invoiceNumber">
          <Form.Label>Invoice Number</Form.Label>
          <Form.Control type="text" name="invoiceNumber" />
        </Form.Group>
        <Form.Group controlId="mobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="text" name="mobileNumber" />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" />
        </Form.Group>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Rate</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
          <Button variant="secondary">Add Product</Button>
        </thead>
        <tbody></tbody>
      </Table>
      <Button variant="secondary">Add Product</Button>
      <br />
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </>
  );
}
export default InvoiceForm;
