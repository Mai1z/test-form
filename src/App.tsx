import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from './redux/store';
import { Form } from './components/Form';
import { fetchItems } from './redux/ActionsCreator';
import Success from './components/svgs/Success';
import Error from './components/svgs/Error';
import { formSlice } from './redux/reducers/FormSlice';

const MainContainer = styled.section<{ itemsBg: { desktop?: string, mobile?: string } }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(${({ itemsBg }) => itemsBg.desktop}) no-repeat;
  background-size: cover;
  @media (max-width: 768px) {
    height: 100%;
    background: url(${({ itemsBg }) => itemsBg.mobile}) no-repeat;
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
  min-height: 648px;
  padding: 56px 56px 32px;
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
    border-radius: 0;
    padding: 56px 16px 32px;
    margin-bottom: -2px;
  }
`;

const StatusBlock = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
`;

const StatusIconBlock = styled.div<{ status?: string }>`
  width: 72px;
  height: 72px;
  margin-bottom: 34px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ status, theme }) => (status === 'success' ? theme.secondaryExtraLight : theme.statusErrorBg)} 
`;

const Title = styled.span<{ status?: boolean }>`
  font-size: 44px;
  line-height: 48px;
  font-weight: 600;
  margin-bottom: ${({ status }) => (status ? 0 : '16px')};
  text-align: center;
  padding: ${(props) => (props.status ? '0 20px' : 0)};
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

const App: React.FC = () => {
  const currTime = Number(new Date().toLocaleTimeString().slice(0, 2));
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.itemReducer);
  const { status } = useSelector((state: RootState) => state.formReducer);
  const randomItems = items[Math.floor(Math.random() * items.length)];
  const { clearStatus } = formSlice.actions;
  const [itemsBg, setItemsBg] = useState({});

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    const bgImages = {
      desktop: randomItems?.desktop,
      mobile: randomItems?.mobile,
    };
    setItemsBg(bgImages);
  }, [items]);

  return (
    <MainContainer itemsBg={itemsBg}>
      <FormBlock>
        {!status ? (
          <>
            <Title>
              {(currTime >= 0 && currTime < 6) && 'Доброй ночи'}
              {(currTime >= 6 && currTime < 12) && 'Доброе утро'}
              {(currTime >= 12 && currTime < 18) && 'Добрый день'}
              {(currTime >= 18 && currTime < 24) && 'Добрый вечер'}
            </Title>
            <Description>Для бронирования помещений <br /> заполните форму</Description>
            <Form />
            <Disclaimer>Это дисклеймер, который есть во всех формах</Disclaimer>
          </>
        ) : (
          <StatusBlock onClick={() => { dispatch(clearStatus()); }}>
            <StatusIconBlock status={status}>
              {status === 'success' && <Success />}
              {status === 'error' && <Error />}
            </StatusIconBlock>
            <Title status>
              {status === 'success' && 'Ваша заявка отправлена'}
              {status === 'error' && 'Ошибка. Попробуйте позже'}
            </Title>
          </StatusBlock>
        )}
      </FormBlock>
    </MainContainer>
  );
};

export default App;
