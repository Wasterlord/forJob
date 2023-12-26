export class userModel {
  userId: number;
  name: string;
  surname: string;
  middlename: string;
  basic_vacation: number;
  additional_vacation: number;
  department: string;
  avatar: string;
  position: string;
  phone_number: number | string;
  isAuthed: boolean;

  constructor(params?: IUserModel) {
    this.userId = params?.user_id || 0;
    this.name = params?.name || "";
    this.surname = params?.surname || "";
    this.middlename = params?.middlename || "";
    this.basic_vacation = params?.basic_vacation || 0;
    this.additional_vacation = params?.additional_vacation || 0;
    this.department = params?.department || "";
    this.avatar = params?.avatar || "";
    this.position = params?.position || "";
    this.phone_number = params?.phone_number || "";
    this.isAuthed = false;
  }
}

export interface IUserModel {
  user_id: number;
  name: string;
  surname: string;
  middlename: string;
  basic_vacation: number;
  additional_vacation: number;
  department: string;
  avatar: string;
  role: string;
  position: string;
  phone_number: number | string;
  isAuthed: boolean;
}
