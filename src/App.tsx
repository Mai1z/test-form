import React from 'react';
import styled from 'styled-components';

import { Form } from './components/Form';

const currTime = Number(new Date().toLocaleTimeString().slice(0, 2));

const bgImages = {
  day: 'https://0.pik.ru.cdn.pik-service.ru/undefined/2021/08/03/dji_0093.rev00_wj16guVhKoupGK8K.jpg',
  night: 'https://0.pik.ru.cdn.pik-service.ru/undefined/2020/07/21/dsc06845_481909dfb262bfdcb554e38bd110c38f_eZGKKhSFQDqht6yz.jpg',
};

const MainContainer = styled.section<{ currTime?: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${(currTime >= 6 && currTime < 18) ? bgImages.day : bgImages.night}) no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    height: 100%;
    background: none;
  }
`;

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.white};
  border-radius: 8px;
  width: 100%;
  max-width: 544px;
  height: 648px;
  padding: 56px 56px 32px;
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    border-radius: 0;
    padding: 56px 16px 32px;
  }
`;

const Title = styled.span`
  font-size: 44px;
  line-height: 48px;
  font-weight: 600;
  margin-bottom: 16px;
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 42px;
  }
`;

const Description = styled.p`
  font-weight: normal;
  text-align: center;
  line-height: 24px;
  margin-bottom: 32px;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

const Disclaimer = styled.span`
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.secondaryMedium};
`;

const App: React.FC = () => (
  <MainContainer>
    <FormBlock>
      <Title>
        {(currTime >= 0 && currTime < 6) && 'Доброй ночи'}
        {(currTime >= 6 && currTime < 12) && 'Доброе утро'}
        {(currTime >= 12 && currTime < 18) && 'Добрый день'}
        {(currTime >= 18 && currTime < 24) && 'Добрый вечер'}
      </Title>
      <Description>Для бронирования помещений <br /> заполните форму</Description>
      <Form />
      <Disclaimer>Это дисклеймер, который есть во всех формах</Disclaimer>
    </FormBlock>
  </MainContainer>
);

export default App;
