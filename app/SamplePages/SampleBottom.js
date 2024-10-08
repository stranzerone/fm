import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SampleBottom = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box} />
      <Svg
        style={styles.wave}
        height="100"
        width="100%"
        viewBox="0 0 1440 320"
      >
        <Path
          fill="black" // Change this to the desired color
          d="M0,128L40,160C80,192,160,256,240,250.7C320,245,400,171,480,160C560,149,640,192,720,186.7C800,181,880,107,960,80C1040,53,1120,75,1200,96C1280,117,1360,139,1400,150.7L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 0,
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default SampleBottom;
