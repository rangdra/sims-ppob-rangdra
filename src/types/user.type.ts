export interface IRegistrationRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ILoginRequest
  extends Omit<IRegistrationRequest, "first_name" | "last_name"> {}

export interface IUser extends Omit<IRegistrationRequest, "password"> {
  profile_image: string;
  balance: number;
}

export interface IUpdateUserRequest
  extends Pick<IRegistrationRequest, "first_name" | "last_name"> {}
