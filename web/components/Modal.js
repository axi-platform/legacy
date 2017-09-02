import React from 'react'
import {injectGlobal} from 'emotion'
import styled from 'react-emotion'

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);

  transition: 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  opacity: ${props => (props.open ? 1 : 0)};
`

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const Modal = styled.div`
  width: 13em;
  background: white;
  padding: 0.8em;
  font-family: 'Helvetica Neue';
  font-weight: 300;
  font-size: 1.25em;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);

  transition: 0.6s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  transform: scale(${props => (props.open ? 1.1 : 0)});
`

const ModalBox = ({open, children}) => open && (
  <div>
    <Backdrop open={open} />
    <Wrapper>
      <Modal open={open}>
        {children}
      </Modal>
    </Wrapper>
  </div>
)

export default ModalBox
