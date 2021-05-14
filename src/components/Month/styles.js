import styled from "styled-components";

export const MonthElement = styled.div`
  background-color: ${(props) => (props.odd ? "#333" : "#444")};
  width: auto;
`;

export const NameOfMonth = styled.div`
  color: #fff;
  display: flex;
  background-color: #000;
  width: 100%;
  justify-content: center;
  padding-bottom: 10px;
`;
