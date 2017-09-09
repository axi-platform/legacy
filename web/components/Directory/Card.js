import styled from 'react-emotion'

export const Grid = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
  max-width: calc(54em + 1.5em);

  @media screen and (max-width: 911px) {
    justify-content: center;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 18em;
  height: 22em;
  padding: 0.5em;
  text-align: left;

  align-items: center;
  justify-content: center;
`

export const Card = styled.a`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  z-index: 1;
  cursor: pointer;
  border-radius: 0.5em;
  width: 100%;
  color: white;
  background: ${props => props.color || '#2c3e50'};
  text-decoration: none;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:hover {
    transform: scale(1.03);
  }
`

export const Adder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.color || '#16a085'};
  cursor: pointer;
  padding: 0.5em;
  border-radius: 50%;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  opacity: 0.75;
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
  position: relative;
  user-select: none;
  transform: scale(1.05);

  &:hover {
    opacity: 1;
    transform: scale(1.28);
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
  position: relative;
  padding: 1em;
  font-size: 1.8em;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;

  > img {
    width: 2em;
    margin-top: 0.85em;
  }
`

export const Meta = styled.div`
  display: flex;
  font-weight: 300;
  padding: .75em 1.5em;
  background: rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`

export const Small = styled.div`
  font-size: 0.53em;
  line-height: 1.4em;
  margin-top: 0.8em;
  height: 4.3em;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
`
