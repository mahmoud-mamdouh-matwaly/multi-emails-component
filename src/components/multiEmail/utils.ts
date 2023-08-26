import { Email } from "./types";

export const isValid = (
  email: string,
  handleError: (value: string) => void,
  arr: Email[]
) => {
  let error = null;

  if (isInList(email, arr)) {
    error = `${email} has already been added.`;
  }

  if (!isEmail(email)) {
    error = `${email} is not a valid email address.`;
  }

  if (error) {
    handleError(error);

    return false;
  }

  return true;
};

const isInList = (email: string, arr: Email[]) => {
  return arr?.find((item) => item.email?.includes(email));
};

const isEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
};
