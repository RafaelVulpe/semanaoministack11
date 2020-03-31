import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Casos() {
    const [caso, setCaso] = useState([]);
    const [total, setTotal] = useState(0);
    
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function paginaDetalhes(caso){
        navigation.navigate('Detalhes', { caso });
    }

    async function lerCaso() {


        if (loading) {
            return;
        }

        if (total > 0 && caso.length == total){
            return;
        }


        setLoading(true);

        const resposta = await api.get('casos', {
            params: { page }
        })

        setCaso([...caso, ...resposta.data]);
        setTotal(resposta.headers['x-total-count']);
        setLoading(false);
        setPage(page + 1);
        
    }

    useEffect(() => {lerCaso()}, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                data={caso}
                style={styles.listaCasos}                
                keyExtractor={caso => String(caso.id)}                
                showsVerticalScrollIndicator={false}                
                onEndReached={lerCaso}
                onEndReachedThreshold={0.2}
                renderItem={( { item: caso }) => (
                    <View style={styles.casos}>
                        <Text style={styles.propriedadeCaso}>ONG:</Text>
                        <Text style={styles.valorCaso}>{caso.nome}</Text>

                        <Text style={styles.propriedadeCaso}>CASO:</Text>
                        <Text style={styles.valorCaso}>{caso.titulo}</Text>

                        <Text style={styles.propriedadeCaso}>VALOR:</Text>
                        <Text style={styles.valorCaso}>
                        {
                            Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(caso.valor)
                        }</Text>

                        <TouchableOpacity 
                            style={styles.botaoDetalhe} 
                            onPress={() => paginaDetalhes(caso)}
                        >
                            <Text style={styles.textoBotaoDetalhe}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View> 
                )}
            />

        </View>  
    );
}