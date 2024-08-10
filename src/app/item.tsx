import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  addItemToOrder,
  removeItemFromOrder,
  selectPizzaQuantity,
  selectCurrentCustomerItems,
  attempt,
  manageerror,
} from "./reducer/reducer";
import { ItemProps } from "../interface";

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(251, 248, 246);
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  height: 130px;
`;

const ImageContainer = styled.div`
  width: 130px;
  height: 130px;
  overflow: hidden;
  border-radius: 10px;
`;

const Image = styled.img`
  width: 127px;
  height: 127px;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  width: 700px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #8b847c;
  display: flex;
  margin: 0px;
`;

const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  margin: 0px;
`;

const IngredientItem = styled.li`
  font-size: 16px;
  margin-right: 10px;
  color: #78716c;
`;

const UserId = styled.h3`
  font-size: 18px;
  margin-top: 10px;
  color: #8b847c;
`;

const AddToCartButton = styled.button`
  background-color: #facc15;
  color: #292524;
  border: none;
  border-radius: 23px;
  cursor: pointer;
  margin-bottom: 3px;
  width: 130px;
  height: 40px;
  font-size: large;
`;

const RemoveFromCartButton = styled.button`
  background-color: #facc15;
  color: #292524;
  border: none;
  border-radius: 23px;
  cursor: pointer;
  margin-bottom: 3px;
  width: 130px;
  height: 40px;
  font-size: large;
`;

const PriceCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 30px;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 250px;
`;

const QuantityButton = styled.button`
  background-color: #facc15;
  color: #292524;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  height: 34px;
  width: 20px;
`;

const QuantityDisplay = styled.span`
  font-size: 16px;
  margin: 0 10px;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0px;
`;

const Item: React.FC<ItemProps> = ({
  image,
  name,
  ingredients,
  userId,
  price,
}) => {
  const dispatch = useDispatch();
  const quantity = useSelector(selectPizzaQuantity(name, userId));
  const currentCustomerItems = useSelector(selectCurrentCustomerItems) || [];
  const showAddToCart = !currentCustomerItems.some(
    (item) => item.name === name
  );

  const handleAddToCart = () => {
    dispatch(attempt(true));
    try {
      dispatch(
        addItemToOrder({
          name,
          quantity,
          price,
          userId,
        })
      );
    } catch (error) {
      dispatch(
        manageerror(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleRemoveFromCart = () => {
    dispatch(attempt(true));
    try {
      dispatch(
        removeItemFromOrder({
          name,
          userId,
        })
      );
    } catch (error) {
      dispatch(
        manageerror(error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(
        updateQuantity({
          name,
          quantity: newQuantity,
          userId,
          price,
        })
      );
    }
  };

  const displayedIngredients = ingredients.slice(0, 3);

  return (
    <ItemContainer>
      <ContentContainer>
        <ImageContainer>
          <Image src={image} alt={name} />
        </ImageContainer>
        <DetailsContainer>
          <Title>{name}</Title>
          <IngredientList>
            {displayedIngredients.map((ingredient, index) => (
              <IngredientItem key={index}>{ingredient}</IngredientItem>
            ))}
          </IngredientList>
          <PriceCart>
            <UserId>Price: {price}$</UserId>
            {!showAddToCart && (
              <QuantityContainer>
                <QuantityButton
                  onClick={() => handleUpdateQuantity(quantity - 1)}
                >
                  -
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton
                  onClick={() => handleUpdateQuantity(quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityContainer>
            )}
            {showAddToCart && (
              <AddToCartButton onClick={handleAddToCart}>
                Add to Cart
              </AddToCartButton>
            )}
            {!showAddToCart && (
              <RemoveFromCartButton onClick={handleRemoveFromCart}>
                Remove
              </RemoveFromCartButton>
            )}
          </PriceCart>
        </DetailsContainer>
      </ContentContainer>
      <Hr />
    </ItemContainer>
  );
};

export default Item;
