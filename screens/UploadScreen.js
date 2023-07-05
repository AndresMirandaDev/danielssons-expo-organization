import { StyleSheet, Text, View, Modal } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';
import colors from '../config/colors';

export default function UploadScreen({
  progress = 0,
  visible = false,
  onDone,
}) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 1 ? (
          <Progress.Bar color={colors.secondary} progress={progress} />
        ) : (
          <LottieView
            source={require('../assets/animations/done3.json')}
            autoPlay
            loop={false}
            style={styles.animation}
            onAnimationFinish={onDone}
          />
        )}
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
