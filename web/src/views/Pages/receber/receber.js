
import React, { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { AiFillDollarCircle } from "react-icons/ai";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { BallTriangle } from 'react-loader-spinner'

const DocumentoReceberBaixa = () => {

    const history = useHistory();
    const [usuario, setUsuario] = useState('');
    const [docReceber, setDocReceber] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ano, setAno] = useState(0);
    const [mes, setMes] = useState(0);

    const handleReceber = async (id) => {
        if (!id) return toast.error('É obrigado informar o Id');
        var config = {
            method: 'PUT',
            url: api.url_api + `/contasReceber/baixa/${id}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const response = await axios(config);
            if (response.status == 200) {
                history.push('/dashboard/financeiro/contas-receber/baixa');
                carregarDocumentoReceber();
                toast.info('Documento Recebido com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const carregarLancMes = async (e) => {
        const mesSelecionado = e.target.value;
        if (!mesSelecionado) return toast.error('É obrigado informar um mes');
        setMes(mesSelecionado);
        var config = {
            method: 'GET',
            url: api.url_api + `/contasReceber/pendente/${ano}/${mesSelecionado}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setDocReceber(resposta.data)
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const carregarLancAno = async (e) => {
        const anoSelecionado = e.target.value;
        if (!anoSelecionado) return toast.error('É obrigado informar um mes');
        setAno(anoSelecionado);
        var config = {
            method: 'GET',
            url: api.url_api + `/contasReceber/pendente/${anoSelecionado}/${mes}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setDocReceber(resposta.data)
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const carregarDocumentoReceber = async () => {
        const usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token);
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        var config = {
            method: 'GET',
            url: api.url_api + `/contasReceber/pendente/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setDocReceber(resposta.data)
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    const Datas = async () => {
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        setAno(Number(ano));
        setMes(Number(mes))
    }

    useEffect(() => {
        Datas();
        carregarDocumentoReceber();
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    }, []);

    if (loading == true) {
        return (
            <>
                <div style={{ textAlign: 'center', color: '#5A92CE', marginTop: 40 }} >
                    <h2 >
                        <Badge bg="secondary">Carregando aguarde...</Badge>
                    </h2>
                    <br />
                    <BallTriangle
                        height={'15%'}
                        width={'15%'}
                        radius={3}
                        color="#5A92CE"
                        ariaLabel="Carregando...."
                        wrapperClass={{}}
                        wrapperStyle={
                            { justifyContent: 'center', textAlign: 'center' }
                        }
                        visible={true}
                    />
                </div>
            </>

        )
    }
    else {
        return (
            <div className="main-content-container p-4 container-fluid" >
                <div >
                    <Button onClick={() => { history.push('/dashboard/financeiro/contas-receber/novo') }} type="button" className="button button-primary">
                        Novo Documento a receber
                    </Button><br />
                    <h2 style={{ textAlign: "center" }}>
                        <Badge bg="secondary">Lista de lançamentos de Doc receber {mes}-{ano} </Badge>
                    </h2>
                    <div class="row" >
                        <div class="col-lg-12" >
                            <Card >

                                <Row>
                                    <Col>
                                        <Form.Label style={{ paddingLeft: 20 }}>Mes</Form.Label>

                                        <div class="form-group" style={{ paddingLeft: 20 }} >
                                            <select class="form-control pesquisa__select col-12 selectCustom" value={mes} onChange={carregarLancMes} >
                                                <option no-onSelect>Selecione o mes desejado</option>
                                                <option value="1">Janeiro</option>
                                                <option value="2">Fevereiro</option>
                                                <option value="3">Março</option>
                                                <option value="4">Abril</option>
                                                <option value="5">Maio</option>
                                                <option value="6">Junho</option>
                                                <option value="7">Julho</option>
                                                <option value="8">Agosto</option>
                                                <option value="9">Setembro</option>
                                                <option value="10">Outubro</option>
                                                <option value="11">Novembro</option>
                                                <option value="12">Desembro</option>
                                            </select>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Form.Label style={{ float: 'left' }}>Ano</Form.Label>
                                        <div class="form-group" style={{ paddingRight: 20 }}>
                                            <select class="form-control pesquisa__select col-12 selectCustom" value={ano} onChange={carregarLancAno} >
                                                <option no-onSelect>Selecione o ano desejado</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row><br />



                                <Table striped bordered hover size="sm">
                                    <thead >
                                        <tr>
                                            <th style={{ width: '8%' }} >Id</th>
                                            <th style={{ width: '8%' }}>Status</th>
                                            <th style={{ width: '10%' }}>Valor</th>
                                            <th style={{ width: '10%' }}>Data Laçamento</th>
                                            <th style={{ width: '10%' }}>Data Vencimento</th>
                                            <th style={{ width: '20%' }}>Fluxo</th>
                                            <th style={{ width: '30%' }}>Observação</th>
                                            <th >Receber</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {docReceber.map((v) => (
                                            <tr>
                                                <td style={{ width: '8%' }}>{v.id}</td>
                                                {v.status == `Pendente` ?
                                                    <td style={{ width: '8%', color: 'red' }}  >{v.status}</td>
                                                    : (<td style={{ width: '8%', color: '#0069b9' }}  >{v.status}</td>)}

                                                {v.status == `Pendente` ?
                                                    <td style={{ width: '10%', color: 'red' }}  >R$: {v.valor}</td>
                                                    : (<td style={{ width: '10%', color: '#0069b9' }}  >R$: {v.valor}</td>)}


                                                <td style={{ width: '10%' }}>{moment(v.data_lancamento).format('DD-MM-YYYY')}</td>
                                                <td style={{ width: '10%' }}>{moment(v.vencimento).format('DD-MM-YYYY')}</td>
                                                <td style={{ width: '20%' }}>{v.fluxo}</td>
                                                <td style={{ width: '30%' }}>{v.observacao}</td>
                                                <td > <Link onClick={() => { handleReceber(v.id) }} ><AiFillDollarCircle /></Link> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DocumentoReceberBaixa;
