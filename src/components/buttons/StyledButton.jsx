/* eslint-disable no-nested-ternary */
import React from 'react';
import { useStoreon } from 'storeon/react';
import styled from 'styled-components';

export default function StyledButton(props) {
  const {
    title = '',
    onClick = () => {},
    outline,
    color,
    background = '',
    className,
    disabled,
    hoverColor,
    hoverBackground,
  } = props;

  const { theme } = useStoreon('theme');
  return (
    <Button
      onClick={onClick}
      outline={outline}
      color={color}
      style={{ background }}
      className={className}
      disabled={disabled}
      hoverColor={hoverColor}
      hoverBackground={hoverBackground}
      theme={theme}
      background={background}
    >
      {title}
    </Button>
  );
}

const Button = styled.button`
  box-sizing: border-box;
  background: ${(props) => (props.outline ? 'none' : 'unset')};
  border-radius: 4px;
  padding: 10px 16px;
  color: ${(props) => (props.color ? props.color : 'unset')};
  font-weight: normal;
  font-size: 16px;
  line-height: 16px;
  width: max-content;
  min-width: 0;
  max-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.background ? props.background : props.color ? props.color : 'unset')};

  &:hover {
    color: ${(props) => (props.hoverColor ? props.hoverColor : '')};
    background-color: ${(props) => (props.hoverBackground ? props.hoverBackground : '')};
  }
`;
