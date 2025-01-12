import React from "react";
import styled from "styled-components";
import Button from "./buttons/button";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  @media only screen and (mad-width: 600px) {
    padding: 10px 12px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/");
  return (
    <Container>
      Image Gen
      {path[1] === "post" ? (
        <Button
          text="Explore Posts"
          leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/")}
          type="secondary"
        />
      ) : (
        <Button
          text="Create Post"
          leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/post")}
        />
      )}
    </Container>
  );
};

export default Navbar;
