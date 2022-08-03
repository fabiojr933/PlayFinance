
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

export const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
];

export const options = {
    title: "My Daily Activities",
    is3D: true,
};

export const data2 = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
];

export const options2 = {
    chart: {
        title: "Company Performance",
        subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
};


const DocumentoReceber = () => {

    const history = useHistory();
    const [usuario, setUsuario] = useState('');
    const [loading, setLoading] = useState(true);
    const [ano, setAno] = useState(0);
    const [mes, setMes] = useState(0);
    const [lancamento, setLancamento] = useState([]);

    console.log(data);
    console.log(lancamento)

    const carregarLancMes = async (e) => {

    }

    const carregarLancAno = async (e) => {

    }

    async function GraficoLancamento() {
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');
        const usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token);
        const config = {
            method: 'GET',
            url: api.url_api + `/grafico/lancamentos/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            },
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                var data = [];
                for (var i = 0; i < resposta.data.length; i++) {
                    data.push([`${resposta.data[i].nome}`, Number(resposta.data[i].valor)]);
                }
                data.unshift(["Task", "Hours per Day"])
                setLancamento(data);
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
                                            data={lancamento}
                                            options={options}
                                            width={"100%"}
                                            height={"400px"}
                                        />
                                    </Col>
                                    <Col>
                                        <Chart
                                            chartType="Bar"
                                            width="100%"
                                            height="400px"
                                            data={data2}
                                            options={options2}
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

export default DocumentoReceber;