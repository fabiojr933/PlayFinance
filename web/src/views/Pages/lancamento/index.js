
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

const Lancamento = () => {

    const history = useHistory();
    const [usuario, setUsuario] = useState('');
    const [lancamento, setLancamentos] = useState([]);
    const [ano, setAno] = useState(0);
    const [mes, setMes] = useState(0);

    const handleDel = async (id) => {
        if (!id) return toast.error('É obrigado informar o Id');
        var config = {
            method: 'DELETE',
            url: api.url_api + `/lancamento/${id}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const response = await axios(config);
            if (response.status == 200) {
                history.push('/dashboard/lancamento');
                Carregamento();
                toast.info('Lançamento excluido com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const Carregamento = async () => {
        var ano = moment().format('YYYY');
        var mes = moment().format('MM');

        var usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token)
        var config = {
            method: 'GET',
            url: api.url_api + `/lancamento/${ano}/${mes}`,
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setLancamentos(resposta.data)
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
        Carregamento();
    }, []);
    return (
        <div className="main-content-container p-4 container-fluid">
            <div >
                <Button onClick={() => { history.push('/dashboard/lancamento/novo') }} type="button" className="button button-primary">
                    Nova conta bancaria
                </Button><br />
                <h2 style={{ textAlign: "center" }}>
                    <Badge bg="secondary">Lista de conta bancaria</Badge>
                </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <Card>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }} >Id</th>
                                        <th style={{ width: '15%' }}>Tipo</th>
                                        <th style={{ width: '20%' }}>Valor</th>
                                        <th style={{ width: '20%' }}>Data</th>
                                        <th style={{ width: '30%' }}>Fluxo</th>
                                        <th >Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lancamento.map((v) => (
                                        <tr>
                                            <td style={{ width: '10%' }}>{v.id}</td>
                                            { v.tipo == `Saida` ? 
                                                 <td style={{ width: '15%', color: 'red' }}  >{v.tipo}</td>                                                 
                                             : (  <td style={{ width: '15%', color: '#0069b9' }}  >{v.tipo}</td> ) }
                                          
                                          { v.tipo == `Saida` ? 
                                                 <td style={{ width: '15%', color: 'red' }}  >{v.valor}</td>                                                 
                                             : (  <td style={{ width: '15%', color: '#0069b9' }}  >{v.valor}</td> ) }
                                          

                                            <td style={{ width: '20%' }}>{moment(v.data).format('DD-MM-YYYY')}</td>
                                            <td style={{ width: '30%' }}>{v.fluxo}</td>
                                            <td > <Link onClick={() => { handleDel(v.id) }} ><AiFillDelete /></Link> </td>
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

export default Lancamento;
