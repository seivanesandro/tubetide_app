import React from 'react';
// import PropTypes from 'prop-types'

import styled from 'styled-components';

// Comomponents commons
//import Loading from '../components/common/load/Loading';
//import ErrorCompoment from '../components/common/error/ErrorComponent';
//import MyButton from '../components/common/button/MyButton';
//import MyInput from '../components/common/input/MyInput';
//import { FaSearch, FaEnvelope } from 'react-icons/fa';

const StyleMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
`;

const Main = props => {
    return (
        <>
            <StyleMain className="main"></StyleMain>
        </>
    );
};

Main.propTypes = {};

export default Main;
