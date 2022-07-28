import React from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Badge from 'react-bootstrap/Badge';

const ReceitaNew = () => {
  const history = useHistory();

  return (
    <div className="main-content-container p-4 container-fluid">
      <div >
        <Button onClick={() => { history.goBack() }} type="button" className="button button-primary">
          Voltar
        </Button>
      </div><br />
      <h2 style={{ textAlign: "center" }}>
                    <Badge bg="secondary">Cadastro de receita</Badge>
                </h2>
      <Card>
        <div style={{marginTop: 20, marginBottom: 20}}>
          <Form className="col-sm-4">
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Receita</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome da receita" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
}


export default ReceitaNew;
