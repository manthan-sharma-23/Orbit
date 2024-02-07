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
export const RESOURCE_FOUND_SUCCESSFULLY = {
  code: 200,
  action: { message: "SUCCESS --- Resource found successfully" },
};

export const UNAUTHORIZED_ACCESS = {
  code: 401,
  action: {
    message:
      "UNAUTHORIZED ACCESS --- You are not authorized to access this resource",
  },
};

export const FORBIDDEN_RESOURCE = {
  code: 403,
  action: {
    message:
      "FORBIDDEN RESOURCE --- You do not have permission to access this resource",
  },
};
export const RESOURCE_NOT_FOUND = {
  code: 404,
  action: { message: "NOT FOUND --- The requested resource was not found" },
};

export const RESOURCE_UPDATED_SUCCESSFULLY = {
  code: 200,
  action: { message: "SUCCESS --- Resource updated successfully" },
};

export const RESOURCE_DELETED_SUCCESSFULLY = {
  code: 200,
  action: { message: "SUCCESS --- Resource deleted successfully" },
};

export const RESOURCE_NOT_MODIFIED = {
  code: 304,
  action: { message: "NOT MODIFIED --- Resource not modified" },
};

export const REQUEST_TIMEOUT = {
  code: 408,
  action: {
    message: "REQUEST TIMEOUT --- The request took too long to process",
  },
};

export const CONFLICT_DETECTED = {
  code: 409,
  action: {
    message:
      "CONFLICT DETECTED --- Conflict detected while processing the request",
  },
};

export const RESOURCE_CREATED_SUCCESSFULLY = {
  code: 201,
  action: { message: "SUCCESS --- Resource created successfully" },
};

export const VALIDATION_ERROR = {
  code: 422,
  action: { message: "VALIDATION ERROR --- Request failed validation" },
};

export const SERVER_UNAVAILABLE = {
  code: 503,
  action: {
    message: "SERVER UNAVAILABLE --- The server is currently unavailable",
  },
};

export const INVALID_TOKEN = {
  code: 401,
  action: { message: "INVALID TOKEN --- The provided token is invalid" },
};

export const TOKEN_EXPIRED = {
  code: 401,
  action: { message: "TOKEN EXPIRED --- The provided token has expired" },
};

export const MISSING_PARAMETERS = {
  code: 400,
  action: { message: "BAD REQUEST --- Required parameters are missing" },
};

export const DATABASE_ERROR = {
  code: 500,
  action: {
    message:
      "DATABASE ERROR --- An error occurred while accessing the database",
  },
};

export const SERVICE_UNAVAILABLE = {
  code: 503,
  action: {
    message:
      "SERVICE UNAVAILABLE --- The requested service is temporarily unavailable",
  },
};

export const NOT_IMPLEMENTED = {
  code: 501,
  action: {
    message:
      "NOT IMPLEMENTED --- The requested functionality is not implemented",
  },
};

export const INVALID_CREDENTIALS = {
  code: 401,
  action: {
    message: "INVALID CREDENTIALS --- The provided credentials are invalid",
  },
};

export const ACCESS_FORBIDDEN = {
  code: 403,
  action: {
    message:
      "ACCESS FORBIDDEN --- Access to the requested resource is forbidden",
  },
};

export const SERVER_ERROR = {
  code: 500,
  action: { message: "SERVER ERROR --- An internal server error occurred" },
};

export const TOO_MANY_REQUESTS = {
  code: 429,
  action: {
    message: "TOO MANY REQUESTS --- Too many requests have been received",
  },
};

export const RESOURCE_CONFLICT = {
  code: 409,
  action: {
    message:
      "CONFLICT --- There was a conflict with the current state of the resource",
  },
};

export const MESSAGE_SENT_SUCCESSFULLY = {
  code: 200, // You may adjust the code as per your application's status codes
  action: { message: "SUCCESS --- Message sent successfully" },
};
