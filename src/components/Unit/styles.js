import styled from "styled-components";

export const UnitItem = styled.div.attrs((props) => ({ ...props }))`
  font-size: 9px;
  color: transparent;
  min-width: 15px;
  max-width: 15px;
  margin: 0 -1px;
  position: relative;
  border-right: 1px dashed rgba(255, 255, 255, 0.02);
  cursor: ${(props) => props.isScalable ? 'move' : 'auto'}
`;
