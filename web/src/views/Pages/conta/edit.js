import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const ContaEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState('');
  const [conta, setConta] = useState('');
  const [usuario, setUsuario] = useState('');

 
  useEffect(() => {
    async function load() {
      const usuario = localStorage.getItem('@usuario');
      if (!usuario) {
        history.push('/login');
      } else {
        setUsuario(JSON.parse(usuario).token);
        const config = {
          method: 'GET',
          url: api.url_api + `/conta/${id}`,
          headers: {
            Authorization: "Bearer " + JSON.parse(usuario).token
          },
        }
        try {
          const resposta = await axios(config);
          if (resposta.status == 200) {
            console.log(resposta.data)
            setNome(resposta.data[0].nome);
            setConta(resposta.data[0].conta);
            setSaldo(resposta.data[0].saldo);
          }
        } catch (error) {
          toast.error(error.response.data.error);
        }
      }
    }
    load();
  }, [])


  async function handleSalvar(e) {
    e.preventDefault();
    console.log(e)
    const data = { 'nome': nome, 'saldo': saldo, 'conta': conta };
    var config = {
      method: 'PUT',
      url: api.url_api + `/conta/${id}`,
      headers: {
        Authorization: "Bearer " + usuario
      },
      data: data
    }
    try {
      const resposta = await axios(config);
      if (resposta.status == 200) {
        history.push('/dashboard/conta');
        window.location.reload();
        toast.info('Conta alterado com sucesso');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }


  return (
    <div className="main-content-container p-4 container-fluid">
      <div >
        <Button onClick={() => { history.push('/dashboard/conta') }} type="button" className="button button-primary">
          Voltar
        </Button>
      </div><br />
      <h2 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Editar conta bancaria</Badge>
      </h2>
      <Card>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <div className="text-center" style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Form onSubmit={handleSalvar}>
              <Row>
                <Col>
                  <Form.Label style={{ float: 'left' }}>conta</Form.Label>
                  <Form.Control placeholder="Nome da conta bancaria" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                </Col>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Numero conta</Form.Label>
                  <Form.Control placeholder="Numero conta" value={conta} onChange={(e) => { setConta(e.target.value) }} />
                </Col>
                <Col>
                  <Form.Label style={{ float: 'left' }}>Saldo</Form.Label>
                  <Form.Control type="number" step="0.010" placeholder="Digite o saldo da conta" value={saldo} onChange={(e) => { setSaldo(e.target.value) }} />
                </Col>
              </Row><br />
              <Button style={{ float: 'left' }} variant="primary" type="submit">
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
}


export default ContaEdit;
