import React, { useContext, useEffect, useState } from "react";
import { Dropdown, Button, Form, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import { Context } from "../..";
import { createAnswer } from "../../http/answersApi";
import { fetchQuestions } from "../../http/questionsApi";
import { observer } from "mobx-react-lite";

const AnswerCreate = observer ( ({show, onHide}) => {

    const { question_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const [text, setText] = useState('');
    const [likes, setLikes] = useState(0);

    useEffect (() => {
        fetchQuestions().then(data => question_store.setQuestions(data.rows));
    }, []);

    const addAnswer = () => {
        const userId = user_store.user?.id;  
        if (userId) {
            createAnswer({userId: userId, questionId: question_store.selectedQuestion.id, text: text, likes: likes}).then(data => { setText(''); setLikes(0); });
            onHide();
        } else {
            console.log('user_store.user is not set or does not contain id');
        }
    }

    return (
        <Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить новый ответ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    placeholder={"Введите ответ"}
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <Form.Control
                    className = "mt-3"
                    placeholder={"Количество лайков"}
                    value={likes}
                    onChange={e => setLikes(Number(e.target.value))}
                />
                <Dropdown className = "mt-3">
                    <Dropdown.Toggle> {question_store.selectedQuestion.header || "Выберите вопрос"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {question_store._questions.map(question =>
                            <Dropdown.Item
                                key={question.id}
                                onClick={() => question_store.setSelectedQuestion(question)}
                            >
                                {question.header}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success" onClick={addAnswer}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
})

AnswerCreate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default AnswerCreate;