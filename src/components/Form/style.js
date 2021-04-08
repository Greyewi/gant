import styled from "styled-components"

export const FormContainer = styled.form.attrs(props => ({onSubmit: props.onSubmit}))`
  background-color: #fff;
  width: auto;
  height: 200px;
  border-style: dotted;
`