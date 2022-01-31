import React from "react";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import UsersList from "../components/UsersList";

interface IRoute {
  path: string,
  component: React.ComponentType
}

export enum RouteName {
  LOGIN = '/login',
  REGISTRATION = '/registration',
  USERS = '/users'
}

export const publicRouters:IRoute[] = [
  {
    path: RouteName.LOGIN,
    component: LoginForm
  },
  {
    path: RouteName.REGISTRATION,
    component: RegistrationForm
  }
]

export const privateRouters:IRoute[] = [
  {
    path: RouteName.USERS,
    component: UsersList
  }
]