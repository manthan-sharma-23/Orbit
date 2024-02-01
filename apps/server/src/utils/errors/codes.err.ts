export const INTERNAL_SERVER_ERROR = {
  code: 500,
  action: { message: "INTERNAL SERVER ERROR --- Something went wrong" },
};

export const USER_ALREADY_EXISTS = {
  code: 403,
  action: { message: "USER ALREADY EXISTS --- User already exists" },
};

export const USER_CREATED_SUCCESSFULLY = {
  code: 201,
  action: { message: "SUCCESS --- User created successfully" },
};

export const INVALID_INPUTS = {
  code: 400,
  action: { message: "BAD REQUEST --- Invalid Inputs found" },
};

export const DONT_EXISTS = {
  code: 404,
  action: { message: "NOT FOUND --- Data not found in store" },
};

export const USER_LOGGED_IN_SUCCESSFULLY = {
  code: 200,
  action: { message: "SUCCESS -- LogIn Success" },
};
