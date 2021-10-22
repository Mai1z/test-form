import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  padding: 7px 0;
`;

const LoaderDots = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.white};
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: .5s;
  &:before, &:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }
  &:before {
    left: -12px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.white};
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0s;
  }
  &:after {
    left: 12px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.white};
    color: ${({ theme }) => theme.white};
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 1s;
  }
  @keyframes dotFlashing {
    0% {
      background-color: ${({ theme }) => theme.white};
      opacity: 0.8;
    }
    50% {
      background-color: ${({ theme }) => theme.white};
      opacity: 0.5;
    }
    100% {
      background-color: ${({ theme }) => theme.white};
      opacity: 0.1;
    }
  }
`;

export const Loader: React.FC = () => (
  <LoaderWrapper>
    <LoaderDots />
  </LoaderWrapper>
);
