import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.topo}>
      <Text style={styles.tituloHeader}>InfoSass</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topo: {
    width: "100%",
    height: 120,
    backgroundColor: "#4b6584", // Um azul escuro elegante para o fundo
    justifyContent: "center", // Centraliza o conteúdo verticalmente
    alignItems: "center", // Centraliza o conteúdo horizontalmente
    shadowColor: "#000", // Sombra para efeito de profundidade
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  tituloHeader: {
    color: "#fff", // Texto branco para contraste
    fontWeight: "bold",
    fontSize: 26, // Fonte maior para destaque
    letterSpacing: 2, // Espaçamento entre letras para um efeito elegante
    textTransform: "uppercase", // Todas as letras maiúsculas para impacto
  },
});
