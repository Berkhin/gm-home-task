import axios from "axios";
import { Image } from "../types/Photo.types";

axios.defaults.baseURL = "/api";

export default class PhotoService {
  static async getAll(): Promise<Image[]> {
    const response = await axios.get("/available-images-and-regions");
    return response.data;
  }

  static async addNewImage(data: FormData) {
    return axios.post("/post-image", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  static async getRegionsById(id: string) {
    return axios.get(`/get/regions/${id}`);
  }

  static async getImageById(id: string) {
    return axios.get(`/get/image/${id}`);
  }

  static async deleteById(id: string) {
    return axios.get(`/delete/${id}`);
  }

  static async updateById(data: FormData) {
    return axios.post(`/update-regions`, data);
  }
}
