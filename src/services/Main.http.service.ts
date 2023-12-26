import { userModel } from "@/models/userModel";
import { AbstractHttpService } from "./Abstract.http.service";

class AuthHttpService extends AbstractHttpService {
  private static _instance: AuthHttpService;
  private constructor() {
    super();
  }
  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  public getNews(): Promise<any> {
    return this.http.get("/news");
  }
  public getSalesNews(): Promise<any> {
    return this.http.get("/discount/news");
  }
  public getNewsMain({ page, limit }): Promise<any> {
    return this.http.get("/news/main/?page=" + page + "&limit=" + limit);
  }
  public getNewsDaily({ page, limit }): Promise<any> {
    return this.http.get("/news/daily/?page=" + page + "&limit=" + limit);
  }
  public setProfile(data): Promise<any> {
    return this.http.post("/profile", data);
  }
  public getDetails(id: number): Promise<any> {
    return this.http.get("/news/detail?id=" + id);
  }
  public getOrdersHistory(page: number, limit: number ): Promise<any> {
    return this.http.get("/profile/orders/?page=" + page + '&limit=' + limit);
  }
  public getProfileFiles(): Promise<any> {
    return this.http.get("/profile/files");
  }
  public addComment(data: any): Promise<any> {
    return this.http.post("/news/addComment", data);
  }
  public editComment(data: any): Promise<any> {
    return this.http.post("/news/editComment", data);
  }
  public likeComment(comment_id: number): Promise<any> {
    return this.http.post("/news/likeComment", { comment_id: comment_id });
  }
  public likeNews(news_id: number): Promise<any> {
    return this.http.post("/news/likeNews", { news_id: news_id });
  }
  public myOrder(data: any): Promise<any> {
    return this.http.post("/discount/myOrder", data);
  }
  public friendOrder(data: number): Promise<any> {
    return this.http.post("/discount/friendOrder", data);
  }

  public getDiscountFiles(): Promise<any> {
    return this.http.get("/discount/listFiles");
  }

  public downloadFile(id: number): Promise<any> {
    return this.http.get("/discount/downloadFile?id=" + id);
  }

  public getProfile(): Promise<any> {
    return this.http.post("/profile");
  }
  public updateProfile(data: userModel): Promise<any> {
    return this.http.post("/profile/updateProfile", data);
  }
  public uploadAvatar(data: any): Promise<any> {
    return this.http.post("/profile/uploadAvatar", data);
  }

  
}

export default AuthHttpService.Instance;
