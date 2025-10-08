import React from 'react';
//import PropTypes from 'prop-types'
import styled from 'styled-components';
import { devices } from '../../utils/constantes';

const FooterStyle = styled.footer`
    min-height: 10vh !important;
    background: var(--black-color);

    @media only screen and (${devices.tablet}) {
        margin-top: 8rem !important;
    }
`;

const ContainerFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 1rem;
`;

const TextFooter = styled.span`
    font-size: 1.2rem;
    color: var(--primary-color);
    font-weight: 500;
`;

const Footer = ({ name }) => {
    const year = new Date().getFullYear();
    return (
        <>
            <FooterStyle className="footer">
                <ContainerFooter className="container-footer">
                    <TextFooter className="text-footer">
                        {name} &copy; {year}{' '}
                    </TextFooter>
                </ContainerFooter>
            </FooterStyle>
        </>
    );
};

Footer.propTypes = {};

export default Footer;
