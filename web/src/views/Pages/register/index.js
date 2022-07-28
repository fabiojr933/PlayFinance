import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

    const history = useHistory();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleSalvar(e) {
        e.preventDefault();
        const data = { 'nome': nome, 'email': email, 'senha': senha };
        var config = {
            method: 'post',
            url: api.url_api + '/usuario',
            data: data
        }
        try {
            console.log(config);
            let resposta = await axios(config);
            if (resposta.status == 201) {
                history.push('/login');
                toast.info('Agora você pode fazer o login');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error);
        }

    }

    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <form onSubmit={handleSalvar}>
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Cadastrar</h3>

                                    <div className="form-outline mb-4">
                                        <input type="text" placeholder="Nome" onChange={(e) => { setNome(e.target.value) }} className="form-control form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" placeholder="Senha" onChange={(e) => { setSenha(e.target.value) }} className="form-control form-control" />
                                    </div>

                                    <button className="btn btn-primary btn btn-block" type="submit">Cadastar</button>

                                    <hr className="my-4" />

                                    <button className="btn btn btn-block btn-primary" style={{ backgroundColor: ' #dd4b39' }}
                                        onClick={() => { history.push('/login') }} type="submit"><i className="fab fa-google me-2"></i> Já tenho cadastro</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;