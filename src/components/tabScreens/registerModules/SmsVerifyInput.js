import React from 'react';
import { TextInput, Platform, View, Text, Dimensions} from 'react-native';
import LLTextInput from '../activityModules/utilities/LLTextInput';

const screenWidth = Dimensions.get('window').width;
const commonHeight = 100;
const commonWidth = screenWidth;

const styles = {
  textStyle: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: commonHeight,
    width: commonWidth
  },
  inputStyle: {
    backgroundColor: 'transparent',
    color: 'transparent',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    position: 'absolute',
    height: commonHeight,
    width: commonWidth,
    marginLeft: 5,
    marginRight: 5
  },
  containerStyle: {
    height: 0,
    width: commonWidth,
    flexDirection: 'row',
    alignItems: 'center'
  },
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFont:{
    fontSize: 16
  }
};

const FontSize = 33;
const FontSquare = (screenWidth-120)/6;
const CodeRender = ({value}) => {
  let styles = {
    codeBlocks: {
      marginTop: 100,
      backgroundColor: 'white',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    codeBlock: {
      width: FontSquare,
      height: FontSquare*1.5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: FontSquare*0.2,
      borderColor: 'orange',
      borderWidth: 2
    },
    codeBlockGray: {
      width: FontSquare,
      height: FontSquare*1.5,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: FontSquare*0.2,
      borderWidth: 2,
      borderColor: 'gray'
    },
    numFont: {
        color: 'black', 
        fontSize: FontSize,
        fontWeight: 'normal'
    }
  };
  //<Text style={{fontSize: 35}}> {value} </Text>
  switch(value.length){
    case 0:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 1:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 2:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[1]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 3:
      return(
        <View style={styles.codeBlocks}>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[0]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[1]} </Text>
          </View>
          <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[2]} </Text>
          </View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
          <View style={styles.codeBlockGray}></View>
        </View>
      );
    case 4:
        return(
          <View style={styles.codeBlocks}>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[0]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[1]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[2]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[3]} </Text>
            </View>
            <View style={styles.codeBlockGray}></View>
            <View style={styles.codeBlockGray}></View>
          </View>
        );
    case 5:
    return(
        <View style={styles.codeBlocks}>
        <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[0]} </Text>
        </View>
        <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[1]} </Text>
        </View>
        <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[2]} </Text>
        </View>
        <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[3]} </Text>
        </View>
        <View style={styles.codeBlock}>
            <Text style={styles.numFont}> {value[4]} </Text>
        </View>
        <View style={styles.codeBlockGray}></View>
        </View>
    );
    case 6:
        return(
          <View style={styles.codeBlocks}>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[0]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[1]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[2]} </Text>
            </View>
            <View style={styles.codeBlock}>
              <Text style={styles.numFont}> {value[3]} </Text>
            </View>
            <View style={styles.codeBlock}>
                <Text style={styles.numFont}> {value[4]} </Text>
            </View>
            <View style={styles.codeBlock}>
                <Text style={styles.numFont}> {value[5]} </Text>
            </View>
          </View>
        );
  }
}

const SmsVerifyInput = ({ errorMsg, phoneNumber, value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType }) => {
  if(Platform.OS === 'ios'){

    return (
      <View style={styles.background}>
      <Text style={styles.textFont}>{'驗證碼已發送至\n'}</Text>
      <Text>{phoneNumber}</Text>
      <View style={styles.containerStyle}> 
        <View style={styles.textStyle}>
          <CodeRender value={value}/>
        </View>
        <LLTextInput
          underlineColorAndroid={'transparent'}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={styles.inputStyle}
          value={value}
          autoFocus={true}
          underlineColorAndroid='rgba(0,0,0,0)'
          selectionColor="transparent"
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />
        
      </View>

      <View style={{height: ((screenWidth-120)/6)*1.5+60, background: 'transparent',display: 'flex', justifyContent: 'center', alignItems: 'center'}}></View>
    <Text style={styles.textFont}>{'簡訊驗證碼為六位數字\n'}</Text>
    <Text style={styles.textFont}>{'若您未收到驗證碼，請確認電話號碼是否正確'}</Text>
    
      </View>
    );


  }

  if(Platform.OS === 'android'){

    return (
      <View style={styles.background}>
      <View style={styles.containerStyle}>
        <View style={styles.textStyle}>
          <CodeRender value={value}/>
        </View>
        <LLTextInput
          underlineColorAndroid={'transparent'}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          autoCorrect={false}
          style={styles.inputStyle}
          value={value}
          autoFocus={true}
          underlineColorAndroid='rgba(0,0,0,0)'
          selectionColor="transparent"
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
        />
        
      </View>
    
      </View>
    );

    
  }

  
};
/*
 <Text>{'驗證碼已發送至\n'}</Text>
      <Text>{phoneNumber}</Text>
*/
/*
  <View style={{height: ((screenWidth-120)/6)*1.5+60, background: 'transparent',display: 'flex', justifyContent: 'center', alignItems: 'center'}}></View>
    <Text>{'簡訊驗證碼為六位數字\n'}</Text>
    <Text>{'若您未收到驗證碼，請確認電話號碼是否正確'}</Text>
*/

export { SmsVerifyInput };
