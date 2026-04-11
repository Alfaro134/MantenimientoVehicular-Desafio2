import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, { FadeInDown, FadeOut, Layout } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"; // Iconos para el diseño
import { colors, shadows } from "../theme"; // Importación de sombras y espaciado

export function PartCard({
  index,
  pieza,
  marca,
  precio,
  fechaCambio,
  onOpenDetail,
  onDelete,
}) {
  const stagger = Math.min(index, 12) * 72;

  // Lógica para elegir icono según la pieza
  const getIcon = (name) => {
    const lowerName = name?.toLowerCase() || "";
    if (lowerName.includes("bujia"))
      return (
        <MaterialCommunityIcons
          name="spark-plug"
          size={26}
          color={colors.textPrimary}
        />
      );
    if (lowerName.includes("filtro"))
      return (
        <Ionicons name="filter-outline" size={26} color={colors.textPrimary} />
      );
    if (lowerName.includes("llanta"))
      return (
        <MaterialCommunityIcons
          name="tire"
          size={26}
          color={colors.textPrimary}
        />
      );
    return (
      <Ionicons name="settings-outline" size={26} color={colors.textPrimary} />
    );
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(stagger)
        .springify()
        .damping(16)
        .stiffness(280)}
      exiting={FadeOut.duration(200)}
      layout={Layout.springify().damping(18).stiffness(300)}
      style={[styles.cardOuter, shadows.neomorphicDark]}
    >
      <BlurView intensity={28} tint="dark" style={styles.blur}>
        <View style={styles.inner}>
          {/* Contenedor de Icono con efecto hundido  */}
          <View style={[styles.iconBox, shadows.inset]}>{getIcon(pieza)}</View>

          <View style={styles.contentInfo}>
            {/* ontenedor para alinear info al centro */}
            <Pressable
              onPress={onOpenDetail}
              style={({ pressed }) => [
                styles.mainPress,
                pressed && styles.mainPressPressed,
              ]}
            >
              <Text style={styles.valueTitle}>{pieza || "—"}</Text>
              {/* Estilo de título destacado */}
              <Text style={styles.labelSub}>
                Marca: <Text style={styles.valueSub}>{marca || "N/A"}</Text>
                {/* Campo de Marca */}
              </Text>
              {precio && ( // Mostrar precio si existe
                <Text style={styles.priceText}>${precio}</Text>
              )}
            </Pressable>
          </View>
          <View style={styles.rightAction}>
            <View style={styles.dateBadge}>
              <Ionicons
                name="calendar-outline"
                size={12}
                color={colors.textMuted}
              />
              <Text style={styles.dateText}>{fechaCambio || "—"}</Text>
            </View>
            <Pressable
              onPress={onDelete}
              style={({ pressed }) => [
                styles.deleteBtn,
                pressed && styles.deleteBtnPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Eliminar pieza"
            >
              <Ionicons
                name="trash-outline"
                size={14}
                color={colors.danger}
                style={{ marginRight: 4 }}
              />
              {/* Icono basura */}
              <Text style={styles.deleteText}>Eliminar</Text>
            </Pressable>
          </View>
        </View>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardOuter: {
    marginBottom: 14,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borderGlass,
    backgroundColor: colors.surface,
  },
  blur: {
    borderRadius: 22,
    overflow: "hidden",
  },
  inner: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(13, 13, 15, 0.4)",
  },
  iconBox: {
    //  Estilo del cuadro del icono
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#050505", // Color inset
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  contentInfo: {
    // Estilo para la columna central
    flex: 1,
    justifyContent: "center",
  },
  valueTitle: {
    // Título de la pieza destacado
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 2,
  },
  labelSub: {
    //  Texto secundario para marca
    color: colors.textMuted,
    fontSize: 13,
  },
  valueSub: {
    //  Valor de la marca
    color: "rgba(245, 245, 247, 0.8)",
    fontWeight: "500",
  },
  priceText: {
    // Texto de precio con color de acento
    color: "#00ced1",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },
  rightAction: {
    //  Alineación de acciones a la derecha
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 65,
  },
  dateBadge: {
    // Estilo para la fecha superior
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    // Texto de fecha
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
  },
  mainPress: {
    paddingBottom: 0,
  },
  mainPressPressed: {
    opacity: 0.7,
  },
  labelPieza: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginBottom: 6,
  },
  labelFecha: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: "500",
  },
  deleteBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "rgba(255, 59, 48, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 59, 48, 0.25)",
  },
  deleteBtnPressed: {
    backgroundColor: "rgba(255, 59, 48, 0.25)",
  },
  deleteText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: "700",
  },
});
