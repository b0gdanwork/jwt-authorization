import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Form, Input, Button, Card, Alert} from 'antd';

const LoginForm:FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  let loginClick = () => {
    store.login(email, password)
  }



  return (
    <Card
      title="Авторизация"
      bordered={false}
      style={{ width: 350 }}
    >
    <Form
      name="login-form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
    >
      <Form.Item
        label="Ваш Email:"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          placeholder={'Введите email'}
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Ваш пароль:"
        name="password"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input.Password
          placeholder={'Введите пароль'}
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
      </Form.Item>
      <Button
        type={"primary"}
        onClick={loginClick}
        style={{
          width: '100%'
        }}
      >
        Логин
      </Button>
    </Form>
      <div className={"have-account"}>
        Уже есть аккаунт?
        <Button type="link">
          Войти
        </Button>
      </div>
    </Card>
  );
};

export default observer(LoginForm);


// let registrationClick = () => {
//   store.registration(email, password)
// }