import { ChangeEvent } from "react";

export interface FormTypes {
  id: string;
  type: string;
  name: string;
  value: string;
  placeholder: string;
  error: boolean;
  hidden?: boolean;
  errorText: string | boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
