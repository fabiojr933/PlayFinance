
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
import { BallTriangle } from 'react-loader-spinner'

const Transferencia = () => {

    const history = useHistory();
    const [transferencia, setTransferencia] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [loading, setLoading] = useState(true);


    const handleDel = async (id) => {
        if (!id) {
            return toast.error('Selecione uma transferencia para deletar');
        }
        const config = {
            method: 'DELETE',
            url: api.url_api + `/transferencia/${id}`,
            headers: {
                Authorization: "Bearer " + usuario
            },
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                history.push('/dashboard/transferencia');
                Carregamento();
                toast.info('Transferencia deletado com sucesso');
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    async function handlEditar(id) {
        history.push(`/dashboard/transferencia/editar/${id}`);
    }

    const Carregamento = async () => {
        const usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
            setUsuario(JSON.parse(usuario).token);
            var config = {
                method: 'GET',
                url: api.url_api + '/transferencia',
                headers: {
                    Authorization: "Bearer " + JSON.parse(usuario).token
                }
            }
            try {
                const resposta = await axios(config);
                if (resposta.status == 200) {
                    setTransferencia(resposta.data);
                }
            } catch (error) {
                toast.error(error.response.data.errror);
            }
        }
    }

    useEffect(() => {
        Carregamento();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [])

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
            <div className="main-content-container p-4 container-fluid">
                <div >
                    <Button onClick={() => { history.push('/dashboard/transferencia/novo') }} type="button" className="button button-primary">
                        Novo transferencia
                    </Button><br />
                    <h2 style={{ textAlign: "center" }}>
                        <Badge bg="secondary">Lista de transferencia</Badge>
                    </h2>
                    <div className="row">
                        <div className="col-lg-12">
                            <Card >

                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th style={{ width: '20%' }} >Id</th>
                                            <th style={{ width: '70%' }}>transferencia</th>
                                            <th >Editar</th>
                                            <th >Excluir</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {transferencia.map((v, i) => (
                                            <tr key={v.id}>
                                                <td style={{ width: '20%' }}>{v.id}</td>
                                                <td style={{ width: '70%' }}>{v.nome}</td>
                                                <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handlEditar(v.id) }} ><AiFillEdit /></a> </td>
                                                <td > <a style={{ cursor: "pointer", color: '#017BFE' }} onClick={() => { handleDel(v.id) }} ><AiFillDelete /></a> </td>
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

export default Transferencia;
