import moment from "moment";

export class MainNewsModel {
    id: number;
    img: string;
    theme?: string;
    date?: string;
    img_medium: string;
    img_large: string;
    img_small: string;
    likes?: number;
    comments?: number;
    title: string;
    is_liked: boolean;
    description: string;
  
    constructor(params?: IMainNewsModel) {
      this.id = params?.id || 0;
      this.img = params?.title_image_url || "";
      this.img_medium = params?.title_image_medium_url || "";
      this.img_small = params?.title_image_small_url || "";
      this.img_large = params?.title_image_large_url || "";
      this.theme = params?.tags[0] || "";
      this.date = params?.published_date || "";
      this.likes = params?.like_count || 0;
      this.is_liked = params?.is_liked || false;
      this.comments = params?.comment_count || 0;
      this.title = params?.title || "";
      this.description = params?.description || "";
    }
  
    get shortDescription() {
      return this.description.length < 70 ?  this.description : `${this.description.slice(0, 70)}...`
    }
    get shortTitle() {
      return this.title.length < 50 ?  this.title : `${this.title.slice(0, 50)}...`
    }
    get newsDate() {
      return moment(this.date).format("DD.MM.YYYY");
    }
  
    get newsTime() {
      return moment(this.date).format("HH:mm");
    }
  }
  
  interface IMainNewsModel {
    id: number;
    title_image_url: string;
    title_image_medium_url: string;
    title_image_large_url: string;
    title_image_small_url: string;
    tags: string[];
    is_liked: boolean;
    published_date?: string;
    like_count: number;
    comment_count: number;
    title: string;
    description: string;
  }