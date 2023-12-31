import React from 'react';
import styled, { keyframes } from 'styled-components';

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  animation: slideIn 0.5s ease-in-out;
  max-width: 80%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h2`
  color: #333;
`;

const ModalButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid #4caf50;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;


export const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>Success!</ModalHeader>
        <p>{message}</p>
        <ModalButton onClick={onClose}>Close</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};
