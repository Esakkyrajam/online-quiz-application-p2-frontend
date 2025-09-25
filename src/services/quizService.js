import { getAPI, postAPI, patchAPI, deleteAPI } from "../commons/api";
import { ENDPOINTS } from "../config/endpoints";
import { mockQuizzes } from "../mocks/mockQuizzes";

const USE_MOCK = false; // Set to true to use mock data first

export const getQuizzes = async () => {
  if (USE_MOCK) return mockQuizzes;

  const { data } = await getAPI.get(ENDPOINTS.QUIZ.LIST);
  return data;
};

export const createQuiz = async (quizData) => {
  if (USE_MOCK)
    return { status: 200, message: "[MOCK] Quiz created", data: quizData };

  const response = await postAPI(ENDPOINTS.QUIZ.CREATE, quizData);
  return response.data;
};

export const takeQuiz = async (id) => {
  if (USE_MOCK) {
    const quiz = mockQuizzes.find((q) => q.id.toString() === id.toString());
    return quiz || null;
  }
  const { data } = await getAPI.get(ENDPOINTS.QUIZ.TAKE(id));
  return data;
};

export const submitQuiz = async (id, answers) => {
  if (USE_MOCK) {
    const quiz = mockQuizzes.find((q) => q.id.toString() === id.toString());
    let score = 0;
    quiz?.questions.forEach((q) => {
      if (answers[q.id] === q.correct) score++;
    });
    return { status: 200, message: "[MOCK] Quiz submitted", score };
  }

  const { data } = await postAPI.post(ENDPOINTS.QUIZ.SUBMIT(id), answers);
  return data;
};
