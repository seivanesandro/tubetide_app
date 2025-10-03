import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { devices } from '../../../utils/constantes';

const ErrorStyle = styled.span`
    color: var(--secondary-color) !important;
    font-size: 1.4rem;
    font-weight: 600;
    text-align: center;
    width: ${({ width }) =>
        width ? width : '100%'};
    @media only screen and (${devices.portatilL}) {
        font-size: 1.2rem;
    }
`;

const ErrorComponent = ({ errmessage }) => {
    return (
        <>
            <ErrorStyle>
                ERROR: {errmessage}
            </ErrorStyle>
        </>
    );
};

ErrorComponent.propTypes = {
    errmessage: PropTypes.string.isRequired
};

export default ErrorComponent;
