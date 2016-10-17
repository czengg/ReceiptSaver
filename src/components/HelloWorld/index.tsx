import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

// See src/declarations.d.ts
import Button from "react-native-button";
import Camera from "react-native-camera";

interface Props {
  max: number;
  message?: string | number;
  alert?: string | number;
  style: React.ViewStyle;
}

interface State {
  counter: number;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default class HelloWorld extends Component<Props, State> {
  static defaultProps = {
    message: "Press here",
    alert: "Hello world!",
  };

  state = {
    counter: 0
  };

  onPress = () => {
    const counter = this.state.counter + 1;
    if (counter < this.props.max) {
        return this.setState({ counter });
    }
    // Alert after re-rendering
    return this.setState({ counter: 0 }, () => alert(this.props.alert));
  }

  takePicture = () {
    if (Object.keys(this.camera).length) {
      this.camera.capture()
        .then((data: any) => console.log(data))
        .catch((err: any) => console.error(err));
    }
  }

  render() {
    const { message } = this.props;
    const { counter } = this.state;

    return (
      <View style={this.props.style}>
        <Camera
          ref={(cam: any) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
        >
          <Text style={styles.capture} onPress={this.takePicture}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
}

