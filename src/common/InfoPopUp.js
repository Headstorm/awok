import React from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  left: 10%;
  right: 10%;
  top: 10%;
  bottom: 60%;
  border-radius: 1px;
  background: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  width: 70%;
`;

const Text = styled.span`
  color: #518dfd;
  align-self: flex-end;
`;

const InfoPopUp = (props) => {
  return (
    <Modal>
      <ModalContent>
        <p>
          <b>Rules:</b>
          <br/>
          {props.content}
        </p>
        <Text onClick={() => props.handleDismiss()}>Dismiss</Text>
      </ModalContent>
    </Modal>
  );
};

export default InfoPopUp;
