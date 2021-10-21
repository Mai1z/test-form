import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

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
  p {
    font-size: 11px;
    line-height: 14px;
    text-align: right;
    color: ${({ theme }) => theme.statusError};
  }
  p ~ input {
    border: 2px solid ${({ theme }) => theme.statusError};
    &:placeholder-shown {
      border: 2px solid ${({ theme }) => theme.statusError};
      color: ${({ theme }) => theme.statusError};
      background: ${({ theme }) => theme.statusErrorBg};
    }
    &::placeholder {
      color: ${({ theme }) => theme.statusError};
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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 24px;
`;

type Inputs = {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  flatsCount: number
};

export const Form: React.FC = () => {
  const {
    register, handleSubmit, watch, control, formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [flatsCount, setFlatsCount] = useState(0);

  const validNumberName = (value: number, words: string[]) => {
    const newValue = Math.abs(value) % 100;
    const num = newValue % 10;
    if (newValue > 10 && newValue < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num === 1) return words[0];
    return words[2];
  };

  const watchFlatsCount = watch('flatsCount');

  useEffect(() => {
    setFlatsCount(watchFlatsCount);
  }, [watchFlatsCount]);

  const clearTel = (tel: string) => tel.replace(/[^0-9]/g, '');

  const isNotFilledTel = (v: string) => {
    const clearedTel = clearTel(v);
    return clearedTel.length >= 11;
  };

  return (
    <BookingForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <InputBlock>
          <InputWrapper>
            {errors.firstName && <p>Заполните поле</p>}
            <input
              placeholder="Ваше имя"
              id="firstName"
              {...register('firstName', { required: true })}
            />
            <label htmlFor="name">Имя</label>
          </InputWrapper>
        </InputBlock>
        <InputBlock>
          <InputWrapper>
            {errors.lastName && <p>Заполните поле</p>}
            <input
              placeholder="Ваша фамилия"
              id="lastName"
              {...register('lastName', { required: true })}
            />
            <label htmlFor="surname">Фамилия</label>
          </InputWrapper>
        </InputBlock>
      </Wrapper>
      <InputBlock>
        <InputWrapper>
          {errors.phone && <p>Заполните поле</p>}
          <Controller
            control={control}
            name="phone"
            rules={{ required: true, validate: { inputTelRequired: isNotFilledTel } }}
            render={({ field: { onChange, name, value } }) => (
              <NumberFormat
                name={name}
                placeholder="Телефон"
                format="+7 (###) ###-##-##"
                mask="_"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <label htmlFor="phone">Телефон</label>
        </InputWrapper>
      </InputBlock>
      <InputBlock>
        <InputWrapper>
          {errors.email && <p>Заполните поле</p>}
          <input
            placeholder="E-mail"
            id="email"
            {...register('email', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
          <label htmlFor="email">E-mail</label>
        </InputWrapper>
      </InputBlock>
      <InputBlock>
        <InputWrapper>
          {errors.flatsCount && <p>Заполните поле</p>}
          <Controller
            control={control}
            name="flatsCount"
            rules={{ required: true }}
            render={({ field: { onChange, name, value } }) => (
              <NumberFormat
                name={name}
                placeholder="Количество комнат"
                value={value}
                allowNegative={false}
                decimalScale={0}
                onChange={onChange}
              />
            )}
          />
          <label htmlFor="flatsCount">Количество помещений</label>
        </InputWrapper>
      </InputBlock>
      <Button type="submit">Забронировать {flatsCount} {flatsCount && validNumberName(Number(flatsCount), ['помещение', 'помещения', 'помещений'])} </Button>
    </BookingForm>
  );
};
