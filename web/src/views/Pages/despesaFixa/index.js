
import React, { useState, useEffect } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const DespesaFixa = () => {

    const history = useHistory();
    const [despesaFixa, setDespesaFixa] = useState([]);
    const [usuarioToken, setUsuario] = useState('');

    const handleDel = async (id) => {
        if (!id) {
            toast.error('Seleciona a despesa para deletar');
        }
        const config = {
            method: 'DELETE',
            url: api.url_api + `/despesaFixa/${id}`,
            headers: {
                Authorization: "Bearer " + usuarioToken
            },
        }
        try {
            const resposta = await axios(config);
            if (resposta.status = 200) {
                history.push('/dashboard/despesa-fixa');
                carregarPagina();
                toast.info('Despesa deletado com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };
    const handleEditar = async (id) => {
        history.push(`/dashboard/despesa-fixa/editar/${id}`);

    }
    async function carregarPagina() {
        const usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token);
        var config = {
            method: 'GET',
            url: api.url_api + '/despesaFixa',
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setDespesaFixa(resposta.data);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }

    useEffect(() => {
        carregarPagina();
    }, []);
    return (
        <div className="main-content-container p-4 container-fluid">
            <div >
                <Button onClick={() => { history.push('/dashboard/despesa-fixa/novo') }} type="button" className="button button-primary">
                    Nova Despesa fixa
                </Button><br />
                <h2 style={{ textAlign: "center" }}>
                    <Badge bg="secondary">Lista de despesa fixa</Badge>
                </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <Card>

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%' }} >Id</th>
                                        <th style={{ width: '80%' }}>Nome da despesa</th>
                                        <th >Editar</th>
                                        <th >Excluir</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {despesaFixa.map((v, i) => (
                                        <tr>
                                            <td style={{ width: '10%' }}>{v.id}</td>
                                            <td style={{ width: '80%' }}>{v.nome}</td>
                                            <td > <Link onClick={() => handleEditar(v.id)}><AiFillEdit /></Link> </td>
                                            <td > <Link onClick={() => handleDel(v.id)}><AiFillDelete /></Link> </td>
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

export default DespesaFixa;
