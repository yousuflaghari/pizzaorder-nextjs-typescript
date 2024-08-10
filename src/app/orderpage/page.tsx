"use client";
import React from "react";
import styled from "styled-components";
import Header from "../header";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/interface";

const OrderpageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Orderpage = () => {
  const currentCustomer = useSelector(
    (state: RootState) => state.pizza.currentCustomer
  );
  return (
    <OrderpageContainer>
      <Header />
      {currentCustomer}
      <Navbar />
    </OrderpageContainer>
  );
};

export default Orderpage;
