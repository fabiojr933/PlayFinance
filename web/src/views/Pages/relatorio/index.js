
import React, { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { BallTriangle } from 'react-loader-spinner'


const Relatorio = () => {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [janeiro, setJaneiro] = useState([]);
    const [fevereiro, setFevereiro] = useState([]);
    const [marco, setMarco] = useState([]);
    const [abril, setAbril] = useState([]);
    const [maio, setMaio] = useState([]);
    const [junho, setJunho] = useState([]);
    const [julho, setJulho] = useState([]);
    const [agosto, setAgosto] = useState([]);
    const [setembro, setSetembro] = useState([]);
    const [outubro, setOutubro] = useState([]);
    const [novembro, setNovembro] = useState([]);
    const [desembro, setDesembro] = useState([]);
    const [ano, setAno] = useState(0);


    const handleCarregarAno = async () => {
        carregarJaneiro();
        carregarFevereiro();
        carregarMarco();
        carregarAbril();
        carregarMaio();
        carregarJunho();
        carregarJulho();
        carregarAgosto();
        carregarSetembro();
        carregarOutubro();
        carregarNovembro();
        carregarDesembro();
    }

    const handleDel = async (id) => {
        if (!id) return toast.error('É obrigado informar o Id');
        var usuario = localStorage.getItem('@usuario');
        var config = {
            method: 'DELETE',
            url: api.url_api + `/lancamento/${id}`,
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            }
        }
        try {
            const response = await axios(config);
            if (response.status == 200) {
                history.push('/dashboard/financeiro/lancamento');
                toast.info('Lançamento excluido com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const carregarJaneiro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/01`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setJaneiro(resposta.data)
                }
            } catch (error) {
                console.log(error)

                toast.error(error.response.data.error);
            }
        }

    }

    const carregarFevereiro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/02`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setFevereiro(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarMarco = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/03`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setMarco(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }


    const carregarAbril = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/04`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setAbril(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarMaio = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/05`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setMaio(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarJunho = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/06`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setJunho(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarJulho = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/07`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setJulho(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarAgosto = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/08`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setAgosto(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarSetembro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/09`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setSetembro(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarOutubro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/10`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setOutubro(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }
    }

    const carregarNovembro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/11`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setNovembro(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }

    }

    const carregarDesembro = async () => {
        var usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            var anoAtual = moment().format('YYYY');
            var anoCerto = ano == 0 ? anoAtual : ano;
            var config = {
                method: 'GET',
                url: api.url_api + `/lancamento/${anoCerto}/12`,
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setDesembro(resposta.data)
                }
            } catch (error) {
                toast.error(error.response.data.error);
            }
        }

    }

    useEffect(() => {
        async function load() {
            await carregarJaneiro();
            await carregarFevereiro();
            await carregarMarco();
            await carregarAbril();
            await carregarMaio();
            await carregarJunho();
            await carregarJulho();
            await carregarAgosto();
            await carregarSetembro();
            await carregarOutubro();
            await carregarNovembro();
            await carregarDesembro();
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }
        load();

    }, []);


    if (loading) {
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
    } else {
        return (
            <div className="main-content-container p-4 container-fluid">

                <div >
                    <h2 style={{ textAlign: "center" }}>
                        <Badge bg="secondary">Lista de Lancamento {ano == 0 ? moment().format('YYYY') : ano}</Badge>
                    </h2>
                    <div className="row" >
                        <div className="col-lg-12" >
                            <Card >

                                <Row>
                                    <Col>
                                        <Form.Label style={{ paddingLeft: 25 }}>Ano</Form.Label>
                                        <div className="form-group" style={{ padding: 20 }}>
                                            <select className="form-control pesquisa__select col-12 selectCustom" value={ano == 0 ? moment().format('YYYY') : ano}
                                                onChange={(e) => { setAno(e.target.value) }} onClick={handleCarregarAno} >
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

                                <Tabs
                                    defaultActiveKey="home"
                                    transition={false}
                                    id="noanim-tab-example"
                                    className="mb-3"
                                    style={{ paddingLeft: 20, paddindRight: 20 }}
                                >
                                    <Tab eventKey="Janeiro" title="Janeiro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {janeiro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Fevereiro" title="Fevereiro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {fevereiro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Marco" title="Marco" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {marco.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Abril" title="Abril" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {abril.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Maio" title="Maio" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {maio.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Junho" title="Junho" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {junho.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Julho" title="Julho" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {julho.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Agosto" title="Agosto" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {agosto.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Setembro" title="Setembro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {setembro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Outubro" title="Outubro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {outubro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Novembro" title="Novembro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {novembro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                    <Tab eventKey="Desembro" title="Desembro" style={{ paddingLeft: 20, paddindRight: 20 }}>
                                        <Table striped bordered hover size="sm">
                                            <thead >
                                                <tr>
                                                    <th style={{ width: '10%' }} >Id</th>
                                                    <th style={{ width: '15%' }}>Tipo</th>
                                                    <th style={{ width: '20%' }}>Valor</th>
                                                    <th style={{ width: '20%' }}>Data</th>
                                                    <th style={{ width: '30%' }}>Fluxo</th>
                                                    <th >Excluir</th>
                                                </tr>
                                            </thead>
                                            <tbody >
                                                {desembro.map((v) => (
                                                    <tr key={v.id}>
                                                        <td style={{ width: '10%' }}>{v.id}</td>
                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td>)}

                                                        {v.tipo == `Saida` ?
                                                            <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>
                                                            : (<td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td>)}


                                                        <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                                        <td style={{ width: '30%' }}>{v.fluxo}</td>
                                                        <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Tab>
                                </Tabs>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Relatorio;
