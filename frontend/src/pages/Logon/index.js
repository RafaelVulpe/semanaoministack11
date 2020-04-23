import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function Login(e){
        e.preventDefault();


        try {
            const resposta = await api.post('sessions', { id });
            
            localStorage.setItem('ongI', id);
            localStorage.setItem('ongName', resposta.data.nome)

            history.push('/profile');
        } catch (error) {
            alert('Falha no login, tente novamente.');            
        }
        

    }    

    return (
        <header>
           <div className="logon-container">
               <section className="form">
                 <img src={logoImg} alt="Be The Hero"/> 
                 <form onSubmit={Login} >
                     <h1>Faça seu logon</h1>
                     
                     <input 
                        type="text" 
                        placeholder="Sua ID"                  
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                     <button className="button" type="submit">Entrar</button>

                     <Link className="back-link" to="/register">
                         <FiLogIn size={16} color="#E02041" />
                         Não tenho cadastro

                     </Link>

                 </form>

               </section>

               <img src={heroesImg} alt="Heroes"/>
           </div>
        </header>
    );
}