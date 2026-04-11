export const colors = {
  bg: "#000000",
  surface: "#0d0d0f",
  surfaceGlass: "rgba(255, 255, 255, 0.06)",
  borderGlass: "rgba(255, 255, 255, 0.12)",
  textPrimary: "#f5f5f7",
  textMuted: "rgba(245, 245, 247, 0.55)",
  accent: "#e8e8ed",
  danger: "#ff3b30",
  dangerPressed: "#c62828",
  meshAccent: "rgba(120, 120, 200, 0.15)",
  meshAccent2: "rgba(80, 160, 255, 0.12)",

  // Agregamos estos para el Dashboard
  success: "#4caf50",
  chartAccent: "#00ced1",
  surfaceInset: "#050505", // Color para el efecto en inputs
};

export const shadows = {
  // Sombra para tarjetas que "salen" de la pantalla (Elevadas)
  neomorphic: {
    shadowColor: "#ffffff",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 5, // Android
  },
  // Sombra oscura para el borde inferior derecho
  neomorphicDark: {
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  // Efecto para inputs hundidos (Inset)
  inset: {
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 2,
  },
};

// Espaciados estándar para que todo se vea alineado
export const spacing = {
  padding: 20,
  borderRadius: 20,
  cardRadius: 24,
};
