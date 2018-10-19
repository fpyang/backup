import React ,{ Component } from 'react';
import { TouchableOpacity } from 'react-native';
//import * as _ from 'lodash';
const debounceMillisecond = 1500;
export default class Touchable extends Component {

debouncePress = onPress => () => {
    const clickTime = Date.now()
    if (!this.lastClickTime ||
        Math.abs(this.lastClickTime - clickTime) > debounceMillisecond) {
        this.lastClickTime = clickTime
        onPress()
    }
    }
  render() {
    return (
        <TouchableOpacity
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





