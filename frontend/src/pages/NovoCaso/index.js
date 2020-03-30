import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function NovoCaso(){

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    
    const [titulo, setTitulo] = useState([]);
    const [descricao, setDescricao] = useState([]);
    const [valor, setValor] = useState([]);

    async function cadastraNovoCaso(e){
        e.preventDefault();

        const dados = {
            titulo,
            descricao,
            valor
        }

        try {
            
            await api.post('casos', dados, {
                headers: {
                    Authorization: ongId,
                }
            });        

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');            
        }        
    }


    return (
        <div className="novo-caso-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    
                    <Link className="back-link" to="/profile">
                         <FiArrowLeft size={16} color="#E02041" />
                         Voltar para home

                     </Link>
                </section>

                <form onSubmit={cadastraNovoCaso}>
                    <input 
                        placeholder="Título do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>

                </form>
            </div>
        </div>
    );
}