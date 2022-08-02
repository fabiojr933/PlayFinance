import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContaNew = () => {
  const history = useHistory();
  const [nome, setNome] = useState('');
  
  const [saldo, setSaldo] = useState('');
  const [conta, setConta] = useState('');

  async function heandleSalvar(e) {
    e.preventDefault();
    const data = { 'nome': nome, 'saldo': saldo, 'conta': conta };
    const usuario = localStorage.getItem('@usuario');
    var config = {
      method: 'POST',
      url: api.url_api + '/conta',
      headers: {
        Authorization: "Bearer " + JSON.parse(usuario).token
      },
      data: data
    }
    try {
      const resposta = await axios(config);
      if (resposta.status == 201 || resposta.status == 200) {
        history.push('/dashboard/conta');
        toast.info('Conta cadastrado com sucesso');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <>

      <div className="main-content-container p-4 container-fluid">
        <div >
          <Button onClick={() => { history.goBack() }} type="button" className="button button-primary">
            Voltar
          </Button>
        </div><br />
        <h2 style={{ textAlign: "center" }}>
          <Badge bg="secondary">Cadastro de conta bancaria</Badge>
        </h2>
        <form onSubmit={heandleSalvar}>
          <Card>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <div className="text-center" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Form>
                  <Row>
                    <Col>
                      <Form.Label style={{ float: 'left' }}>conta</Form.Label>
                      <Form.Control placeholder="Nome da conta bancaria" onChange={(e) => { setNome(e.target.value) }} />
                    </Col>
                    <Col>
                      <Form.Label style={{ float: 'left' }}>Numero conta</Form.Label>
                      <Form.Control placeholder="Numero conta" onChange={(e) => { setConta(e.target.value) }} />
                    </Col>
                    <Col>
                      <Form.Label style={{ float: 'left' }}>Saldo</Form.Label>
                      <Form.Control type="number" step="0.010" placeholder="Digite o saldo da conta" onChange={(e) => { setSaldo(e.target.value) }} />
                    </Col>
                  </Row><br />                
                  <Button style={{ float: 'left' }} variant="primary" type="submit">
                    Cadastrar
                  </Button>
                </Form>
              </div>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
}

export default ContaNew;
