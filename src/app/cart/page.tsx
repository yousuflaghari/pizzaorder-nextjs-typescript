"use client";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setcustomername } from "../reducer/reducer";
import styled, { createGlobalStyle } from "styled-components";
import { RootState } from "@/interface";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  userId: string;
  totalPrice: number;
}

interface Order {
  customerName: string;
  items: OrderItem[];
}

const GlobalStyle = createGlobalStyle`
  @media print {
    body * {
      visibility: hidden;
    }
    .printable, .printable * {
      visibility: visible;
    }
    .printable {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

const ReceiptWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &.printable {
    display: block;
  }

  @media print {
    &:not(.printable) {
      display: none;
    }
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  text-align: left;
`;

const CustomerName = styled.h3`
  cursor: pointer;
  color: blue;
`;

const DownloadButton = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  cursor: pointer;

  button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Cart: React.FC = () => {
  const orders = useSelector((state: RootState) => state.pizza.order);
  const currentCustomer = useSelector(
    (state: RootState) => state.pizza.currentCustomer
  );
  const dispatch = useDispatch();
  const printRef = useRef<HTMLDivElement>(null);

  const changeCurrentCustomer = (customerName: string) => {
    dispatch(setcustomername(customerName));
  };

  const handlePrint = (index: number) => {
    if (printRef.current) {
      const allReceipts = printRef.current.querySelectorAll(".receipt");
      allReceipts.forEach((receipt, idx) => {
        receipt.classList.toggle("printable", idx === index);
      });
      window.print();
    }
  };

  return (
    <div>
      <GlobalStyle />
      <div ref={printRef}>
        {orders.length === 0 ? (
          <div>No orders available</div>
        ) : (
          orders.map((order, index: number) => {
            const totalPrice = order.items.reduce(
              (sum, item) => sum + item.totalPrice,
              0
            );
            const selected = currentCustomer === order.customerName;

            return (
              <div key={index}>
                <ReceiptWrapper
                  className="receipt"
                  style={{ background: selected ? "#dce3de" : "white" }}
                >
                  <CustomerName
                    onClick={() => changeCurrentCustomer(order.customerName)}
                  >
                    Customer: {order.customerName}
                  </CustomerName>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableCell>Item ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total Price</TableCell>
                      </TableRow>
                    </TableHeader>
                    <tbody>
                      {order.items.map(
                        (
                          { name, quantity, price, userId, totalPrice },
                          itemIndex
                        ) => (
                          <TableRow key={itemIndex}>
                            <TableCell>{itemIndex}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell>{quantity}</TableCell>
                            <TableCell>{userId}</TableCell>
                            <TableCell>{totalPrice}</TableCell>
                          </TableRow>
                        )
                      )}
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          style={{ textAlign: "right", fontWeight: "bold" }}
                        >
                          Grand Total
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {totalPrice}
                        </TableCell>
                      </TableRow>
                    </tbody>
                  </Table>
                </ReceiptWrapper>
                <DownloadButton>
                  <button onClick={() => handlePrint(index)}>
                    Print this out!
                  </button>
                </DownloadButton>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Cart;
