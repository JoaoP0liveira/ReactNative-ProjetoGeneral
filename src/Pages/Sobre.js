import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function Sobre() {
  const [contatos, setContatos] = useState([]);

  // Função para buscar contatos do servidor
  const listContatos = () => {
    axios
      .get('http://10.0.2.2:3000/contatos')
      .then((resposta) => {
        setContatos(resposta.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar contatos", error);
      });
  };

  // Função para excluir um contato
  const deleteContato = (id) => {
    axios
      .delete(`http://10.0.2.2:3000/contatos/${id}`)
      .then(() => {
        setContatos(contatos.filter((contato) => contato.id !== id));
        Alert.alert("Sucesso", "Contato excluído com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao excluir contato", error);
        Alert.alert("Erro", "Não foi possível excluir");
      });
  };

  // Use o useEffect para buscar dados
  useEffect(() => {
    listContatos();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Lista de Contatos</Text>
        {contatos.length > 0 ? (
          contatos.map((contato, index) => (
            <View key={index} style={styles.contatoItem}>
              <Text style={styles.nome}>{contato.nome}</Text>
              <Text style={styles.telefone}>{contato.telefone}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteContato(contato.id)}
              >
                <Text style={styles.deleteButtonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noContacts}>Nenhum contato disponível</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  contatoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  telefone: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF', // Cor azul
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  noContacts: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});
