import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import axios from 'axios';

export default function Sobre() {
  const [contatos, setContatos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContato, setSelectedContato] = useState(null);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

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

  const openEditModal = (contato) => {
    setSelectedContato(contato);
    setNome(contato.nome);
    setTelefone(contato.telefone);
    setModalVisible(true);
  };

  const editContato = () => {
    axios
      .put(`http://10.0.2.2:3000/contatos/${selectedContato.id}`, { nome, telefone })
      .then(() => {
        setContatos(
          contatos.map((contato) =>
            contato.id === selectedContato.id ? { ...contato, nome, telefone } : contato
          )
        );
        setModalVisible(false);
        Alert.alert("Sucesso", "Contato atualizado com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao atualizar contato", error);
        Alert.alert("Erro", "Não foi possível atualizar o contato");
      });
  };

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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(contato)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteContato(contato.id)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noContacts}>Nenhum contato disponível</Text>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Editar Contato</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
              <TouchableOpacity style={styles.saveButton} onPress={editContato}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
