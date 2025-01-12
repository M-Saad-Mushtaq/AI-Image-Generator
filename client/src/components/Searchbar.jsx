import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const SearchContainer = styled.div`
  max-width: 550px;
  display: flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.text_secondary + 90};
  color: ${({ theme }) => theme.text_primary};
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  gap: 6px;
  align-items: center;
`;

const Searchbar = ({ search, setSearch }) => {
  return (
    <SearchContainer>
      <SearchOutlined />
      <input
        placeholder="Enter prompt or name . . ."
        style={{
          border: "none",
          outline: "none",
          width: "100%",
          color: "inherit",
          fontSize: "16px",
          background: "transparent",
        }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </SearchContainer>
  );
};

export default Searchbar;
