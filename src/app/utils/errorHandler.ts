import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message?: string;
  code?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export function isAxiosError(error: unknown): error is AxiosError<ApiErrorResponse> {
  return (error as AxiosError).isAxiosError === true;
}

export function handleApiError(error: unknown, defaultMessage = 'An error occurred'): string {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (message) return message;

    const errors = error.response?.data?.errors;
    if (errors) {
      const firstError = Object.values(errors)[0]?.[0];
      if (firstError) return firstError;
    }

    if (error.response?.status) {
      return getStatusMessage(error.response.status, defaultMessage);
    }

    if (error.message === 'Network Error') {
      return 'Network error. Please check your connection.';
    }
  }

  if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  return defaultMessage;
}

function getStatusMessage(status: number, defaultMessage: string): string {
  const statusMessages: Record<number, string> = {
    400: 'Invalid request. Please check your input.',
    401: 'Authentication required. Please log in.',
    403: 'You do not have permission to perform this action.',
    404: 'The requested resource was not found.',
    408: 'Request timeout. Please try again.',
    409: 'A conflict occurred. The resource may already exist.',
    422: 'Validation error. Please check your input.',
    429: 'Too many requests. Please try again later.',
    500: 'Server error. Please try again later.',
    502: 'Bad gateway. Please try again later.',
    503: 'Service unavailable. Please try again later.',
    504: 'Gateway timeout. Please try again later.',
  };

  return statusMessages[status] || defaultMessage;
}

export function getErrorCode(error: unknown): string | null {
  if (isAxiosError(error)) {
    return error.response?.data?.code || null;
  }
  return null;
}

export function isErrorCode(error: unknown, code: string): boolean {
  return getErrorCode(error) === code;
}

export function getValidationErrors(error: unknown): Record<string, string[]> | null {
  if (isAxiosError(error)) {
    return error.response?.data?.errors || null;
  }
  return null;
}

export function formatValidationErrors(error: unknown): string {
  const errors = getValidationErrors(error);
  if (!errors) return '';

  return Object.entries(errors)
    .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
    .join('; ');
}

export function createAsyncThunkErrorHandler<T = string>(
  defaultMessage?: string
): (error: unknown) => T {
  return (error: unknown) => {
    return handleApiError(error, defaultMessage) as T;
  };
}
