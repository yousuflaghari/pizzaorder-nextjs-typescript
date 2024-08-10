"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../header";
import Item from "../item";
import Navbar from "../Navbar";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../loader";
import { useSearchRecipesQuery } from "../api/route";
import { setPizzaData } from "../reducer/reducer";
import { Pizza, RootState } from "@/interface";
const ContainerList = styled.div`
  text-align: center;
  padding-bottom: 60px;
`;
const UnorderedListItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const ErrorMessage = styled.div`
  color: red;
  font-size: 1.5em;
  margin-top: 20px;
`;
const PizzaList = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSearchRecipesQuery();
  const pizzas = useSelector((state: RootState) => state.pizza.pizzaData);
  const pizzaData = Object.values(pizzas);
  useEffect(() => {
    if (data && data.recipes) {
      dispatch(setPizzaData(data.recipes));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <ContainerList>
        <Header />
        <Loader />
        <Navbar />
      </ContainerList>
    );
  }

  if (error) {
    return (
      <ContainerList>
        <Header />
        <ErrorMessage>
          Failed to load pizzas. Please try again later.
        </ErrorMessage>
        <Navbar />
      </ContainerList>
    );
  }

  return (
    <ContainerList>
      <Header />
      <UnorderedListItem>
        {pizzaData.map((pizza, index) => (
          <Item
            key={index}
            image={pizza.image}
            name={pizza.name}
            ingredients={pizza.ingredients}
            userId={pizza.userId}
            price={pizza.userId}
          />
        ))}
      </UnorderedListItem>
      <Navbar />
    </ContainerList>
  );
};

export default PizzaList;
