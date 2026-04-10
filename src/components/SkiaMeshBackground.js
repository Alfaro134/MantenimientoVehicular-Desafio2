import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Rect,
  LinearGradient,
  RadialGradient,
  vec,
  Group,
  Path,
  Skia,
} from '@shopify/react-native-skia';
import { colors } from '../theme';

function buildMeshyPaths(width, height) {
  const p = Skia.Path.Make();
  const step = Math.max(width, height) / 8;
  for (let i = -2; i < 12; i++) {
    const x = i * step * 0.9;
    p.moveTo(x, 0);
    p.lineTo(x + height * 0.35, height);
  }
  for (let j = -2; j < 10; j++) {
    const y = j * step * 0.85;
    p.moveTo(0, y);
    p.lineTo(width, y + width * 0.22);
  }
  return p;
}

export function SkiaMeshBackground() {
  const { width, height } = useWindowDimensions();
  const meshPath = React.useMemo(() => buildMeshyPaths(width, height), [width, height]);

  return (
    <Canvas style={[StyleSheet.absoluteFill, styles.canvas]} pointerEvents="none">
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={['#030305', '#000000', '#06060a']}
        />
      </Rect>

      <Group opacity={0.45}>
        <Rect x={-width * 0.2} y={-height * 0.15} width={width * 1.4} height={height * 0.75}>
          <RadialGradient
            c={vec(width * 0.2, height * 0.15)}
            r={width * 0.95}
            colors={[colors.meshAccent, 'transparent']}
          />
        </Rect>
        <Rect x={width * 0.15} y={height * 0.35} width={width} height={height * 0.7}>
          <RadialGradient
            c={vec(width * 0.85, height * 0.55)}
            r={height * 0.85}
            colors={[colors.meshAccent2, 'transparent']}
          />
        </Rect>
        <Rect x={0} y={height * 0.55} width={width * 0.55} height={height * 0.5}>
          <RadialGradient
            c={vec(0, height * 0.9)}
            r={width * 0.7}
            colors={['rgba(180, 100, 255, 0.08)', 'transparent']}
          />
        </Rect>
      </Group>

      <Path path={meshPath} style="stroke" strokeWidth={0.35} color="rgba(255,255,255,0.04)" />
    </Canvas>
  );
}

const styles = StyleSheet.create({
  canvas: {
    zIndex: 0,
  },
});
