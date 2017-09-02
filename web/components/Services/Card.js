import styled from 'react-emotion'

export const Grid = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(54em + 1.5em);
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 18em;
  padding: 0.5em;
  text-align: left;
  max-height: 22em;

  align-items: center;
  justify-content: center;
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  z-index: 1;
  cursor: pointer;
  border-radius: 0.5em;
  width: 100%;
  color: white;
  background: ${props => props.color || '#2c3e50'};

  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  &:hover {
    transform: scale(1.04);
  }
`

export const Adder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  background: ${props => props.color || '#16a085'};
  cursor: pointer;
  padding: 0.5em;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  opacity: 0.75;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;

  > svg {
    fill: white;
    width: 1.25em;
    height: 1.25em;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.24);
  }
`

export const AdderRing = styled.div`
  position: absolute;
  width: ${props => props.size || '3.5em'};
  height: ${props => props.size || '3.5em'};
  border: 2px solid ${props => props.color || '#16a085'};
  border-radius: 50%;
  opacity: 0.3;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1.5em;
  font-size: 1.8em;
`

export const Meta = styled.div`
  display: flex;
  font-weight: 300;
  padding: .75em 1.5em;
  background: rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`