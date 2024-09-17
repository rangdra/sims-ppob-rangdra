import { RcFile, UploadFile } from "antd/es/upload";
import { httpRequest } from "../../../helpers/api";
import { removeToken, saveToken } from "../../../helpers/auth";
import {
  ILoginRequest,
  IRegistrationRequest,
  IUpdateUserRequest,
} from "../../../types/user.type";

const register = async (userData: IRegistrationRequest) => {
  const res = await httpRequest.post("/registration", userData);

  return res.data;
};

const login = async (userData: ILoginRequest) => {
  const res = await httpRequest.post("/login", userData);
  let resProfile;
  if (res.data) {
    if (typeof window !== "undefined") {
      saveToken(res.data.data.token);
    }

    resProfile = await httpRequest.get("/profile");
    if (resProfile.data) {
      localStorage.setItem("user", JSON.stringify(resProfile.data.data));
    }
  }

  return {
    ...res.data,
    user: resProfile?.data?.data,
  };
};

const getBalance = async () => {
  const res = await httpRequest.get("/balance");

  return res.data;
};

const getProfile = async () => {
  let resProfile = await httpRequest.get("/profile");

  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(resProfile?.data?.data));
  }

  return resProfile?.data;
};

const updateProfile = async (userData: IUpdateUserRequest) => {
  const res = await httpRequest.put("/profile/update", userData);

  await getProfile();

  return res.data;
};

export const uploadProfile = async (
  file: File | Blob | RcFile | UploadFile<any>
) => {
  let formData = new FormData();
  formData.append("file", file as RcFile);

  const res = await httpRequest.put("/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  await getProfile();

  return res.data;
};

const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    removeToken();
  }
};

const authService = {
  register,
  login,
  getBalance,
  logout,
  updateProfile,
  uploadProfile,
  getProfile,
};

export default authService;
