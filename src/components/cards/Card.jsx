import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

export default function Card({ data }) {
  const [isBack, setIsBack] = useState(false);
  const instant = useRef(null);

  const flip = () => {
    setIsBack((prev) => !prev);
    instant.current = false;
  };

  const instantBack = () => {
    if (instant.current !== null && isBack) {
      instant.current = true;
      setIsBack(false);
    }
  };

  const spaceFlip = useCallback((e) => {
    if (e.keyCode === 32) {
      flip();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', spaceFlip);
    return () => {
      document.removeEventListener('keydown', spaceFlip);
    };
  }, []);

  useEffect(() => {
    instantBack();
  }, [data.id]);

  useEffect(() => {
    if (!isBack) {
      instant.current = false;
    }
  }, [isBack]);

  return (
    <Wrapper>
      <Inner isBack={isBack} instant={instant.current} onClick={flip}>
        <Front>{data.question}</Front>
        <Back>{data.answer}</Back>
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 932px;
  width: 100%;
  height: 528px;
  perspective: 1000px;
  margin: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 40px;
  line-height: 40px;
  position: relative;
`;

const Inner = styled.div`
  transform: ${(props) => (props.isBack ? 'rotateY(180deg)' : 'rotateY(0deg)')};
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: ${(props) => (props.instant ? 'none' : 'transform 0.5s')};
  transform-style: preserve-3d;
  box-shadow: 0px 3px 14px rgba(19, 10, 46, 0.03), 0px 1px 3px rgba(19, 10, 46, 0.13);
  border-radius: 8px;
`;

const Front = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: ${(props) => props.theme.colors.cardBg};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

const Back = styled(Front)`
  transform: rotateY(180deg);
`;
