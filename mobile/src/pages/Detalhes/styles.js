import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    casos: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
        marginTop: 24    
    },

    propriedadeCaso: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold',
        marginTop: 24
    },

    valorCaso: {
        marginTop: 8,
        fontSize: 15,        
        color: '#737380',
    },

    caixaContato: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,   
    },

    tituloHeroi: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#13131a',
        lineHeight: 30
    },

    descricaoHeroi: {
        fontSize: 15,
        color: '#737380',
        marginTop: 16,
    },

    acoes: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    acao: {
        backgroundColor: '#e02041',
        borderRadius: 8,
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textoAcao: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold'
    }

})