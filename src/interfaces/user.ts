export interface IUserRegester {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
