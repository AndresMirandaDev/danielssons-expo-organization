import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

export default function RemovedScreen({ visible, onDone }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/animations/trash.json')}
          autoPlay
          loop={false}
          style={styles.animation}
          onAnimationFinish={onDone}
          speed={1.5}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  animation: {
    width: 150,
  },
});
