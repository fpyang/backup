import React from 'react';
import { TextInput, View, Text, Dimensions} from 'react-native';

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
    height: commonHeight,
    width: commonWidth,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
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

const SmsVerifyInput = ({ value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType }) => {
  const { inputStyle, containerStyle } = styles;
 
  return (
    <View>
    <View style={containerStyle}>
      <View style={styles.textStyle}>
        <CodeRender value={value}/>
      </View>
      <TextInput
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
};

export { SmsVerifyInput };
