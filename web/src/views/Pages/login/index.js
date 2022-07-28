import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        const data = { 'email': email, 'senha': senha };
        const config = {
            method: 'post',
            url: api.url_api + '/login',
            data: data
        }
        try {
            const resposta = await axios(config);
            if (resposta.status == 200) {
                let usuario = {
                    'email': resposta.data.email,
                    'id_usuario': resposta.data.id,
                    'token': resposta.data.token
                };
                localStorage.setItem('@usuario', JSON.stringify(usuario));
                history.push('/dashio-admin/dashboard');
                toast.info(`Bem vindo ${email} ao dashboard`);
            }
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <form onSubmit={handleLogin}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">

                                    <h3 className="mb-5">Sign in</h3>

                                    <div className="form-outline mb-4">
                                        <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} className="form-control form-control" />
                                    </div>

                                    <div className="form-outline mb-4">
                                        <input type="password" placeholder="Senha" onChange={(e) => { setSenha(e.target.value) }} className="form-control form-control" />
                                    </div>

                                    <button className="btn btn-primary btn btn-block" type="submit">Login</button>

                                    <hr className="my-4" />

                                    <button className="btn btn btn-block btn-primary" style={{ backgroundColor: ' #dd4b39' }}
                                        onClick={() => { history.push('/register') }} type="submit"><i className="fab fa-google me-2"></i> Cadastrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    )
}
export default Login;