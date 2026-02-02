
export const API_SIGN_UP = "/api/sign-up";
export const API_SIGN_IN = "/api/sign-in";
export const API_LOGOUT = "/api/users/logout"
export const API_REFRESH = "/api/refresh-token"

export const API_FORGOT_PASSWORD = "/api/forgot-password";
export const API_RESET_PASSWORD = "/api/reset-password";

export const API_GET_FILES = "/api/file";
export const API_UPLOAD_FILE = "/api/file/upload";
export const API_GET_FILE_META = (id) => `/api/file/${id}/meta`;
export const API_DOWNLOAD_FILE = (id) => `/api/file/${id}/raw`;
export const API_DELETE_FILE = (id) => `/api/file/${id}`;