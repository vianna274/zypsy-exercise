import styled, { css, keyframes } from 'styled-components';

type Props = {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-right: ${props => props.theme.spacing(1)};
`;

const StyledButton = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.borderRadius};
  transition: all 0.2s ease;
  padding-top: ${props => props.theme.spacing(1)};
  padding-bottom: ${props => props.theme.spacing(1)};
  padding-left: ${props => props.theme.spacing(3)};
  padding-right: ${props => props.theme.spacing(2)};
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: transparent;
          color: ${props.theme.colors.primary};
          border: 1px solid ${props.theme.colors.primary};
          &:hover {
            background-color: ${props.theme.colors.hoverTransparent};
          }
        `;
      default:
        return css`
          background-color: ${props.theme.colors.primary};
          color: white;
          border: none;
          &:hover {
            background-color: ${props.theme.colors.hoverPrimary};
          }
        `;
    }
  }}

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px white;
  }
`;

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      isLoading={isLoading}
      {...props}
    >
      {children}
      {icon && !isLoading && <span>{icon}</span>}
      {isLoading && <LoadingSpinner />}
    </StyledButton>
  );
};

export default Button;