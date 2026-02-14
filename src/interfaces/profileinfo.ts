export interface IProfileInfo {
  role: string;
  active: boolean;
  wishlist: any[];
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordResetCode: string;
  passwordResetExpires: string;
  resetCodeVerified: boolean;
}
