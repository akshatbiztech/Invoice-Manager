import { describe, expect, test } from "@jest/globals";
import creator from "./create";
import { NextFunction, Request, Response } from "express";
import readOne from "./readOne";
// import httpMocks from "node-mocks-http";

describe("create Invoice module", () => {
  it("Creates a new Invoice into the Database and record response on the server", async () => {
    const req: Request = {
      query: {
        //invoice_num: 55,
        customer_name: "testing",
        mobile_number: 5454,
        date: "45115",
        cart: {
          product: ["pen"],
          rate: [20],
          qty: [1],
        },
        totalAmount: 20,
        if_paid: false,
      },
    } as any;

    const data: Response = {
      send: jest.fn(),
    } as any;

    const next = jest.fn();

    await creator.createInvoice(req, data, next);
    expect(data).toHaveBeenCalledWith(
      "Invoice Succesfully Added to the Database!"
    );
  });
});
