// utils/responseHandler.ts

interface SuccessResponse {
  status: string;
  message: string;
  data?: any;
}

interface ErrorResponse {
  status: string;
  message: string;
  error?: any;
}

/**
 * Handles the success response
 * @param res - Express Response object
 * @param message - Success message
 * @param data - Optional data to include in the response
 * @param statusCode - HTTP status code (default is 200)
 */
export const handleSuccess = (res: any, message: string, data: any = {}, statusCode: number = 200) => {
  const response: SuccessResponse = {
    status: 'success',
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

/**
 * Handles the error response
 * @param res - Express Response object
 * @param message - Error message
 * @param error - Optional error object for debugging
 * @param statusCode - HTTP status code (default is 500)
 */
export const handleError = (res: any, message: string, error: any = {}, statusCode: number = 500) => {
  const response: ErrorResponse = {
    status: 'error',
    message,
    error,
  };
  return res.status(statusCode).json(response);
};
