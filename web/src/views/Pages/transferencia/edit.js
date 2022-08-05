import React, { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Card } from "../../../components/Card";
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const TransferenciaEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [nome, setNome] = useState('');
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
          url: api.url_api + `/transferencia/${id}`,
          headers: {
            Authorization: "Bearer " + JSON.parse(usuario).token
          },
        }
        try {
          const resposta = await axios(config);
          if (resposta.status == 200) {
            setNome(resposta.data[0].nome);
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
    const data = { 'nome': nome };
    var config = {
      method: 'PUT',
      url: api.url_api + `/transferencia/${id}`,
      headers: {
        Authorization: "Bearer " + usuario
      },
      data: data
    }
    try {
      const resposta = await axios(config);
      if (resposta.status == 201 || resposta.status == 200) {
        history.push('/dashboard/transferencia');
        toast.info('Transferencia alterado com sucesso');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }


  return (
    <div className="main-content-container p-4 container-fluid">
      <div >
        <Button onClick={() => { history.push('/dashboard/transferencia') }} type="button" className="button button-primary">
          Voltar
        </Button>
      </div><br />
      <h2 style={{ textAlign: "center" }}>
        <Badge bg="secondary">Editar de transferencia</Badge>
      </h2>
      <Card>
        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Form className="col-sm-4" onSubmit={handleSalvar}>
            <Form.Group className="mb-2" >
              <Form.Label>transferencia</Form.Label>
              <Form.Control type="text" placeholder="Digite o nome da transferencia" value={nome} onChange={(e) => { setNome(e.target.value) }} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Alterar
            </Button>
          </Form>
        </div>
      </Card>
    </div>
  );
}


export default TransferenciaEdit;
