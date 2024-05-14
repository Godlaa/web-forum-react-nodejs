import React, { useContext, useEffect } from "react";
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import SectionsBar from "../components/SectionsBar";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { fetchSections } from "../http/sectionsApi";

const Forum = observer ( () => {
    const { question_store } = useContext(Context);

    useEffect(() => {
        fetchSections().then(data => question_store.setSections(data));
    }, []);

    return (
        <Container className="mt-5"> 
            <FormLabel className="mb-3">Разделы</FormLabel>
            <Row>
                <Col>
                    <SectionsBar />
                </Col>
            </Row>
        </Container>
    );
});

export default Forum;
