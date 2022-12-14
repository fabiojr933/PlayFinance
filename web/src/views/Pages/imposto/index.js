
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

const Imposto = () => {

    const history = useHistory();
    const [imposto, setImposto] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [loading, setLoading] = useState(true);

  
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

    async function handlEditar(id) {
        history.push(`/dashboard/imposto/editar/${id}`);
    }

    const Carregamento = async () => {
        const usuario = localStorage.getItem('@usuario');
        if (!usuario) {
            history.push('/login');
        } else {
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
                    <Button onClick={() => { history.push('/dashboard/imposto/novo') }} type="button" className="button button-primary">
                        Novo imposto
                    </Button><br />
                    <h2 style={{ textAlign: "center" }}>
                        <Badge bg="secondary">Lista de imposto</Badge>
                    </h2>
                    <div className="row">
                        <div className="col-lg-12">
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

export default Imposto;
