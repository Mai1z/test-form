import React from 'react';
import styled from 'styled-components';

import { Form } from './components/Form';

const MainContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url("https://0.pik.ru.cdn.pik-service.ru/undefined/2021/08/03/dji_0093.rev00_wj16guVhKoupGK8K.jpg") center no-repeat;
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
      <Title>Добрый вечер</Title>
      <Description>Для бронирования помещений <br /> заполните форму</Description>
      <Form />
      <Disclaimer>Это дисклеймер, который есть во всех формах</Disclaimer>
    </FormBlock>
  </MainContainer>
);

export default App;
