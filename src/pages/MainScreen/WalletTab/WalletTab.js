import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {colors, fonts} from '../../../styles';
import {SvgXml} from 'react-native-svg';
import FontAwesome, {
  SolidIcons,
  RegularIcons,
  BrandIcons,
} from 'react-native-fontawesome';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Header from './Header';
import TokenAndCollectiblesTab from './TokenAndCollectibleTab';

import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '../../../components/Buttons';
import TokenShow from './TokenShow/TokenShow';
import BalanceText from '../../../components/BalanceText';
import SendToken from './SendToken/SendToken';
import RBSheet from 'react-native-raw-bottom-sheet';
import Toast from 'react-native-toast-message';

const backImage = require('../../../assets/images/mainscreen/backimage.png');
const buyIconSvgXml = require('../SVGData').buyIcon;

const WalletTab = ({navigation, accounts, currentAccountIndex}) => {
  const [selectedToken, setSelectedToken] = useState('');
  const refRBSendTokenSheet = useRef(null);

  useEffect(() => {
    return () => {};
  });

  const renderNetworkBalance = () => {
    return (
      <View style={{marginLeft: 24, marginTop: 24}}>
        <View>
          <MaskedView
            maskElement={
              accounts && accounts[currentAccountIndex] ? (
                <BalanceText
                  style={{...fonts.big_type1}}
                  address={accounts[currentAccountIndex].address}
                />
              ) : (
                <Text style={{...fonts.big_type1}}>0 ETH</Text>
              )
            }>
            <LinearGradient colors={colors.gradient8}>
              {accounts && accounts[currentAccountIndex] ? (
                <BalanceText
                  style={{...fonts.big_type1, opacity: 0}}
                  address={accounts[currentAccountIndex].address}
                />
              ) : (
                <Text style={{...fonts.big_type1, opacity: 0}}>0 ETH</Text>
              )}
            </LinearGradient>
          </MaskedView>
        </View>
        <View style={{marginTop: 24, flexDirection: 'row'}}>
          <View>
            <Text style={{...fonts.para_regular, color: 'white'}}>
              $16,858.15
            </Text>
          </View>
          <View style={{marginLeft: 8}}>
            <Text style={{...fonts.para_regular, color: colors.green5}}>
              +0.7%
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderTransactionButtonGroup = () => {
    return (
      <View
        style={{
          marginHorizontal: 24,
          flexDirection: 'row',
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {
              refRBSendTokenSheet.current.open();
            }}
            text="Send"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowUp}
              />
            }
          />
        </View>
        <View style={{marginRight: 16}}>
          <SecondaryButton
            onPress={() => {
              Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Error',
                text2: 'Hello' + ' 😥',
              });
            }}
            text="Receive"
            icon={
              <FontAwesome
                style={{fontSize: 16, color: colors.green5, marginRight: 16}}
                icon={SolidIcons.arrowDown}
              />
            }
          />
        </View>
        <View>
          <SecondaryButton
            onPress={() => {}}
            text="Buy"
            icon={<SvgXml style={{marginRight: 16}} xml={buyIconSvgXml} />}
          />
        </View>
        {renderSendTokenRBSheet()}
      </View>
    );
  };

  const tokenRowPressed = token => {
    setSelectedToken(token);
  };

  const renderSendTokenRBSheet = () => {
    return (
      <RBSheet
        height={Dimensions.get('screen').height - 100}
        ref={refRBSendTokenSheet}
        closeOnDragDown={true}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#222531BB',
          },
          draggableIcon: {
            backgroundColor: colors.grey9,
          },
          container: {
            backgroundColor: colors.grey24,
          },
        }}>
        <SendToken
          onPressClose={() => {
            refRBSendTokenSheet.current.close();
          }}
        />
      </RBSheet>
    );
  };

  return (
    <KeyboardAvoidingView>
      <SafeAreaView
        style={{
          backgroundColor: colors.grey24,
          width: '100%',
          height: '100%',
        }}>
        {selectedToken.length > 0 && (
          <TokenShow
            onBackPress={() => {
              setSelectedToken('');
            }}
          />
        )}
        {!selectedToken && (
          <>
            <Header />
            <Image
              source={backImage}
              style={{position: 'absolute', right: '-15%', top: '10%'}}
            />
            {/* <View style={{height: '20%'}}></View> */}
            {renderNetworkBalance()}
            {renderTransactionButtonGroup()}
            <TokenAndCollectiblesTab
              navigation={navigation}
              tokenPressed={tokenRowPressed}
            />
          </>
        )}
        <Toast ref={ref => Toast.setRef(ref)} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts.accounts,
  currentAccountIndex: state.accounts.currentAccountIndex,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTab);
