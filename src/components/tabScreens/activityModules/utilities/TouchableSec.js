import React ,{ Component } from 'react';
import { TouchableOpacity } from 'react-native';
//import * as _ from 'lodash';
export default class TouchableSec extends Component {

debouncePress = onPress => () => {
    const clickTime = Date.now()
    if (!this.lastClickTime ||
        Math.abs(this.lastClickTime - clickTime) > this.props.debounceMS) {
        this.lastClickTime = clickTime
        onPress()
    }
    }
  render() {
    return (
        <TouchableOpacity
          style={this.props.style}
          onPress={this.debouncePress(this.props.onPress)}>
          {this.props.children}
        </TouchableOpacity>
    )
  }
  /*
  debouncePress = onPress => {
    return _.throttle(onPress, debounceMillisecond, {leading: true, trailing: false})
  }*/
  
}





