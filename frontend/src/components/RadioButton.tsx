import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const StyledRadio = styled.span<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 26px;
  display: inline-block;
  position: relative;
  margin-right: ${props => props.theme.spacing(1)};

  ${props =>
    props.checked &&
    css`
      background-color: white;

      &::after {
        content: '';
        width: 12px;
        height: 12px;
        border-radius: 16px;
        background: ${props => props.theme.colors.primary};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;

const Label = styled.span`
  font-size: 12px;
  line-height: 20px;
  font-weight: 400;
  color: ${props => props.theme.colors.foreground};
`;

const RadioButton: React.FC<Props> = ({ label, value, checked, onChange }) => {
  return (
    <RadioContainer onClick={onChange}>
      <HiddenRadio
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <StyledRadio checked={checked} />
      <Label>{label}</Label>
    </RadioContainer>
  );
};

export default RadioButton; 