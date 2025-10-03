import styled, {
    keyframes
} from 'styled-components';
import PropTypes from 'prop-types';


const Spinner = keyframes`
0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #1EAFF7, 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2), 2.5em 0em 0 0em rgba(30, 175, 247, 0.2), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.2), 0em 2.5em 0 0em rgba(30, 175, 247, 0.2), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.2), -2.6em 0em 0 0em rgba(30, 175, 247, 0.5), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.7), 1.8em -1.8em 0 0em #1EAFF7, 2.5em 0em 0 0em rgba(30, 175, 247, 0.2), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.2), 0em 2.5em 0 0em rgba(30, 175, 247, 0.2), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.2), -2.6em 0em 0 0em rgba(30, 175, 247, 0.2), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.5), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.7), 2.5em 0em 0 0em #1EAFF7, 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.2), 0em 2.5em 0 0em rgba(30, 175, 247, 0.2), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.2), -2.6em 0em 0 0em rgba(30, 175, 247, 0.2), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.2), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.5), 2.5em 0em 0 0em rgba(30, 175, 247, 0.7), 1.75em 1.75em 0 0em #1EAFF7, 0em 2.5em 0 0em rgba(30, 175, 247, 0.2), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.2), -2.6em 0em 0 0em rgba(30, 175, 247, 0.2), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.2), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2), 2.5em 0em 0 0em rgba(30, 175, 247, 0.5), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.7), 0em 2.5em 0 0em #1EAFF7, -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.2), -2.6em 0em 0 0em rgba(30, 175, 247, 0.2), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.2), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2), 2.5em 0em 0 0em rgba(30, 175, 247, 0.2), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.5), 0em 2.5em 0 0em rgba(30, 175, 247, 0.7), -1.8em 1.8em 0 0em #1EAFF7, -2.6em 0em 0 0em rgba(30, 175, 247, 0.2), -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.2), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2), 2.5em 0em 0 0em rgba(30, 175, 247, 0.2), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.2), 0em 2.5em 0 0em rgba(30, 175, 247, 0.5), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.7), -2.6em 0em 0 0em #1EAFF7, -1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(30, 175, 247, 0.2), 1.8em -1.8em 0 0em rgba(30, 175, 247, 0.2), 2.5em 0em 0 0em rgba(30, 175, 247, 0.2), 1.75em 1.75em 0 0em rgba(30, 175, 247, 0.2), 0em 2.5em 0 0em rgba(30, 175, 247, 0.2), -1.8em 1.8em 0 0em rgba(30, 175, 247, 0.5), -2.6em 0em 0 0em rgba(30, 175, 247, 0.7), -1.8em -1.8em 0 0em #1EAFF7;
  }
`;



const Loading = styled.div`
  font-size: ${({fontsize}) => fontsize}px;
  width: ${({size}) => size}em;
  height: ${({size}) => size}em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  animation: ${Spinner} ${({speedborder}) => speedborder}s infinite ease-out;
  transform: translateZ(0);
  z-index: 100;
`;

Loading.propTypes = {
    speedborder: PropTypes.string.isRequired,
    fontsize: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired
};

Loading.defaultProps = {
    speedborder: '0.7',
    fontsize: '8',
    size: '1'
};

export default Loading;
