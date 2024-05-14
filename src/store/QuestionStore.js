import { makeAutoObservable } from 'mobx';

export default class QuestionStore {
    constructor() {
        this._questions = [];
        this._selectedQuestion = {};
        this._selectedSection = {};
        this._answers = [];
        this._sections = [];
        makeAutoObservable(this);
    }

    setQuestions(questions){
        this._questions = questions;
    }

    get questions(){
        return this._questions;
    }

    setSelectedQuestion(question){
        this._selectedQuestion = question;
    }   

    get selectedQuestion(){
        return this._selectedQuestion;
    }

    setAnswers(answers){
        this._answers = answers;
    }
    get answers(){
        return this._answers;
    }

    setSections(sections){
        this._sections = sections;
    }

    get sections(){
        return this._sections;
    }

    setSelectedSection(section){
        this._selectedSection = section;
    }   

    get selectedSection(){
        return this._selectedSection;
    }
}