
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

const Conta = () => {

    const history = useHistory();
    const [conta, setConta] = useState([]);
    const [usuario, setUsuario] = useState('');

    const handleDel = async (id) => {
        if (!id) {
            return toast.error('Selecione um conta bancaria para deletar');
        }
        const config = {
            method: 'DELETE',
            url: api.url_api + `/conta/${id}`,
            headers: {
                Authorization: "Bearer " + usuario
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                history.push('/dashboard/conta');
                Carregamento();
                toast.info('Conta deletado com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    const handleEditar = async (id) => {
        history.push(`/dashboard/conta/editar/${id}`);
    }

    const Carregamento = async () => {
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

    useEffect(() => {
        Carregamento();
    }, []);

    return (
        <div className="main-content-container p-4 container-fluid">
            <div >
                <Button onClick={() => { history.push('/dashboard/conta/novo') }} type="button" className="button button-primary">
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
                                        <th style={{ width: '10%' }} >id</th>
                                        <th style={{ width: '50%' }}>Nome</th>
                                        <th style={{ width: '20%' }}>Conta</th>
                                        <th style={{ width: '20%' }}>Saldo</th>
                                        <th >Editar</th>
                                        <th >Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conta.map((v) => (
                                        <tr>
                                            <td style={{ width: '10%' }}>{v.id}</td>
                                            <td style={{ width: '50%' }}>{v.nome}</td>
                                            <td style={{ width: '20%' }}>{v.conta}</td>
                                            <td style={{ width: '20%' }}>{v.saldo}</td>
                                            <td > <Link onClick={() => { handleEditar(v.id) }} ><AiFillEdit /></Link> </td>
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

export default Conta;
