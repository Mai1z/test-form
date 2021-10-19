import React, { useState } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

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
  input {
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
      opacity: 1;
    }
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
  &:disabled {
    background: ${({ theme }) => theme.white};
    border: 1px solid ${({ theme }) => theme.secondaryLight};
    color: ${({ theme }) => theme.grayLight};
  }
`;

export const Form: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [flatsCount, setFlatsCount] = useState('');

  const disableCheck = !email || !flatsCount || !firstName || !phone || !lastName;
  const time = Date.now();

  const validNumberName = (value: number, words: string[]) => {
    const newValue = Math.abs(value) % 100;
    const num = newValue % 10;
    if (newValue > 10 && newValue < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      user: {
        firstName, lastName, email, phone,
      },
      order: { flatsCount, time },
    });
  };

  return (
    <BookingForm onSubmit={handleSubmit}>
      <Wrapper>
        <InputBlock>
          <input
            type="text"
            placeholder="Ваше имя"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="name">Имя</label>
        </InputBlock>
        <InputBlock>
          <input
            type="text"
            placeholder="Ваша фамилия"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="surname">Фамилия</label>
        </InputBlock>
      </Wrapper>
      <InputBlock>
        <input
          type="text"
          placeholder="Телефон"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="phone">Телефон</label>
      </InputBlock>
      <InputBlock>
        <input
          type="text"
          placeholder="E-mail"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="email">E-mail</label>
      </InputBlock>
      <InputBlock>
        <NumberFormat
          placeholder="Количество помещений"
          id="rooms"
          allowNegative={false}
          decimalScale={0}
          value={flatsCount}
          onChange={(e) => setFlatsCount(e.target.value)}
        />
        <label htmlFor="rooms">Количество помещений</label>
      </InputBlock>
      <Button type="submit" disabled={disableCheck}>Забронировать {flatsCount} {flatsCount && validNumberName(Number(flatsCount), ['помещение', 'помещения', 'помещений'])} </Button>
    </BookingForm>
  );
};
