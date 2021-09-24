import styled from "styled-components";
import Plus from "../../shared/images/add.svg";

export const LineElement = styled.div.attrs((props) => ({ ...props }))`
  display: flex;
  margin: 20px 0;
  font-size: 16px;
  padding: 2px;
`;

export const ProcessRow = styled.div.attrs((props) => ({ ...props }))`
  display: flex;
  flex-direction: column;
`;

export const ProcessElement = styled.input.attrs((props) => ({ ...props }))`
  font-size: 15px;
  color: #2f2b2b;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  margin: 0 10px;
  border: 0;
  background-color: transparent;
  outline: none;
  text-decoration: underline;
`;

export const ProcessLine = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100px;
`;

export const AddNewProcess = styled.div`
  display: block;
  width: 50px;
  position: relative;
  top: 10px;
  height: 50px;
  fill: #9f9d9d;
  cursor: pointer;
  background-image: url(${Plus});
  background-size: 40px 40px;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid #2f2b2b;
  border-radius: 5px;
  
  &:hover {
    border-color: #838282;
  }
  
  
`;

export const ProcessConfigContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100vw - 30px);
  position: sticky;
`

export const ManageScaleContainer = styled.div`
  width: 250px;
  display: flex;
  justify-content: space-between;
  font-size: 38px;
  margin: 10px 5px;
  height: 50px;
`

export const ScaleCombineBtn = styled.div`
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 30px;
`

export const ScaleBtn = styled.div`
  width: 50px;
  border: 2px solid #2f2b2b;
  color: #2f2b2b;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  & > img {
    width: 34px;
  }
  
  &:hover {
    border-color: #838282;
  }
  
  ${ScaleCombineBtn} > & {
    height: 20px;
  }
  
  ${ScaleCombineBtn} > & > img {
    height: 15px;
  }
`

