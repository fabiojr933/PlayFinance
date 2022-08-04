
import React, { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { AiFillExclamationCircle, AiFillDelete } from "react-icons/ai";
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
import { Chart } from "react-google-charts";

export const optionsReceber = {
    title: "Contas Receber",
    is3D: true,
};

export const optionsReceber2 = {
    chart: {
        title: "Contas Pagar",
    },
};

const ContasReceberGrafico = () => {

    const history = useHistory();
    const [usuario, setUsuario] = useState('');
    const [loading, setLoading] = useState(true);
    const [ano, setAno] = useState(0);
    const [mes, setMes] = useState(0);
    const [lancamentoReceber, setLancamentoReceber] = useState([]);



    const carregarLancMes = async (e) => {
        e.preventDefault();
        var mes = e.target.value;
        setMes(mes)

        var config = {
            method: 'GET',
            url: api.url_api + `/grafico/contasReceber/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                var data = [];
                if (resposta.data == [] || resposta.data == undefined || resposta.data == '') {
                    data.push(['Nenhum dados encontrados', 0.00])
                }
                for (var i = 0; i < resposta.data.length; i++) {
                    data.push([`${resposta.data[i].nome}`, Number(resposta.data[i].valor)]);
                }
                data.unshift(['Nome', 'Valor']);
                setLancamentoReceber(data);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }

    }

    const carregarLancAno = async (e) => {
        e.preventDefault();
        var ano = e.target.value;
        setAno(ano)
        var config = {
            method: 'GET',
            url: api.url_api + `/grafico/contasReceber/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                var data = [];
                if (resposta.data == [] || resposta.data == undefined || resposta.data == '') {
                    data.push(['Nenhum dados encontrados', 0.00])
                }
                for (var i = 0; i < resposta.data.length; i++) {
                    data.push([`${resposta.data[i].nome}`, Number(resposta.data[i].valor)]);
                }
                data.unshift(['Nome', 'Valor']);
                setLancamentoReceber(data);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    async function GraficoLancamento() {
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        const usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token);
        const config2 = {
            method: 'GET',
            url: api.url_api + `/grafico/contasReceber/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            },
        }
        try {
            const resposta2 = await axios(config2);
            if (resposta2.status == 200) {
                var data2 = [];
                for (var i = 0; i < resposta2.data.length; i++) {
                    data2.push([`${resposta2.data[i].nome}`, Number(resposta2.data[i].valor)]);
                }
                data2.unshift(["Nome", "Valor"])
                setLancamentoReceber(data2);
            }
        } catch (error) {
            console.error(error);
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
        GraficoLancamento();
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
                    <Button onClick={() => { history.push('/dashboard/financeiro/contas-receber/baixa') }} type="button" className="button button-primary">
                        Receber documento
                    </Button><br />
                    <h2 style={{ textAlign: "center" }}>
                        <Badge bg="secondary">Grafico {mes}-{ano} </Badge>
                    </h2>
                    <div className="row" >
                        <div className="col-lg-12" >
                            <Card >

                                <Row>
                                    <Col>
                                        <Form.Label style={{ paddingLeft: 20 }}>Mes</Form.Label>

                                        <div className="form-group" style={{ paddingLeft: 20 }} >
                                            <select className="form-control pesquisa__select col-12 selectCustom" value={mes} onChange={carregarLancMes} >
                                                <option >Selecione o mes desejado</option>
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
                                        <div className="form-group" style={{ paddingRight: 20 }}>
                                            <select className="form-control pesquisa__select col-12 selectCustom" value={ano} onChange={carregarLancAno} >
                                                <option >Selecione o ano desejado</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                            </select>
                                        </div>
                                    </Col>
                                </Row><br />



                                <Row style={{ padding: 20 }}>
                                    <Col>
                                        <Chart
                                            chartType="PieChart"
                                            data={lancamentoReceber}
                                            options={optionsReceber}
                                            width={"100%"}
                                            height={"400px"}
                                        />
                                    </Col>
                                    <Col>
                                        <Chart
                                            chartType="Bar"
                                            width="100%"
                                            height="400px"
                                            data={lancamentoReceber}
                                            options={optionsReceber2}
                                        />
                                    </Col>
                                </Row><br />

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContasReceberGrafico;
