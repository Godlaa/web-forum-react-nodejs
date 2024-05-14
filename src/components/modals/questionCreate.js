import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Button, Dropdown, Form, Modal } from "react-bootstrap";
import { Context } from "../..";
import PropTypes from "prop-types";
import { fetchSections } from "../../http/sectionsApi";
import { createQuestion } from "../../http/questionsApi";
import { observer } from "mobx-react-lite";

const QuestionCreate = observer ( ({show, onHide}) => {

    const { question_store } = useContext(Context);
    const { user_store } = useContext(Context);
    const [markers, setMarkers] = useState([]);
    const [header, setHeader] = useState('');
    const [isVip, setIsVip] = useState(false);

    useEffect (() => {
        fetchSections().then(data => question_store.setSections(data));
    }, []);

    const addQuestion = () => {
        const userId = user_store.user?.id;  
        if (userId) {
            createQuestion({header: header, markers: markers, is_vip: isVip, userId: user_store.user.id, sectionId: question_store.selectedSection.id}).then(data => { setHeader(''); setIsVip(false); setMarkers([]); });
            onHide();
        } else {
            console.log('user_store.user is not set or does not contain id');
        }
    }

    const addMarker = () => {
        setMarkers([...markers, {title: "", number: Date.now()}]);
    }

    const removeMarker = (number) => {
        setMarkers(markers.filter(marker => marker.number !== number));
    }

    const changeMarker = (key, value, number) => {
        setMarkers(markers.map(marker => marker.number === number ? {...marker, [key]: value} : marker));
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
            Добавить новый вопрос
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className = "mb-3">
                    <Dropdown.Toggle>{question_store.selectedSection.name || "Выберите секцию"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {question_store.sections.map(section =>
                            <Dropdown.Item
                                key={section.id}
                                onClick={() => question_store.setSelectedSection(section)}
                            >   
                                {section.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    className = "mt-3"
                    placeholder={"Введите заголовок вопроса"}
                    value={header}
                    onChange={e => setHeader(e.target.value)}   
                />
                <Form.Check
                    label="Вип вопрос"
                    type="radio"
                    className = "mt-3"
                    value={isVip}
                    onChange={e => setIsVip(e.target.value)}
                />
                <Button
                    variant={"outline-dark"}
                    onClick={addMarker}
                    className = "mt-3"
                    >
                    Добавить новое свойство
                </Button>
                {markers.map(marker =>
                        <Row className="mt-4" key={marker.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={marker.title}
                                    onChange={(e) => changeMarker('title', e.target.value, marker.number)}
                                    placeholder="Введите название тега"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeMarker(marker.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                      )}  
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
          <Button variant="outline-success" onClick={addQuestion}>Добавить</Button>
        </Modal.Footer>
      </Modal>
    );
})

QuestionCreate.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default QuestionCreate;