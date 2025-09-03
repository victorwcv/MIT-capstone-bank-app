interface Meta {
  page?: number;
  limit?: number;
  total?: number;
  [key: string]: any;
}

export const successResponse = <T>(data: T, message = "Request successful", meta?: Meta) => {
  return {
    success: true,
    message,
    data,
    ...(meta ? { meta } : {}),
  };
};
