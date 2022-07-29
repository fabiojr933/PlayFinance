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
  const [cartao, setCartao] = useState([]);
  const [cartaoSelecionado, setCartaoSelecionado] = useState('');
  const [despesa, setDespesa] = useState('');
  const [receita, setReceita] = useState('');
  const [observacao, setObservacao] = useState('');
  const [valor, setValor] = useState('');
  const [usuario, setUsuario] = useState('');


  async function handleSalvar(e) {
    e.preventDefault();
    const data = {
      'observacao': observacao,
      'valor': valor,
      'id_receita': receita,
      'id_despesa': despesa,
      'id_cartao': cartaoSelecionado,
      'tipo': tipo,
      'data': moment().format('YYYY-MM-DD')
    }
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
        history.push('/dashboard/lancamento/');
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
        url: api.url_api + '/cartao',
        headers: {
          Authorization: "Bearer " + JSON.parse(usuario).token
        }
      }
      try {
        const resposta = await axios(config);
        if (resposta.status == 200) {
          setCartao(resposta.data);
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
    if (tipo == 'Entrada') {
      var config = {
        method: 'GET',
        url: api.url_api + '/receita',
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
    if (tipo == 'Saida') {
      var config = {
        method: 'GET',
        url: api.url_api + '/despesa',
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
          <Badge bg="secondary">Cadastro de conta bancaria</Badge>
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
                    <Form.Control placeholder="Digite o valor" onChange={(e) => { setValor(e.target.value) }} />
                  </Col>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo do lancamento</Form.Label>
                    <div class="form-group">
                      <select class="form-control pesquisa__select col-12 selectCustom" onClick={carregarTipo}>
                        <option no-onSelect>Selecione</option>
                        <option value="Entrada">Entrada</option>
                        <option value="Saida" >Saida</option>
                      </select>
                    </div>
                  </Col>
                </Row><br />
                <Row>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo do lancamento</Form.Label>
                    <div class="form-group">
                      <select class="form-control pesquisa__select col-12 selectCustom" onChange={(e) => { tipo == 'Entrada' ? setReceita(e.target.value) || setDespesa(null) : setDespesa(e.target.value) || setReceita(null) }} >
                        <option no-onSelect>Selecione</option>
                        {fluxo.map((v) => (
                          <option value={tipo == 'Entrada' ? v.id : v.id} > {tipo == 'Entrada' ? v.receita : v.despesa}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col>
                    <Form.Label style={{ float: 'left' }}>Tipo da conta</Form.Label>
                    <div class="form-group">
                      <select class="form-control pesquisa__select col-12 selectCustom" onChange={(e) => { setCartaoSelecionado(e.target.value) }} >
                        <option no-onSelect>Selecione</option>
                        {cartao.map((v) => (
                          <option value={v.id} >{v.cartao}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>
                <Button style={{ float: 'left' }} variant="primary" type="submit">
                  Cadastrar
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
