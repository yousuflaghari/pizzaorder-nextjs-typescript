import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #facc15;
  height: 55px;
`;

const OrderingSearchbar = styled.input`
  padding: 8px 16px;
  font-size: 21px;
  border: 1px solid #ccc;
  border-radius: 30px;
  background-color: #fef9c3;
`;

const UserName = styled.div`
  font-size: 20px;
  font-family: monospace;
  color: #44403c;
  margin-left: 20px;
`;

const BackToMenuLink = styled(Link)`
  display: inline-block;
  margin: 20px 0;
  padding: 10px 20px;
  color: #007bff;
  text-decoration: none;
`;

const Header = () => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push("/menu");
  };

  return (
    <HeaderContainer>
      <div>
        <BackToMenuLink href="/menu" onClick={handleMenuClick}>
          Menu
        </BackToMenuLink>
        <BackToMenuLink href="/pizzalist">Pizza List</BackToMenuLink>
        <BackToMenuLink href="/cart">Cart</BackToMenuLink>
      </div>
    </HeaderContainer>
  );
};

export default Header;
