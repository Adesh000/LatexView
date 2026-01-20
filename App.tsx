/**
 * LaTeX Demo App
 * Demonstrates native LaTeX rendering on React Native
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import LatexView from './src/components';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
    flex: 1,
  };

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardBg = isDarkMode ? '#2a2a2a' : '#ffffff';

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Text style={[styles.title, { color: textColor }]}>
            LaTeX Native Module Demo
          </Text>
          <Text style={[styles.subtitle, { color: textColor }]}>
            Native Android rendering with JLaTeXMath
          </Text>

          {/* Basic Equations */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Basic Equations
            </Text>
            <LatexView
              latex="x^2 + y^2 = z^2"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
              onLoad={() => console.log('Pythagorean theorem rendered')}
              onError={error => console.error('Error:', error)}
            />
            <LatexView
              latex="E = mc^2"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="a^2 + b^2 = c^2"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
          </View>

          {/* Fractions */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Fractions
            </Text>
            <LatexView
              latex="\\frac{a}{b}"
              textSize={28}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\frac{x^2 + y^2}{z}"
              textSize={28}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\frac{\\partial f}{\\partial x}"
              textSize={28}
              textColor={textColor}
              style={styles.latex}
            />
          </View>

          {/* Complex Formulas */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Complex Formulas
            </Text>
            <LatexView
              latex="\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}"
              textSize={26}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1"
              textSize={26}
              textColor={textColor}
              style={styles.latex}
            />
          </View>

          {/* Greek Letters and Symbols */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Greek Letters & Symbols
            </Text>
            <LatexView
              latex="\\alpha + \\beta = \\gamma"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\Delta = \\sum \\pi r^2"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\theta = \\arctan(\\frac{y}{x})"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
          </View>

          {/* Matrices */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Matrices
            </Text>
            <LatexView
              latex="\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}"
              textSize={24}
              textColor={textColor}
              style={styles.latex}
            />
            <LatexView
              latex="\\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}"
              textSize={22}
              textColor={textColor}
              style={styles.latex}
            />
          </View>

          {/* Colored Equations */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Custom Colors
            </Text>
            <LatexView
              latex="f(x) = x^3 - 3x + 1"
              textSize={26}
              textColor="#2563eb"
              style={styles.latex}
            />
            <LatexView
              latex="\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}"
              textSize={22}
              textColor="#dc2626"
              style={styles.latex}
            />
            <LatexView
              latex="\\sqrt{a^2 + b^2}"
              textSize={28}
              textColor="#059669"
              style={styles.latex}
            />
          </View>

          {/* Error Handling */}
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text style={[styles.cardTitle, { color: textColor }]}>
              Error Handling
            </Text>
            <Text style={[styles.description, { color: textColor }]}>
              Invalid LaTeX should gracefully show an error:
            </Text>
            <LatexView
              latex="\\invalid{syntax here"
              textSize={20}
              textColor={textColor}
              style={styles.latex}
              onError={error => console.log('Expected error:', error)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    opacity: 0.7,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  latex: {
    height: 80,
    marginBottom: 12,
  },
});

export default App;
