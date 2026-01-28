import axios, { AxiosError } from 'axios';

export type ContentType =
  | 'application/json'
  | 'multipart/form-data'
  | 'application/x-www-form-urlencoded';

interface FetcherOptions extends RequestInit {
  contentType?: ContentType;
}

export async function apiClient<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const {
    contentType = 'application/json',
    headers: customHeaders,
    ...restOptions
  } = options;

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = `${baseURL}${endpoint}`;
  const isFormData = restOptions.body instanceof FormData;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  if (!isFormData && contentType !== 'multipart/form-data') {
    headers['Content-Type'] = contentType;
  }

  // if (typeof window !== 'undefined') {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) headers['Authorization'] = `Bearer ${token}`;
  // }

  try {
    const res = await fetch(url, {
      ...restOptions,
      headers,
      credentials: 'include',
    });

    if (!res.ok) {
      const status = res.status;
      const errorBody = await res.json().catch(() => ({}));
      const message = errorBody.message || 'Something went wrong';

      console.log(status);
      

      switch (status) {
        case 401:
          // forceLogout();
          break;
        case 403:
          // toast.error('Forbidden: You do not have access.');
          break;
        case 404:
          // toast.warning('Not Found: The resource does not exist.');
          break;
        case 500:
          // toast.error('Server Error: Please try again later.');
          break;
        default:
          // toast.error(message);
      }

      throw new Error(message);
    }

    return res.json();
  } catch (error: unknown) {
    if (
      error instanceof TypeError ||
      (typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        (error as { message: string }).message === 'Failed to fetch')
    ) {
      // toast.error('Network error. Please try again.');
    }

    throw error;
  }
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    if (typeof window !== 'undefined') {
      // const token = store.getState().authData?.authToken;
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;
      const errorBody = error.response.data as { message?: string };
      const message = errorBody?.message || 'Something went wrong';

      switch (status) {
        case 401:
          // await forceLogout(); // logoutAndRedirect();
          break;
        case 403:
          // toast.error('Forbidden: You do not have access.');
          break;
        case 404:
          // toast.warning('Not Found: The resource does not exist.');
          break;
        case 500:
          // toast.error('Server Error: Please try again later.');
          break;
        default:
        // toast.error(message);
      }
    } else if (error.request) {
      // Network error
      // toast.error('Network error. Please try again.');
    } else {
      // toast.error('An unexpected error occurred.');
    }

    return Promise.reject(error);
  }
);

export { axiosInstance };
