import styled from 'styled-components';

const StyledButton = styled.button`
  position: relative;
  display: inline-block;
  padding: 10px 18px;
  text-align: center;
  font-size: 15px;
  font-weight: 600;
  color: #725ac1;
  background: transparent;
  cursor: pointer;
  transition: ease-out 0.4s;
  border: 2px solid #725ac1;
  border-radius: 8px;
  box-shadow: inset 0 0 0 0 #725ac1;

  &:hover {
    color: white;
    box-shadow: inset 0 -100px 0 0 #725ac1;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export default StyledButton;
