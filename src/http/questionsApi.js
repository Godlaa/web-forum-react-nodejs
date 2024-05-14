import { $host } from "./index";

export const createQuestion = async (section) => {
    const {data} = await $host.post('api/question', section);
    return data;
}

export const fetchQuestions = async () => {
    const {data}  = await $host.get('api/question');
    return data;
}

export const fetchOneQuestion = async (id) => {
    const {data}  = await $host.get('api/question/' + id);
    return data;
}

export const fetchQuestionsBySectionId = async (id) => {
    const {data}  = await $host.get('api/question/?sectionId=' + id);
    return data;
}