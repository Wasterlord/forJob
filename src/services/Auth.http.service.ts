// @ts-ignore
import { AbstractHttpService } from "./Abstract.http.service";

class AuthHttpService extends AbstractHttpService {
  private static _instance: AuthHttpService;
  private constructor() {
    super();
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public login(phone: number, password: string): Promise<any> {
    return this.http.post("/auth/login", {
      phone: phone,
      password: password
    });
  }
  public registration(phone: number, password: string): Promise<any> {
    return this.http.post("/registration/register", {
      phone: phone,
      password: password,
    });
  }
  public logout(): Promise<any> {
    return this.http.post("/auth/logout");
  }
}

export default AuthHttpService.Instance;
