
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

const Imposto = () => {

    const history = useHistory();
    const [imposto, setImposto] = useState([]);
    const [usuario, setUsuario] = useState('');

    const handleDel = async (id) => {
        if (!id) {
            return toast.error('Selecione uma imposto para deletar');
        }      
        const config = {
            method: 'DELETE',
            url: api.url_api + `/imposto/${id}`,
            headers: {
                Authorization: "Bearer " + usuario
            },
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                history.push('/dashboard/imposto');
                Carregamento();
                toast.info('imposto deletado com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    async function handlEditar(id){
        history.push(`/dashboard/imposto/editar/${id}`);
    }

    const Carregamento = async () => {
        const usuario = localStorage.getItem('@usuario');
        setUsuario(JSON.parse(usuario).token);
        var config = {
            method: 'GET',
            url: api.url_api + '/imposto',
            headers: {
                Authorization: "Bearer " + JSON.parse(usuario).token
            }
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                setImposto(resposta.data);
            }
        } catch (error) {
            toast.error(error.response.data.errror);
        }
    }

    useEffect(() => {
        Carregamento();
    }, [])

    return (
        <div className="main-content-container p-4 container-fluid">
            <div >
                <Button onClick={() => { history.push('/dashboard/imposto/novo') }} type="button" className="button button-primary">
                    Novo imposto
                </Button><br />
                <h2 style={{ textAlign: "center" }}>
                    <Badge bg="secondary">Lista de imposto</Badge>
                </h2>
                <div class="row">
                    <div class="col-lg-12">
                        <Card >

                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th style={{ width: '20%' }} >Id</th>
                                        <th style={{ width: '70%' }}>imposto</th>
                                        <th >Editar</th>
                                        <th >Excluir</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {imposto.map((v, i) => (                                    
                                    <tr>
                                        <td style={{ width: '20%' }}>{v.id}</td>
                                        <td style={{ width: '70%' }}>{v.nome}</td>
                                        <td > <Link onClick={() => {handlEditar(v.id)}} ><AiFillEdit /></Link> </td>
                                        <td > <Link onClick={() => {handleDel(v.id)}} ><AiFillDelete /></Link> </td>
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

export default Imposto;