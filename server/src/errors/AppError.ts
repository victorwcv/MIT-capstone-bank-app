export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// 400
export class BadRequestError extends AppError {
  constructor(message: string, code = "BAD_REQUEST") {
    super(message, 400, code);
  }
}

// 404
export class NotFoundError extends AppError {
  constructor(message: string, code = "NOT_FOUND") {
    super(message, 404, code);
  }
}

// 409
export class ConflictError extends AppError {
  constructor(message: string, code = "CONFLICT") {
    super(message, 409, code);
  }
}

// 401
export class UnauthorizedError extends AppError {
  constructor(message: string, code = "UNAUTHORIZED") {
    super(message, 401, code);
  }
}
