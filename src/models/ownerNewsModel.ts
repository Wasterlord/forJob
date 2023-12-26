import moment from "moment";

export class OwnerNewsModel {
  id: number;
  img: string;
  theme?: string;
  date?: string;
  likes?: number;
  comments?: number;
  title: string;
  is_liked: boolean;
  name?: string;
  role?: string;

  constructor(params?: IOwnerNewsModel) {
    this.id = params?.id || 0;
    this.img = params?.title_image_large_url || "";
    this.theme = params?.tags[0] || "";
    this.date = params?.published_date || "";
    this.name = params?.owner_name || "";
    this.role = params?.owner_position || "";
    this.likes = params?.like_count || 0;
    this.is_liked = params?.is_liked || false;
    this.comments = params?.comment_count || 0;
    this.title = params?.title || "";
  }

  get shortTitle() {
    return this.title.length < 20
      ? this.title
      : `${this.title.slice(0, 20)}...`;
  }
  get newsDate() {
    return moment(this.date).format("DD.MM.YYYY");
  }

  get newsTime() {
    return moment(this.date).format("HH:mm");
  }
}

interface IOwnerNewsModel {
  id: number;
  title_image_large_url: string;
  tags: string[];
  is_liked: boolean;
  published_date?: string;
  owner_name?: string;
  owner_position?: string;
  like_count: number;
  comment_count: number;
  title: string;
  description: string;
}
