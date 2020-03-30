import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    const [casos, setCasos] = useState([]);

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    
    useEffect(() => {
        api.get('profile',{
            headers: {
                Authorization: ongId,
            }
        }).then(resposta => {
            setCasos(resposta.data)    
        } );

    }, [ongId]);

    async function deletaCaso(id){
        try {
            await api.delete(`casos/${id}`,{
                headers: {
                    Authorization: ongId,
                }
            });  
            
            setCasos(casos.filter(caso => caso.id !== id));

        } catch (error) {
            alert('Não foi possível deletar o caso, tente novamente.');
        }
    }

    function Logout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/caso/novo">Cadastrar novo caso</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.titulo}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{caso.descricao}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(caso.valor)}</p>

                        <button onClick={() => deletaCaso(caso.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>            
                ))}
            </ul>
        </div>
    );
}