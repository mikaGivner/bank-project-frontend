import styled from "styled-components";
export const Box = styled.div`
    width: 20rem;
    height: 20rem;
    border-radius: 1rem;
    margin:1rem;
  background ${(props) => (props.n === 0 ? "blue" : "red")};
  display:flex;
  align-items:center;
  justify-content:center;

  &:hover{
    cursor:pointer;
    opacity:0.7;
  }
    
  `;
