import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../api";

export default class Store {
  user = {} as IUser
  isAuth:boolean = false
  isLoading:boolean = false
  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool:boolean) {
    this.isAuth = bool
  }

  setIsLoading(bool:boolean) {
    this.isLoading = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  async login(email:string, password:string) {
    try {
      const response = await AuthService.login(email,password)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  async registration(email:string, password:string) {
    try {
      const response = await AuthService.registration(email, password)
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout()
      localStorage.removeItem("token")
      this.setAuth(false)
      this.setUser({} as IUser)
    } catch (e) {
      console.log(e)
    }
  }

  async checkAuth() {
    this.setIsLoading(true)
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem("token", response.data.accessToken)
      this.setAuth(true)
      this.setUser(response.data.user)
    } catch (e) {
      console.log(e)
    } finally {
      this.setIsLoading(false)
    }
  }
}