"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Header from "../header";
import { setcustomername } from "../reducer/reducer";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 40px;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: monospace;
  margin-top: 0px;
  margin-bottom: 40px;
`;

const Highlight = styled.span`
  color: #eab308;
  font-size: 40px;
  font-family: monospace;
`;

const Paragraph = styled.p`
  font-size: 1.8em;
  font-family: monospace;
  color: #5e6e6e;
`;

const Input = styled.input`
  padding: 12px 50px;
  font-size: 1em;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 25px;
  font-family: monospace;
  font-size: x-large;
`;

const RadioContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  align-items: center;
`;

const RadioLabel = styled.label`
  font-family: monospace;
  font-size: x-large;
  color: #5e6e6e;
  margin-right: 20px;
`;

const Subcontainer = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 25px 35px;
  font-size: 8em;
  margin-top: 20px;
  border: none;
  border-radius: 40px;
  background-color: #facc15;
  font-family: monospace;
  font-size: x-large;
  cursor: pointer;

  &:hover {
    background-color: #dba306;
  }
`;

const Menu = () => {
  const [customerName, setCustomerName] = useState<string>("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const router = useRouter();
  const dispatch = useDispatch();
  console.log(customerName, type, status);
  const handleStatusChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setStatus(e.target.value);
  };
  const handleTypeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setType(e.target.value);
  };
  const handleStartOrdering = () => {
    if (status && type) {
      router.push("/pizzalist");
      dispatch(setcustomername(customerName));
    }
  };

  return (
    <Container>
      <Header />
      <Subcontainer>
        <Title>
          The Best Pizza
          <Highlight>Straight out of the oven, straight to you</Highlight>
        </Title>
        <Paragraph>Welcome! Please start by telling us your name</Paragraph>
        <Input
          placeholder="Your full name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <RadioContainer>
          <Paragraph>Status:</Paragraph>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="Pending"
              checked={status === "Pending"}
              onChange={handleStatusChange}
            />
            Pending
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="Delivered"
              checked={status === "Delivered"}
              onChange={handleStatusChange}
            />
            Delivered
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="status"
              value="Cancelled"
              checked={status === "Cancelled"}
              onChange={handleStatusChange}
            />
            Cancelled
          </RadioLabel>
        </RadioContainer>
        <RadioContainer>
          <Paragraph>Type:</Paragraph>
          <RadioLabel>
            <input
              type="radio"
              name="type"
              value="DineIn"
              checked={type === "DineIn"}
              onChange={handleTypeChange}
            />
            Dine In
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="type"
              value="Delivery"
              checked={type === "Delivery"}
              onChange={handleTypeChange}
            />
            Delivery
          </RadioLabel>
          <RadioLabel>
            <input
              type="radio"
              name="type"
              value="Takeout"
              checked={type === "Takeout"}
              onChange={handleTypeChange}
            />
            Takeout
          </RadioLabel>
        </RadioContainer>
        {customerName && (
          <Button onClick={handleStartOrdering}>Start Ordering</Button>
        )}
      </Subcontainer>
    </Container>
  );
};

export default Menu;
