import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { devices } from '../../../utils/constantes';

// Styled button component with responsive design
const StyledButton = styled.button`
    /* Base styles */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: ${props => {
        switch (props.size) {
            case 'small':
                return '0.5rem 1rem';
            case 'large':
                return '1rem 2rem';
            default:
                return '0.75rem 1.5rem';
        }
    }};
    border: 2px solid transparent;
    border-radius: ${props =>
        props.$rounded ? '50px' : '6px'};
    font-family: inherit;
    font-size: ${props => {
        switch (props.size) {
            case 'small':
                return '0.875rem';
            case 'large':
                return '1.125rem';
            default:
                return '1rem';
        }
    }};
    font-weight: 600;
    line-height: 1.5;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    min-height: ${props => {
        switch (props.size) {
            case 'small':
                return '36px';
            case 'large':
                return '56px';
            default:
                return '44px';
        }
    }};

    /* Disable user select */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;

    /* Focus styles */
    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px
            var(--secondary-color-alternative);
    }

    /* Disabled styles */
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }

    /* Hover effect */
    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px var(--black-colo);
    }

    /* Active effect */
    &:active:not(:disabled) {
        transform: translateY(0);
    }

    /* Loading state */
    ${props =>
        props.$loading &&
        css`
            pointer-events: none;
            opacity: 0.8;
        `}

    /* Full width */
  ${props =>
        props.$fullWidth &&
        css`
            width: 100%;
        `}

  /* Variant styles */
  ${props => {
        switch (props.variant) {
            case 'primary':
                return css`
                    background: var(
                        --primary-color
                    );
                    color: var(--white-color);
                    border-color: transparent;

                    &:hover:not(:disabled) {
                        background: var(
                            --secondary-color
                        );
                    }
                `;

            case 'secondary':
                return css`
                    background: var(
                        --white-color
                    );
                    color: var(--black-color);
                    border-color: var(
                        --gray-color
                    );

                    &:hover:not(:disabled) {
                        background: var(
                            --gray-color
                        );
                        color: var(--black-color);
                    }
                `;

            case 'dark':
                return css`
                    background: var(
                        --background-color
                    );
                    color: var(--white-color);
                    border-color: transparent;

                    &:hover:not(:disabled) {
                        background: var(
                            --black-color
                        );
                    }
                `;

            case 'outline':
                return css`
                    background: transparent;
                    color: var(--primary-color);
                    border-color: var(
                        --primary-color
                    );

                    &:hover:not(:disabled) {
                        background: var(
                            --primary-color
                        );
                        color: var(--white-color);
                    }
                `;

            case 'ghost':
                return css`
                    background: transparent;
                    color: var(--primary-color);
                    border-color: transparent;

                    &:hover:not(:disabled) {
                        background: var(
                            --secondary-color-alternative
                        );
                        color: var(
                            --secondary-color
                        );
                    }
                `;

            default:
                return css`
                    background: var(
                        --primary-color
                    );
                    color: var(--white-color);
                    border-color: transparent;

                    &:hover:not(:disabled) {
                        background: var(
                            --secondary-color
                        );
                    }
                `;
        }
    }}

  /* Responsive design */
  @media only screen and (${devices.tablet}) {
        font-size: ${props => {
            switch (props.size) {
                case 'small':
                    return '0.8rem';
                case 'large':
                    return '1rem';
                default:
                    return '0.9rem';
            }
        }};

        padding: ${props => {
            switch (props.size) {
                case 'small':
                    return '0.4rem 0.8rem';
                case 'large':
                    return '0.8rem 1.6rem';
                default:
                    return '0.6rem 1.2rem';
            }
        }};
    }

    @media only screen and (${devices.mobileG}) {
        ${props =>
            props.$fullWidthMobile &&
            css`
                width: 100%;
            `}
    }
`;

const LoadingSpinner = styled.div`
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const MyButton = ({
    children,
    variant = 'primary',
    size = 'medium',
    type = 'button',
    disabled = false,
    loading = false,
    rounded = false,
    fullWidth = false,
    fullWidthMobile = false,
    startIcon = null,
    endIcon = null,
    loadingText = 'Loading...',
    onClick,
    className,
    style,
    ...rest
}) => {
    const handleClick = e => {
        if (!disabled && !loading && onClick) {
            onClick(e);
        }
    };

    return (
        <StyledButton
            type={type}
            variant={variant}
            size={size}
            disabled={disabled || loading}
            $loading={loading}
            $rounded={rounded}
            $fullWidth={fullWidth}
            $fullWidthMobile={fullWidthMobile}
            onClick={handleClick}
            className={className}
            style={style}
            {...rest}
        >
            {loading && <LoadingSpinner />}
            {!loading && startIcon && startIcon}
            {loading ? loadingText : children}
            {!loading && endIcon && endIcon}
        </StyledButton>
    );
};

MyButton.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf([
        'primary',
        'secondary',
        'dark',
        'outline',
        'ghost'
    ]),
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large'
    ]),
    type: PropTypes.oneOf([
        'button',
        'submit',
        'reset'
    ]),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    rounded: PropTypes.bool,
    fullWidth: PropTypes.bool,
    fullWidthMobile: PropTypes.bool,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    loadingText: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
};

export default MyButton;
