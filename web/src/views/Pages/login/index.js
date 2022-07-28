import React from "react";
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();

    return (
        <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Sign in</h3>

                                <div className="form-outline mb-4">
                                    <input type="email" placeholder="Email" className="form-control form-control" />
                                </div>

                                <div className="form-outline mb-4">
                                    <input type="password" placeholder="Senha" className="form-control form-control" />
                                </div>

                                <button className="btn btn-primary btn btn-block" type="submit">Login</button>

                                <hr className="my-4" />

                                <button className="btn btn btn-block btn-primary" style={{ backgroundColor: ' #dd4b39' }}
                                 onClick={() => {history.push('/register')}}   type="submit"><i className="fab fa-google me-2"></i> Cadastrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;