import axios, {
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
} from "axios";
// @ts-ignore
import { store } from "../store/index";
import router from "@/router";

export class AbstractHttpService {
  public http: AxiosInstance;

  public authRoutes = ["/registration/register", "/auth/login"];
  protected root = `${window.location.protocol}//${window.location.host}`;

  public headers: any = {
    "Content-Type": "multipart/form-data",
  };

  public httpTimeout: number = 150000;

  public constructor() {
    this.http = axios.create({
      baseURL: this.root,
      timeout: this.httpTimeout,
      withCredentials: false,
      headers: this.headers,
    });

    //REQUEST ITERCEPTOR
    this.createRequestIterceptor();

    //RESPONSE INTERCEPTOR
    this.createResponseInterceptor();
  }

  private createRequestIterceptor() {
    const interceptor = this.http.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const CancelToken = axios.CancelToken;
        if(config.data && config.data.avatar && config.data.avatar.size > 8000000) {
          store.commit("setErrorSize", true);
          store.commit("setError", "Максимальный размер файла - 8 Мбайт");
        }
        // if( config.data.size )
        // if (config.headers === undefined) {
        //   config.headers = {};
        // }
        // if (store.state.auth.token) {
        //   config.headers.Authorization = "Bearer " + store.state.auth.token;
        // } else {
        //   delete config.headers.Authorization;
        // }
        return {
          ...config,
          CancelToken: new CancelToken((cancel) =>
            cancel("Cancel repeated request")
          ),
        };
        // return config;
      },
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }
  private createResponseInterceptor() {
    const interceptor = this.http.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.success == true) {
          return response;
        } else throw this.handleError(response.data);
      }
    );
  }
  private handleError(error: any): Promise<any> {
    if (error.msg == "[WRONG_NUMBER]") {
      store.commit("setError", "Неверный номер");
    }  else if (error.msg == "Неизвестный пользователь") {
      store.commit("setError", "Неверная пара логин/пароль");
    } else if(error.msg == "Пожалуйста авторизируйтесь") {
      store.commit("removeUser");
    }
    else {
      store.commit("setError", error.msg);
    }

    return Promise.reject(error);
  }
}
