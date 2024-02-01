export interface FormType {
  name?: string;
  email: string;
  password: string;
}

export const InitialFormState: FormType = {
  name: "",
  email: "",
  password: "",
};
