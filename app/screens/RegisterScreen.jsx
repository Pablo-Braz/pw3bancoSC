import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { register } from '../service/authService';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cargo, setCargo] = useState('');
  const [avatar, setAvatar] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    try {
      const result = await register({ nome, email, senha, cargo, avatar });

      Alert.alert('Sucesso', result.message || 'Cadastro realizado com sucesso');

      setNome('');
      setEmail('');
      setSenha('');
      setCargo('');
      setAvatar('');

      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Erro', e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" keyboardType="email-address" />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} secureTextEntry />
      <TextInput placeholder="Cargo" value={cargo} onChangeText={setCargo} style={styles.input} />
      <TextInput placeholder="Avatar (nome do arquivo)" value={avatar} onChangeText={setAvatar} style={styles.input} />
      <Button title={loading ? 'Cadastrando...' : 'Cadastrar'} onPress={handleRegister} />
      <View style={{ height: 12 }} />
      <Button title="Entrar" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { height: 48, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 10, marginBottom: 12, borderRadius: 6 },
  title: { fontSize: 24, marginBottom: 12, textAlign: 'center' }
});