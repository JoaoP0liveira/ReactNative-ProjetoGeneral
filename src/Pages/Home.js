import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Card from "../Components/Card";

export default function () {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.tituloContato}>Seja bem-vindo(a)!</Text>
      <Card
        title="Sobre"
        content="Saiba mais sobre nós e nossos serviços."
        buttonText="Ir para Sobre"
        onPress={() => navigation.navigate("Sobre")}
      />
      <Text style={styles.tituloInfo}>Mais informações</Text>
      <Card
        title="Contato"
        content="Clique abaixo para entrar em contato"
        buttonText="Ir para Contato"
        onPress={() => navigation.navigate("Contato")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f9", // Um cinza quase branco suave para o fundo
  },
  tituloContato: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
    color: "#4e4e50", // Cinza escuro elegante para o título principal
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  tituloInfo: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
    color: "#6d6875", // Tom de lavanda suave para destaque
  },
  card: {
    borderRadius: 16,
    elevation: 6, // Sombra mais pronunciada para Android
    shadowColor: "#aaa",
    shadowOffset: { width: 0, height: 4 }, // Sombra para iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 12,
    borderColor: "#e1e1e1", // Uma borda suave para dar estrutura ao card
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#403d39", // Cinza escuro para o título dos cards
  },
  cardContent: {
    fontSize: 16,
    color: "#7a7a7a", // Cinza médio para o conteúdo dos cards
    marginVertical: 10,
  },
  cardButton: {
    padding: 12,
    backgroundColor: "#f1c40f", // Dourado suave para os botões
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
