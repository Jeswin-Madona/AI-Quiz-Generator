import api from "./api";

export const getQuizQuestions = async (quizId) => {
    const response = await api.get(`/webhook-test/get-quiz?id=${quizId}`);
    return response.data;
};