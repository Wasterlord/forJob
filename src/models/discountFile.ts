export class discountFile {
    fileId: number;
    name: string;
    date: string;
    ext: string;
    id: number;
    size: number;
  
    constructor(params?: IdiscountFile) {
      this.fileId = params?.file_id || 0;
      this.name = params?.name || "";
      this.date = params?.date || "";
      this.ext = params?.ext || "";
      this.id = params?.id || 0;
      this.size = params?.size || 0;
    }
  }
  
  export interface IdiscountFile {
    file_id: number;
    name: string;
    date: string;
    ext: string;
    id: number;
    size: number;
  }
  