import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const LoginForm:FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  let loginClick = () => {
    store.login(email, password)
  }

  let registrationClick = () => {
    console.log('reg')
    store.registration(email, password)
  }

  return (
    <div>
      <input
        placeholder={'Введите email'}
        type="email"
        value={email}
        onChange={e=>setEmail(e.target.value)}
      />
      <input
        placeholder={'Введите email'}
        type="text"
        value={password}
        onChange={e=>setPassword(e.target.value)}
      />
      <button
        onClick={loginClick}
      >
        Логин
      </button>
      <button
        onClick={registrationClick}
      >
        Регистрация
      </button>
    </div>
  );
};

export default observer(LoginForm);