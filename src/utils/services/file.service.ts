import configData from "../../assets/config/production.json"
import Caller from "../../core/objects/Caller"
import User from "../models/user.model"
import Login from "../models/user.model"

export default class FileService {
  api: any = {}
  constructor() {
    this.api = configData.API_ENDPOINTS.FILE
  }

  // get(url: string, ...rest: any[]) {
  //   let parms: any = {}
  //   if (rest && rest[0]) parms["type"] = rest[0]
  //   return Caller.get(url, parms)
  // }

  // post(data: User, param?: any) {
  //   return Caller.post(this.api.ADD, data, param)
  // }

  // update(data: User, param?: any) {
  //   return Caller.put(this.api.UPD + "/" + data.id, data, param)
  // }

  // delete(data: User) {
  //   return Caller.delete(this.api.DEL + "/" + data.id)
  // }

  uploadImage(file: any, documentType: string) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("return_type", documentType)
    formData.append("return_now", "1")
    formData.append("device", "web")
    return Caller.init()
      .post(this.api.UPLOAD, formData, {
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

  pillCounting(file: any) {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("device", "web")
    return Caller.init()
      .post(this.api.PILL_COUNTING, formData, {
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

  downloadFileExcel(sessionId: string) {
    return Caller.init().get(this.api.EXPORT, {
      params: {
        session_id: sessionId,
      },
      responseType: "blob",
    })
  }
}
