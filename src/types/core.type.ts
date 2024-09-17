export interface BaseResponseListProps<T> {
  status: number;
  message: string;
  data: Array<T>;
}

export interface BaseResponseProps<T> {
  status: number;
  message: string;
  data: T;
}
