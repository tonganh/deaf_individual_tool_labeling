import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import Cookies from "js-cookie"
import configData from "../../assets/config/production.json"
import { KEYS } from "../../constants"

class Caller {
  private apiToken: string | undefined = undefined
  private apiUrl: string | undefined = undefined
  private client: AxiosInstance | undefined

  constructor() {
    this.apiToken =
      Cookies.get(KEYS.ACCESS_TOKEN) ||
      localStorage.getItem(KEYS.ACCESS_TOKEN) ||
      undefined
    this.apiUrl = import.meta.env.VITE_API_URL || configData.HOST_API
  }

  init = () => {
    this.apiToken =
      Cookies.get(KEYS.ACCESS_TOKEN) ||
      localStorage.getItem(KEYS.ACCESS_TOKEN) ||
      configData.TOKEN

    let headers: AxiosRequestConfig["headers"] = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }

    if (this.apiToken != "") {
      headers.Authorization = `Bearer ${this.apiToken}`
    }

    this.client = axios.create({
      baseURL: this.apiUrl,
      timeout: KEYS.TIMEOUT,
      headers: headers,
    })

    return this.client
  }

  get(url: string, params?: any) {
    return this.init()
      .get(url, {
        params: params,
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  post(url: string, data: any, params?: any) {
    return this.init()
      .post(url, data, {
        params: params,
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  put(url: string, data: any, params?: any) {
    return this.init()
      .put(url, data, {
        params: params,
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  delete(url: string, params?: any) {
    return this.init()
      .delete(url, {
        params: params,
      })
      .then((response) => {
        return response
      })
      .catch((err) => {
        throw err
      })
  }

  uploadFile(url: string, file: File, documentType: string) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("return_type", documentType)
    formData.append("return_now", "1")
    return this.init()
      .post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        if (error.response) {
          throw error.response.data
        }
        if (error.data) {
          throw error.data
        } else {
          throw error
        }
      })
  }
}

export default new Caller()
