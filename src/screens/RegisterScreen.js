import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MotiView } from "moti";
import { colors, shadows } from "../theme";

const field = (label, props) => (
  <View style={styles.fieldBlock}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <View style={[styles.inputWrapper, shadows.inset]}>
      {" "}
      {/* Envoltura para efecto hundido */}
      <TextInput placeholderTextColor="rgba(245,245,247,0.35)" {...props} />
    </View>
  </View>
);

export function RegisterScreen({ onSave, onCancel }) {
  const insets = useSafeAreaInsets();
  const [pieza, setPieza] = useState("");
  const [marca, setMarca] = useState("");
  const [serie, setSerie] = useState("");
  const [precio, setPrecio] = useState("");
  const [fechaCambio, setFechaCambio] = useState("");

  const handleSave = () => {
    //Validación simple para asegurar que el precio sea número
    if (!pieza || !precio) {
      alert("Por favor ingresa al menos la pieza y el precio.");
      return;
    }

    onSave({
      pieza: pieza.trim(),
      marca: marca.trim(),
      serie: serie.trim(),
      precio: precio.trim(),
      fechaCambio: fechaCambio.trim(),
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.96, translateY: 10 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{ type: "spring", damping: 22, stiffness: 320 }}
        style={[
          styles.root,
          { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 12 },
        ]}
      >
        <Text style={styles.header}>Nueva Pieza</Text>{" "}
        {/* Título más corto estilo Dashboard */}
        <ScrollView
          style={styles.formScrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.formScroll}
        >
          {field("Pieza", {
            style: styles.input,
            value: pieza,
            onChangeText: setPieza,
            placeholder: "Nombre de la pieza",
            autoCapitalize: "sentences",
          })}
          {field("Marca", {
            style: styles.input,
            value: marca,
            onChangeText: setMarca,
            placeholder: "Marca",
            autoCapitalize: "words",
          })}
          {field("No. Serie", {
            style: styles.input,
            value: serie,
            onChangeText: setSerie,
            placeholder: "Número de serie",
            autoCapitalize: "characters",
          })}
          {field("Precio ($)", {
            style: styles.input,
            value: precio,
            onChangeText: setPrecio,
            placeholder: "0.00",
            keyboardType: "numeric", // Teclado numérico
          })}

          {field("Fecha de Cambio", {
            style: styles.input,
            value: fechaCambio,
            onChangeText: setFechaCambio,
            placeholder: "Ej. 2026-04-10 o 10/04/2026",
          })}
        </ScrollView>
        <View style={styles.footer}>
          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.primaryBtn,
              pressed && styles.primaryBtnPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.primaryText}>Guardar</Text>
          </Pressable>
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => [
              styles.secondaryBtn,
              pressed && styles.secondaryBtnPressed,
            ]}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryText}>Cancelar</Text>
          </Pressable>
        </View>
      </MotiView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.bg },
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 22,
  },
  formScrollView: {
    flex: 1,
  },
  formScroll: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  fieldBlock: {
    marginBottom: 20,
  },
  fieldLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  inputWrapper: {
    // Contenedor para el efecto de profundidad
    backgroundColor: "#050505", // Color inset (fondo oscuro)
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 16,
    height: 52, // Altura fija para consistencia
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: "auto",
    paddingTop: 12,
  },
  primaryBtn: {
    flex: 2,
    backgroundColor: colors.textPrimary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryBtnPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  primaryText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.borderGlass,
    backgroundColor: "transparent",
  },
  secondaryBtnPressed: {
    opacity: 0.85,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  secondaryText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
});
