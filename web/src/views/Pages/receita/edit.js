 import React, { Component } from "react";
 import { useHistory } from 'react-router-dom';
 import { TextInput } from "../../../components/TextInput";
 import { Button } from "../../../components/Button";
 import { Form } from "react-bootstrap";

 
 const ReceitaEdit = () => {
    const history = useHistory();

     return (
       <div className="main-content-container p-4 container-fluid">       
            <div >
                <Button  onClick={() => {history.goBack()}} type="button" className="button button-primary">
                    Voltar
                </Button>
                </div>
           <div class="row">
             <div class="col-lg-6">
               <div class="card">               
                 <div class="card-body">
                   <div id="pay-invoice">
                     <div class="card-body">
                       <div class="card-title">
                         <h3 class="text-center">Editar receita</h3>
                       </div>
                       <hr />
                       <form name="form" >                         
                         <TextInput
                           name="receita"
                           label="Nome da receita"                          
                           required={true}
                           error={false}
                           errorText="please Enter Card Name"
                         />      
                         <Button
                           className="button button-primary"
                           type="submit"
                         >
                           Cadastrar
                         </Button>
                       </form>
                     </div>
                   </div>
                 </div>
               </div>
             </div>       
           
           </div>
         </div>
     );
   }

 
 export default ReceitaEdit;
 