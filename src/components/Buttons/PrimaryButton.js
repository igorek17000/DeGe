import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';
import {colors, commonStyles, fonts} from '../../styles';

const PrimaryButton = ({
  onPress,
  enableFlag,
  text,
  icon,
  icon2,
  loading,
  ...rest
}) => {
  const backgroundDisabled =
    (typeof enableFlag === 'boolean' && !enableFlag) ||
    (typeof loading === 'boolean' && loading) ||
    false;
  return (
    <TouchableOpacity
      style={Object.assign(
        rest.style ? rest.style : {},
        {flexDirection: 'row'},
        backgroundDisabled
          ? commonStyles.disabledButton
          : commonStyles.primaryButton,
      )}
      onPress={onPress}
      disabled={backgroundDisabled}>
      {icon ? icon : <></>}
      {((typeof loading === 'boolean' && !loading) ||
        typeof loading !== 'boolean') && (
        <Text
          style={{
            ...fonts.btn_large_normal,
            color:
              typeof enableFlag === 'boolean'
                ? enableFlag
                  ? 'black'
                  : colors.grey18
                : 'black',
          }}>
          {text}
        </Text>
      )}
      {typeof loading === 'boolean' && loading && (
        <ActivityIndicator size={'small'} color={colors.green5} />
      )}
      {icon2 ? icon2 : <></>}
    </TouchableOpacity>
  );
};

export default PrimaryButton;
