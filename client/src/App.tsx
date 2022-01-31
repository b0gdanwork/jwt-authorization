import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App:FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers () {
    try {
      const response = await UserService.GetUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return  <div>Грузим...</div>
  }

  if (!store.isAuth) {
    return  <LoginForm />
  }

  return (
    <div>
      {store.isAuth? `Пользователь авторизован ${store.user.email}` : 'Пользователь не авторизован'}
      <button onClick={store.logout}>Выйти</button>
      <div>
        <button onClick={getUsers}>Получить пользователей</button>
        {users.map(user=>{
          return <div key={user.email}>{user.email}</div>
        })}
      </div>
    </div>
  );
}

export default observer(App);