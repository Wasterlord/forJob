import { CommentsModel } from './commentsModel'
export class NewsModel {
  id: number;
  img: string;
  theme?: string;
  date?: string;
  time?: string;
  likes?: number;
  comments?: CommentsModel[];
  title: string;
  description: string;
  content: any;

  constructor(params?: INewsModel) {
    this.id = params?.id || 0;
    this.img = params?.img || "";
    this.theme = params?.theme || "";
    this.date = params?.date || "";
    this.time = params?.time || "";
    this.likes = params?.likes || 0;
    this.comments = params?.comments || [];
    this.title = params?.time || "";
    this.description = params?.time || "";
    this.content = params?.content || "";
  }

  get commentsCount() {
    return this.comments?.length;
  }
  get shortDescription() {
    return this.description.length < 40 ?  this.description : `${this.description.slice(0, 40)}...`
  }
  get shortTitle() {
    return this.title.length < 20 ?  this.title : `${this.title.slice(0, 20)}...`
  }
}

interface INewsModel {
  id: number;
  img: string;
  theme: string;
  date?: string;
  time?: string;
  likes?: number;
  comments?: CommentsModel[];
  title: string;
  description: string;
  content: any;
}
