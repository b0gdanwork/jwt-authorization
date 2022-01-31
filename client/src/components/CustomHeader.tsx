import React, {useContext} from 'react';
import {Button, Layout, Typography } from 'antd'
import {Context} from "../index";

const CustomHeader = () => {
  const {store} = useContext(Context)

  return (
    <Layout.Header
    >
      <Typography.Title
        style={
          {
            color: '#fff',
            margin: 0
          }
        }
      >
        JWT
      </Typography.Title>
      {
        store.isAuth ?
          <Button
            type="primary"
            onClick={store.logout}
          >
            Выйти
          </Button> : ''
      }
    </Layout.Header>
  );
};

export default CustomHeader;