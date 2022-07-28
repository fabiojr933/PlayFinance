import React from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';


const ReceitaEdit = () => {
  const history = useHistory();

  return (
    <div className="main-content-container p-4 container-fluid">
      <div >
        <Button onClick={() => { history.goBack() }} type="button" className="button button-primary">
          Voltar
        </Button>
      </div><br />
      <h2 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Editar conta bancaria</Badge>
      </h2>
      <Card>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="text-center" style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form>
              <Row>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Cartao</Form.Label>
                  <Form.Control placeholder="Nome da conta bancaria" />
                </Col>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Numero conta</Form.Label>
                  <Form.Control placeholder="Numero conta" />
                </Col>
              </Row><br />
              <Row>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Numero conta</Form.Label>
                  <div class="form-group">
                    <select class="form-control pesquisa__select col-12 selectCustom">
                      <option>Debito</option>
                      <option>Credito</option>
                    </select>
                  </div>
                </Col>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Saldo</Form.Label>
                  <Form.Control placeholder="Digite o saldo da conta" />
                </Col>
              </Row>
              <Button style={{float: 'left'}} variant="primary" type="submit">
              Cadastrar
            </Button>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}


export default ReceitaEdit;
