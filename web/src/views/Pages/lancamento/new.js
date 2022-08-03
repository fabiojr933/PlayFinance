import React, { useState, useEffect } from "react";
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
import moment from 'moment';

const LancamentoNew = () => {
  const history = useHistory();

  const [fluxo, setFluxo] = useState([]);
  const [tipo, setTipo] = useState('');
  const [conta, setConta] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState('');
  const [lanc, setLanc] = useState('');
  const [observacao, setObservacao] = useState('');
  const [valor, setValor] = useState('');
  const [usuario, setUsuario] = useState('');

  async function handleSalvar(e) {
    e.preventDefault();
    var data = {};
    if (tipo == 'Despesa Fixa') {
      data = {
        'observacao': observacao,
        'valor': valor,
        'id_despesa_fixa': lanc,
        'id_conta': cartaoSelecionado,
        'tipo': 'Saida',
        'data': moment().format('YYYY-MM-DD')
      }
    }
    if (tipo == 'Despesa Variavel') {
      data = {
        'observacao': observacao,
        'valor': valor,
        'id_despesa_variavel': lanc,
        'id_conta': cartaoSelecionado,
        'tipo': 'Saida',
        'data': moment().format('YYYY-MM-DD')
      }
    }
    if (tipo == 'Imposto') {
      data = {
        'observacao': observacao,
        'valor': valor,
        'id_imposto': lanc,
        'id_conta': cartaoSelecionado,
        'tipo': 'Saida',
        'data': moment().format('YYYY-MM-DD')
      }
    }
    if (tipo == 'Recebimento') {
      data = {
        'observacao': observacao,
        'valor': valor,
        'id_recebimento': lanc,
        'id_conta': cartaoSelecionado,
        'tipo': 'Entrada',
        'data': moment().format('YYYY-MM-DD')
      }
    }
    if (tipo == 'Transferencia') {
      data = {
        'observacao': observacao,
        'valor': valor,
        'id_transferencia': lanc,
        'id_conta': cartaoSelecionado,
        'tipo': 'Saida',
        'data': moment().format('YYYY-MM-DD')
      }
    }
    console.log(data)

    var config = {
      method: 'POST',
      url: api.url_api + '/lancamento',
      headers: {
        Authorization: "Bearer " + usuario
      },
      data: data
    }
    try {
      const resposta = await axios(config);
      console.log(resposta)
      if (resposta.status == 201 || resposta.status == 200) {
        history.push('/dashboard/financeiro/lancamento/');
        toast.info('Lançamento cadastrado com sucesso');
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  }

  useEffect(() => {
    async function load() {
      const usuario = localStorage.getItem('@usuario');
      setUsuario(JSON.parse(usuario).token);
      var config = {
        method: 'GET',
        url: api.url_api + '/conta',
        headers: {
          Authorization: "Bearer " + JSON.parse(usuario).token
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setConta(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    load();
  }, []);

  async function carregarTipo(e) {
    e.preventDefault();
    const tipo = e.target.value
    setTipo(tipo);
    if (tipo == 'Despesa Fixa') {
      var config = {
        method: 'GET',
        url: api.url_api + '/despesaFixa',
        headers: {
          Authorization: "Bearer " + usuario
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setFluxo(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    if (tipo == 'Despesa Variavel') {
      var config = {
        method: 'GET',
        url: api.url_api + '/despesaVariavel',
        headers: {
          Authorization: "Bearer " + usuario
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setFluxo(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    if (tipo == 'Imposto') {
      var config = {
        method: 'GET',
        url: api.url_api + '/imposto',
        headers: {
          Authorization: "Bearer " + usuario
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setFluxo(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    if (tipo == 'Transferencia') {
      var config = {
        method: 'GET',
        url: api.url_api + '/transferencia',
        headers: {
          Authorization: "Bearer " + usuario
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setFluxo(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
    if (tipo == 'Recebimento') {
      var config = {
        method: 'GET',
        url: api.url_api + '/recebimento',
        headers: {
          Authorization: "Bearer " + usuario
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setFluxo(resposta.data);
        }
      } catch (error) {
        toast.error(error.response.data.error);
      }
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
          <Badge bg="secondary">Lançamento</Badge>
        </h2>
        <Card>
          <Form onSubmit={handleSalvar}>
            <div style={{ marginTop: 20, marginBottom: 20 }}>
              <div className="text-center" style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Row>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Observação</Form.Label>
                    <Form.Control placeholder="Observação do lançamento" onChange={(e) => { setObservacao(e.target.value) }} />
                  </Col>
                </Row><br />
                <Row>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Valor</Form.Label>
                    <Form.Control type="number" step="0.010" placeholder="Digite o valor" onChange={(e) => { setValor(e.target.value) }} />
                  </Col>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo do lancamento</Form.Label>
                    <div className="form-group">
                      <select className="form-control pesquisa__select col-12 selectCustom" onClick={carregarTipo}>
                        <option >Selecione</option>
                        <option value="Despesa Fixa">Despesa Fixa</option>
                        <option value="Despesa Variavel" >Despesa Variavel</option>
                        <option value="Imposto" >Imposto</option>
                        <option value="Recebimento" >Recebimento</option>
                        <option value="Transferencia" >Transferencia</option>
                      </select>
                    </div>
                  </Col>
                </Row><br />
                <Row>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo do lancamento</Form.Label>
                    <div className="form-group">
                      <select className="form-control pesquisa__select col-12 selectCustom" onChange={(e) => { setLanc(e.target.value) }} >
                        <option >Selecione</option>
                        {fluxo.map((v) => (
                          <option key={v.id} value={v.id} > {v.nome}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo da conta</Form.Label>
                    <div className="form-group">
                      <select className="form-control pesquisa__select col-12 selectCustom" onChange={(e) => { setCartaoSelecionado(e.target.value) }} >
                        <option >Selecione</option>
                        {conta.map((v) => (
                          <option key={v.id} value={v.id} >{v.nome}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>               
                <Button style={{ float: 'left' }} variant="primary" type="submit">
                  Fazer Lançamento
                </Button><br />
              </div>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default LancamentoNew;
