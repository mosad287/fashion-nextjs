export interface IProfileInfo {
  role: string;
  active: boolean;
  wishlist: unknown[];
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: unknown[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordResetCode: string;
  passwordResetExpires: string;
  resetCodeVerified: boolean;
}
