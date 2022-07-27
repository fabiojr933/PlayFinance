
import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const Receita = () => {

    const history = useHistory();

    return (
        <div className="main-content-container p-4 container-fluid">         
            <div >
                <Button  onClick={() => {history.push('/dashboard/receita/novo')}} type="button" className="button button-primary">
                    Nova receita
                </Button><br /><br />
                <div class="row">
                    <div class="col-lg-12">
                        <Card>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '20%'}} >Firstname</th>
                                        <th style={{width: '70%'}}>Lastname</th>
                                        <th >Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{width: '20%'}}>John</td>
                                        <td style={{width: '70%'}}>Doe</td>
                                        <td > <a href=""><AiFillEdit/></a> </td>
                                        <td > <a href=""><AiFillDelete/></a> </td>
                                    </tr>
                                    <tr>
                                        <td>Mary</td>
                                        <td>Moe</td>
                                        <td > <a href=""><AiFillEdit/></a> </td>
                                        <td > <a href=""><AiFillDelete/></a> </td>
                                    </tr>
                                    <tr>
                                        <td>July</td>
                                        <td>Dooley</td>
                                        <td > <a href=""><AiFillEdit/></a> </td>
                                        <td > <a href=""><AiFillDelete/></a> </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Receita;
