import { RcFile } from "antd/es/upload";
import { UploadFile } from "antd/lib";

export function isImageMoreThanXKB(
  file: File | Blob | RcFile | UploadFile<any>,
  maxFileSizeInKb: number
) {
  const res = bytesToKB(file.size as number) > maxFileSizeInKb;
  return res;
}

export function bytesToKB(bytes: number) {
  return bytes / 1024;
}
