export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  QUIZ: {
    CREATE: "/admin/quizzes",
    LIST_ADMIN: "/admin/quizzes",
    GET_ADMIN: (id) => `/admin/quizzes/${id}`,
    UPDATE: (id) => `/admin/quizzes/${id}`,
    DELETE: (id) => `/admin/quizzes/${id}`,
    LIST_PARTICIPANT: "/participant/quizzes",
    GET_PARTICIPANT: (id) => `/participant/quizzes/${id}`,
    SUBMIT: (id) => `/participant/quizzes/${id}/submit`,
  },
  RESULT: {
    GET: (userId) => `/results/${userId}`,
  },
};
