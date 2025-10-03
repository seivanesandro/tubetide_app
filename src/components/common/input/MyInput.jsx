import React, {
    useState,
    forwardRef
} from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { devices } from '../../../utils/constantes';

// Input wrapper component
const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    position: relative;
`;

// Label component
const Label = styled.label`
    font-size: 0.875rem;
    font-weight: bold !important;
    color: var(--primary-color) !important;
    text-transform: uppercase;
    margin-bottom: ${props =>
        props.$variant === 'underlined'
            ? '0.75rem'
            : '0.25rem'};
    text-align: start;

    ${props =>
        props.$required &&
        css`
            &::after {
                content: ' *';
                color: #ef4444;
            }
        `}

    @media only screen and (${devices.tablet}) {
        font-size: 0.8rem;
    }
`;

// Styled input component
const StyledInput = styled.input`
    /* Base styles */
    width: 100%;
    padding: ${props => {
        switch (props.size) {
            case 'small':
                return '0.5rem 0.75rem';
            case 'large':
                return '1rem 1.25rem';
            default:
                return '0.75rem 1rem';
        }
    }};
    border: 2px solid var(--gray-color);
    border-radius: ${props =>
        props.$rounded
            ? '50px'
            : 'var(--border-radius)'};
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
    line-height: 1.5;
    color: var(--primary-color);
    font-weight: 600;
    background-color: var(--white-color);
    transition: all 0.3s ease;
    outline: none;
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

    /* Padding adjustments for icons */
    ${props =>
        props.$hasStartIcon &&
        css`
            padding-left: ${props.size === 'large'
                ? '3rem'
                : props.size === 'small'
                  ? '2.5rem'
                  : '2.75rem'};
        `}

    ${props =>
        props.$hasEndIcon &&
        css`
            padding-right: ${props.size ===
            'large'
                ? '3rem'
                : props.size === 'small'
                  ? '2.5rem'
                  : '2.75rem'};
        `}

  /* Placeholder styles */
  &::placeholder {
        color: ${({ placeholdercolor }) =>
            placeholdercolor
                ? placeholdercolor
                : 'var(--gray-color)'};
        opacity: 1;
    }

    /* Focus styles */
    &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px
            var(--secondary-color-alternative);
    }

    /* Hover styles */
    &:hover:not(:disabled):not(:focus) {
        border-color: var(
            --secondary-color-alternative
        );
    }

    /* Error state */
    ${props =>
        props.$error &&
        css`
            border-color: #ef4444;
            background-color: #fef2f2;

            &:focus {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px
                    rgba(239, 68, 68, 0.1);
            }
        `}

    /* Success state */
  ${props =>
        props.$success &&
        css`
            border-color: #10b981;
            background-color: #f0fdf4;

            &:focus {
                border-color: #10b981;
                box-shadow: 0 0 0 3px
                    rgba(16, 185, 129, 0.1);
            }
        `}

  /* Disabled state */
  &:disabled {
        background-color: var(--gray-color);
        color: var(--background-color);
        cursor: not-allowed;
        border-color: var(--gray-color);
    }

    /* Variant styles */
    ${props => {
        switch (props.variant) {
            case 'outlined':
                return css`
                    border: 2px solid
                        var(--gray-color);
                    background-color: transparent;
                `;

            case 'filled':
                return css`
                    border: 2px solid transparent;
                    background-color: var(
                        --gray-color
                    );

                    &:focus {
                        background-color: var(
                            --white-color
                        );
                        border-color: var(
                            --primary-color
                        );
                    }
                `;

            case 'underlined':
                return css`
                    border: none !important;
                    border-bottom: 2px solid
                        var(--gray-color) !important;
                    border-radius: 0 !important;
                    background-color: transparent !important;
                    padding-left: ${props =>
                        props.$hasStartIcon
                            ? '2rem'
                            : '0'};
                    padding-right: ${props =>
                        props.$hasEndIcon
                            ? '2rem'
                            : '0'};
                    box-shadow: none !important;

                    &:focus {
                        border: none !important;
                        border-bottom: 2px solid
                            var(--primary-color) !important;
                    }

                    &:hover:not(:disabled):not(
                            :focus
                        ) {
                        border: none !important;
                        border-bottom: 2px solid
                            var(
                                --secondary-color-alternative
                            ) !important;
                        box-shadow: none !important;
                    }

                    @media only screen and (${devices.tablet}) {
                        padding-left: ${props =>
                            props.$hasStartIcon
                                ? '1.75rem'
                                : '0'};
                        padding-right: ${props =>
                            props.$hasEndIcon
                                ? '1.75rem'
                                : '0'};
                    }
                `;

            default:
                return css`
                    border: 2px solid
                        var(--gray-color);
                    background-color: var(
                        --white-color
                    );
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
                    return '0.4rem 0.6rem';
                case 'large':
                    return '0.8rem 1rem';
                default:
                    return '0.6rem 0.8rem';
            }
        }};

        ${props =>
            props.$hasStartIcon &&
            css`
                padding-left: ${props.size ===
                'large'
                    ? '2.5rem'
                    : '2.25rem'};
            `}

        ${props =>
            props.$hasEndIcon &&
            css`
                padding-right: ${props.size ===
                'large'
                    ? '2.5rem'
                    : '2.25rem'};
            `}
    }
`;

// Textarea component
const StyledTextarea = styled.textarea`
    /* Inherit most styles from StyledInput */
    width: 100%;
    padding: ${props => {
        switch (props.size) {
            case 'small':
                return '0.5rem 0.75rem';
            case 'large':
                return '1rem 1.25rem';
            default:
                return '0.75rem 1rem';
        }
    }};
    border: 2px solid var(--gray-color);
    border-radius: ${props =>
        props.$rounded
            ? '16px'
            : 'var(--border-radius)'};
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
    line-height: 1.5;
    color: var(--black-color);
    background-color: var(--white-color);
    transition: all 0.3s ease;
    outline: none;
    resize: vertical;
    min-height: ${props =>
        props.rows
            ? `${props.rows * 1.5}rem`
            : '6rem'};

    &::placeholder {
        color: var(--gray-color);
        opacity: 1;
    }

    &:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px
            var(--secondary-color-alternative);
    }

    &:hover:not(:disabled):not(:focus) {
        border-color: var(
            --secondary-color-alternative
        );
    }

    ${props =>
        props.$error &&
        css`
            border-color: #ef4444;
            background-color: #fef2f2;

            &:focus {
                border-color: #ef4444;
                box-shadow: 0 0 0 3px
                    rgba(239, 68, 68, 0.1);
            }
        `}

    ${props =>
        props.$success &&
        css`
            border-color: #10b981;
            background-color: #f0fdf4;

            &:focus {
                border-color: #10b981;
                box-shadow: 0 0 0 3px
                    rgba(16, 185, 129, 0.1);
            }
        `}

  &:disabled {
        background-color: #f9fafb;
        color: #9ca3af;
        cursor: not-allowed;
        border-color: #e5e7eb;
    }

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
                    return '0.4rem 0.6rem';
                case 'large':
                    return '0.8rem 1rem';
                default:
                    return '0.6rem 0.8rem';
            }
        }};
    }
`;

// Icon container
const IconContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    ${props =>
        props.$position === 'start'
            ? 'left: 0'
            : 'right: 0'};
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    pointer-events: none;
    z-index: 1;

    @media only screen and (${devices.tablet}) {
        width: 1.75rem;
    }
`;

// Helper text component
const HelperText = styled.div`
    font-size: 0.75rem;
    color: var(--white-color);
    margin-top: 0.25rem;

    ${props =>
        props.$error &&
        css`
            color: #ef4444;
        `}

    ${props =>
        props.$success &&
        css`
            color: #10b981;
        `}

  @media only screen and (${devices.tablet}) {
        font-size: 0.7rem;
    }
`;

// Character count component
const CharacterCount = styled.div`
    font-size: 0.75rem;
    color: var(--white-color);
    text-align: right;
    margin-top: 0.25rem;

    ${props =>
        props.$isOverLimit &&
        css`
            color: #ef4444;
        `}
`;

const MyInput = forwardRef(
    (
        {
            type = 'text',
            variant = 'outlined',
            size = 'medium',
            label,
            placeholder,
            placeholdercolor,
            value,
            defaultValue,
            onChange,
            onBlur,
            onFocus,
            disabled = false,
            required = false,
            error = false,
            success = false,
            errorMessage,
            successMessage,
            helperText,
            startIcon,
            endIcon,
            rounded = false,
            maxLength,
            showCharacterCount = false,
            multiline = false,
            rows = 4,
            autoFocus = false,
            className,
            style,
            ...rest
        },
        ref
    ) => {
        const [internalValue, setInternalValue] =
            useState(defaultValue || '');

        const currentValue =
            value !== undefined
                ? value
                : internalValue;
        const isOverLimit =
            maxLength &&
            currentValue.length > maxLength;

        const handleChange = e => {
            if (value === undefined) {
                setInternalValue(e.target.value);
            }
            if (onChange) {
                onChange(e);
            }
        };

        const handleFocus = e => {
            if (onFocus) {
                onFocus(e);
            }
        };

        const handleBlur = e => {
            if (onBlur) {
                onBlur(e);
            }
        };

        const inputProps = {
            ref,
            type,
            variant,
            size,
            placeholder,
            placeholdercolor,
            value: currentValue,
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            disabled,
            required,
            $error: error,
            $success: success,
            $rounded: rounded,
            $hasStartIcon: !!startIcon,
            $hasEndIcon: !!endIcon,
            maxLength,
            autoFocus,
            className,
            style,
            ...rest
        };

        const InputComponent = multiline
            ? StyledTextarea
            : StyledInput;

        if (multiline) {
            inputProps.rows = rows;
        }

        return (
            <InputWrapper>
                {label && (
                    <Label
                        htmlFor={
                            rest.id || rest.name
                        }
                        $required={required}
                        $variant={variant}
                    >
                        {label}
                    </Label>
                )}

                <div
                    style={{
                        position: 'relative'
                    }}
                >
                    {startIcon && (
                        <IconContainer
                            $position="start"
                            size={size}
                            $hasLabel={!!label}
                            $variant={variant}
                        >
                            {startIcon}
                        </IconContainer>
                    )}

                    <InputComponent
                        {...inputProps}
                    />

                    {endIcon && (
                        <IconContainer
                            $position="end"
                            size={size}
                            $hasLabel={!!label}
                            $variant={variant}
                        >
                            {endIcon}
                        </IconContainer>
                    )}
                </div>

                {(errorMessage ||
                    successMessage ||
                    helperText) && (
                    <HelperText
                        $error={error}
                        $success={success}
                    >
                        {errorMessage ||
                            successMessage ||
                            helperText}
                    </HelperText>
                )}

                {showCharacterCount &&
                    maxLength && (
                        <CharacterCount
                            $isOverLimit={
                                isOverLimit
                            }
                        >
                            {currentValue.length}/
                            {maxLength}
                        </CharacterCount>
                    )}
            </InputWrapper>
        );
    }
);

MyInput.displayName = 'MyInput';

MyInput.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'time',
        'datetime-local',
        'month',
        'week',
        'color',
        'file',
        'range',
        'hidden'
    ]),
    variant: PropTypes.oneOf([
        'outlined',
        'filled',
        'underlined'
    ]),
    size: PropTypes.oneOf([
        'small',
        'medium',
        'large'
    ]),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    defaultValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    error: PropTypes.bool,
    success: PropTypes.bool,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string,
    helperText: PropTypes.string,
    startIcon: PropTypes.node,
    endIcon: PropTypes.node,
    rounded: PropTypes.bool,
    maxLength: PropTypes.number,
    showCharacterCount: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default MyInput;
