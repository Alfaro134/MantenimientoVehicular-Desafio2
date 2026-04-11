import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { colors } from "../theme";

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value || "—"}</Text>
    </View>
  );
}

export function DetailModal({ visible, part, onClose }) {
  const { height } = useWindowDimensions();

  if (!part) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlayRoot}>
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ type: "timing", duration: 220 }}
          style={StyleSheet.absoluteFill}
        >
          <Pressable
            style={styles.backdrop}
            onPress={onClose}
            accessibilityRole="button"
          >
            <BlurView
              intensity={45}
              tint="dark"
              style={StyleSheet.absoluteFill}
            />
          </Pressable>
        </MotiView>

        <View style={styles.center} pointerEvents="box-none">
          <MotiView
            from={{ opacity: 0, scale: 0.94, translateY: 12 }}
            animate={{
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.94,
              translateY: visible ? 0 : 12,
            }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            style={[styles.sheet, { maxHeight: height * 0.72 }]}
          >
            <BlurView intensity={50} tint="dark" style={styles.sheetBlur}>
              <View style={styles.sheetInner}>
                <Text style={styles.title}>Detalle de la pieza</Text>

                <View style={styles.list}>
                  <Row label="Pieza" value={part.pieza} />
                  <Row label="Marca" value={part.marca} />
                  <Row label="No. Serie" value={part.serie} />
                  <Row label="Fecha de Cambio" value={part.fechaCambio} />
                </View>

                <Pressable
                  onPress={onClose}
                  style={({ pressed }) => [
                    styles.closeBtn,
                    pressed && styles.closeBtnPressed,
                  ]}
                  accessibilityRole="button"
                >
                  <Text style={styles.closeText}>Cerrar</Text>
                </Pressable>
              </View>
            </BlurView>
          </MotiView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  sheet: {
    width: "100%",
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borderGlass,
  },
  sheetBlur: {
    borderRadius: 22,
    overflow: "hidden",
  },
  sheetInner: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    backgroundColor: "rgba(8,8,10,0.72)",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
    marginBottom: 18,
    textAlign: "center",
  },
  list: {
    gap: 14,
    marginBottom: 22,
  },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(255,255,255,0.08)",
    paddingBottom: 12,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  rowValue: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
  closeBtn: {
    alignSelf: "stretch",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: colors.borderGlass,
    alignItems: "center",
  },
  closeBtnPressed: {
    opacity: 0.88,
  },
  closeText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
});
