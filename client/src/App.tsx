import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";

import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

import {Layout, Spin} from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './App.css'

import CustomHeader from "./components/CustomHeader"
import CustomFooter from "./components/CustomFooter"
import {Content} from "antd/es/layout/layout";
import ApiRoute from "./components/ApiRoute";


const App:FC = () => {

  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  // useEffect(()=>{
  //   if (localStorage.getItem('token')) {
  //     store.checkAuth()
  //   }
  // }, [])

  async function getUsers () {
    try {
      const response = await UserService.GetUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return  <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
  }

  const renderUsers = () => {
    return users.map(user=>{
      return <div key={user.id}>{user.email}</div>
    })
  }

  return (
    <Layout>
      <CustomHeader />
      <Content>
        <ApiRoute />
      </Content>
      <CustomFooter />
    </Layout>
  );
}

export default observer(App);



//<div>
//           <button onClick={getUsers}>Получить пользователей</button>
//           {renderUsers()}
//         </div>