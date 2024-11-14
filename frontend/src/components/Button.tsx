import styled, { css } from 'styled-components';
import StarIcon from './StarIcon';
import theme from '../theme';

type Props = {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  favorite: boolean;
  onClick?: () => void;
  onIconClick?: () => void;
};

const StyledButton = styled.button<Omit<Props, 'favorite'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: all 0.2s ease;
  padding-top: ${(props) => props.theme.spacing(1)};
  padding-bottom: ${(props) => props.theme.spacing(1)};
  padding-left: ${(props) => props.theme.spacing(3)};
  padding-right: ${(props) => props.theme.spacing(2)};
  font-size: 14px;
  line-height: 24px;
  font-weight: 600;
  width: fit-content;
  cursor: pointer;

  ${(props) => {
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

const IconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

const Button: React.FC<Props> = ({
  children,
  variant = 'primary',
  favorite = false,
  onIconClick,
  ...props
}) => {
  const handleIconClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onIconClick?.();
  };

  return (
    <StyledButton variant={variant} {...props}>
      {children}
      <IconContainer onClick={handleIconClick}>
        <StarIcon
          stroke={
            variant === 'primary' ? theme.colors.accent : theme.colors.primary
          }
          fill={
            favorite
              ? variant === 'primary'
                ? theme.colors.accent
                : theme.colors.primary
              : 'transparent'
          }
        />
      </IconContainer>
    </StyledButton>
  );
};

export default Button;
