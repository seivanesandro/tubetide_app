import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Corrigido: importação correta
import styled, {
    keyframes
} from 'styled-components';
import { devices } from '../utils/constantes';
import logo from '../images/logo.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: var(--bg-color);
    padding: 2rem;
`;

const Logo = styled.img`
    width: 10rem;
    height: auto;
    margin-bottom: 0.1rem;
    animation: ${fadeIn} 1s ease-out;

    @media only screen and (max-width: 425px) {
        font-size: 2.5rem;
    }
`;

const LoginCard = styled.div`
    background-color: var(--gray-color-secondary);
    border-radius: 10px;
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30rem;
    animation: ${fadeIn} 1s ease-out 0.3s both;

    &:hover {
        box-shadow: 0 0 0.3rem
            var(--primary-color);
    }

    @media only screen and (${devices.iphone14}) {
        width: 25rem;
    }
    @media only screen and (${devices.mobileG}) {
        width: 25rem;
    }
    @media only screen and (${devices.mobileM}) {
        width: 22rem;
    }
    @media only screen and (${devices.mobileP}) {
        width: 19rem;
    }
`;

const WelcomeText = styled.h2`
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;

    @media only screen and (${devices.iphone14}) {
        font-size: 1.3rem !important;
    }
    @media only screen and (${devices.mobileG}) {
        font-size: 1.3rem !important;
    }
    @media only screen and (${devices.mobileM}) {
        font-size: 1.1rem !important;
    }
    @media only screen and (${devices.mobileP}) {
    }
`;

const SubText = styled.p`
    color: var(--white-color);
    margin-bottom: 2rem;
    text-align: center;
    opacity: 0.9;
`;

const Footer = styled.p`
    color: var(--white-color);
    font-size: 0.8rem;
    margin-top: 1rem;
    opacity: 0.7;
    text-align: center;
`;

const Login = ({ onLogin }) => {
    const handleGoogleSuccess =
        credentialResponse => {
            const userObject = jwtDecode(
                credentialResponse.credential
            );
            console.log(
                'Google user data:',
                userObject
            );

            // Extrair informações relevantes do token decodificado
            const userData = {
                id: userObject.sub,
                name: userObject.name,
                email: userObject.email,
                picture: userObject.picture
            };

            onLogin(userData);
        };

    const handleGoogleError = () => {
        console.error('Login Failed');
    };

    return (
        <>
            <LoginContainer className="container-login">
                <LoginCard className="login-card">
                    <WelcomeText className="login-card-title">
                        Welcome to TubeTide
                        <Logo
                            src={logo}
                            alt="TubeTide Logo"
                        />
                    </WelcomeText>
                    <SubText className="login-card-subtitle">
                        Your personal YouTube
                        video viewer with enhanced
                        features
                    </SubText>

                    <GoogleLogin
                        className="google-login-button"
                        onSuccess={
                            handleGoogleSuccess
                        }
                        onError={
                            handleGoogleError
                        }
                        useOneTap
                        type="standard"
                        theme="filled_blue"
                        size="large"
                        text="signin_with"
                        shape="pill"
                        logo_alignment="left" // left, center
                        width="300px"
                        styled={{backgroundColor: 'var(--primary-color)'}}
                    />

                    <Footer className="login-footer">
                        By signing in, you agree
                        to our Terms of Service
                        and Privacy Policy
                    </Footer>
                </LoginCard>
            </LoginContainer>
        </>
    );
};

export default Login;
