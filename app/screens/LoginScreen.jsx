import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../service/authService';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    // Função para lidar com o login
    async function handleLogin() {
        setLoading(true);
        try {
            const data = await login(email, senha);

            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));

            Alert.alert('Sucesso', 'Login realizado com sucesso');
            setEmail('');
            setSenha('');
            navigation.navigate('Home');
        } catch (e) {
            Alert.alert('Erro', e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                style={styles.input}
                secureTextEntry
            />
            <Button title={loading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} />
            <View style={{ height: 12 }} />
            <Button title="Criar conta" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    input: { height: 48, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginBottom: 12, borderRadius: 6 },
    title: { fontSize: 24, marginBottom: 12, textAlign: 'center' }
});