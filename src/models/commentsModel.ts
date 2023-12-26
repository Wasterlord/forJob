export class CommentsModel {
  id: number;
  text: string;
  icon: string;
  role: string;
  likes: number;
  author: string;
  parentId: number;

  constructor(params?: ICommentsModel) {
    this.id = params?.id || 0;
    this.text = params?.text || "";
    this.icon = params?.icon || "";
    this.role = params?.role || "";
    this.likes = params?.likes || 0;
    this.author = params?.author || "";
    this.parentId = params?.parentId || 0;
  }
}

interface ICommentsModel {
  id: number;
  text: string;
  icon: string;
  role: string;
  likes: number;
  author: string;
  parentId: number;
}
