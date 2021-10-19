import React from 'react';
import styled from 'styled-components';

const BookingForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  > div {
    &:first-child {
      margin-right: 32px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    > div {
      &:first-child {
        margin-right: 0;
      }
    }
  }
`;

const InputBlock = styled.div`
  position: relative;
  label {
    position: absolute;
    font-size: 12px;
    color: ${({ theme }) => theme.secondaryMedium};
    left: 17px;
    top: 8px;
    line-height: 16px;
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.secondaryLight};
  border-radius: 4px;
  padding: 24px 16px 8px;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.grayDark};
  text-overflow: ellipsis;
  &:-webkit-autofill {
    transition: all 5000s ease-in-out 0s;
  }
  &:placeholder-shown {
    background: ${({ theme }) => theme.secondaryExtraLight};
    border: 1px solid transparent;
    padding: 16px;
    ~ label {
      display: none;
    }
  }
  &::placeholder {
    color: ${({ theme }) => theme.grayDark};
  }
`;

const Button = styled.button`
  border-radius: 4px;
  padding: 18px 40px;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  border: none;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.primary};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primaryDark};
  }
  &:active {
    background: ${({ theme }) => theme.primaryExtraDark};
  }
`;

export const Form: React.FC = () => {
  return (
    <BookingForm>
      <Wrapper>
        <InputBlock>
          <Input type="text" placeholder="Ваше имя" id="name" />
          <label htmlFor="name">Имя</label>
        </InputBlock>
        <InputBlock>
          <Input type="text" placeholder="Ваша фамилия" id="surname" />
          <label htmlFor="surname">Фамилия</label>
        </InputBlock>
      </Wrapper>
      <InputBlock>
        <Input type="number" placeholder="Телефон" id="mob-phone" />
        <label htmlFor="mob-phone">Телефон</label>
      </InputBlock>
      <InputBlock>
        <Input type="email" placeholder="E-mail" id="e-mail" />
        <label htmlFor="e-mail">E-mail</label>
      </InputBlock>
      <InputBlock>
        <Input type="number" placeholder="Количество помещений" id="rooms" />
        <label htmlFor="rooms">Количество помещений</label>
      </InputBlock>
      <Button type="submit">Забронировать</Button>
    </BookingForm>
  );
};
