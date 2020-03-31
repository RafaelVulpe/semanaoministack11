import React from 'react';
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detalhes() {
    const route = useRoute();
    
    const caso = route.params.caso;

    const navigation = useNavigation();
    const mensagem = `Olá ${caso.nome}, estou entrando em contato pois gostaria de ajudar no caso "${caso.titulo}", com o valor de ${
        Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(caso.valor)
    } .`;

    
    

    function Voltar(){
        navigation.goBack();
    }

    function enviarEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${caso.titulo}` ,
            recipients: [caso.email],
            body: mensagem,
        });
    }

    function enviarWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${mensagem}`);    
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                
                <TouchableOpacity onPress={Voltar}>
                    <Feather name="arrow-left" size={28} color="#E02041"/>
                </TouchableOpacity>
            </View>  
            <View style={styles.casos}>
                <Text style={[styles.propriedadeCaso, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.valorCaso}>{caso.nome} de {caso.cidade}-{caso.uf}</Text>        

                <Text style={styles.propriedadeCaso}>CASO:</Text>
                <Text style={styles.valorCaso}>{caso.titulo}</Text>

                <Text style={styles.propriedadeCaso}>DESCRIÇÃO:</Text>
                <Text style={styles.valorCaso}>{caso.descricao}</Text>

                <Text style={styles.propriedadeCaso}>VALOR:</Text>
                <Text style={styles.valorCaso}>
                    {
                        Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(caso.valor)
                    }</Text>       
            </View>

            <View style={styles.caixaContato}>
                <Text style={styles.tituloHeroi}>Salve o dia!</Text>    
                <Text style={styles.tituloHeroi}>Seja o herói desse caso.</Text>

                <Text style={styles.descricaoHeroi}>Entre em contato:</Text>

                <View style={styles.acoes}>
                    <TouchableOpacity style={styles.acao} onPress={enviarWhatsapp}>
                        <Text style={styles.textoAcao}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.acao} onPress={enviarEmail}>
                        <Text style={styles.textoAcao}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            
            </View>               
        </View>
    );
}