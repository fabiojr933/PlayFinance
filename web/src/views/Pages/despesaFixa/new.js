import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const DespesaNew = () => {
  const history = useHistory();
  const [nome, setNome] = useState('');

  async function heandleSalvar(e) {
    e.preventDefault();
    const data = { 'nome': nome };
    const usuario = localStorage.getItem('@usuario');
    var config = {
      method: 'POST',
      url: api.url_api + '/despesaFixa',
      headers: {
        Authorization: "Bearer " + JSON.parse(usuario).token
      },
      data: data
    }
    try {
      const resposta = await axios(config);
      if (resposta.status == 201 || resposta.status == 200) {
        history.push('/dashboard/despesa-fixa');
        toast.info('Despesa cadastrado com sucesso');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  return (
    <div className="main-content-container p-4 container-fluid">
      <div >
        <Button onClick={() => { history.goBack() }} type="button" className="button button-primary">
          Voltar
        </Button>
      </div><br />
      <h2 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Cadastro de despesa</Badge>
      </h2>
      <Card>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Form className="col-sm-4" onSubmit={heandleSalvar}>
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Despesa</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome da despesa" onChange={(e) => { setNome(e.target.value) }} />
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


export default DespesaNew;
