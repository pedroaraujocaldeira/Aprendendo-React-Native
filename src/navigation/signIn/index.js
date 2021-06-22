import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {LogBox} from 'react-native';

import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../api/api';

import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from './styles';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {cpf: '', password: '', error: ''};

  handleCpfChange = cpf => {
    this.setState({cpf});
  };

  handlePasswordChange = password => {
    this.setState({password});
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('SignUp');
  };

  handleSignInPress = async () => {
    console.log('asdf');
    LogBox.ignoreLogs(['asdfasdfsdf: ...']);

    if (this.state.cpf.length === 0 || this.state.password.length === 0) {
      this.setState(
        {error: 'Preencha usuário e senha para continuar!'},
        () => false,
      );
    } else {
      // try {
      console.log(api);
      const response = await api
        .post('/auth/login', {
          cpf: this.state.cpf,
          password: this.state.password,
        })
        .then(async response => {
          console.log(response);
          await AsyncStorage.setItem(
            '@AirBnbApp:token',
            response.data.tokens.access.token,
          );
          // const navigateAction = NavigationActions.navigate({
          //   routeName: 'Home',
          // });

          // this.props.navigation.dispatch(navigateAction);
          this.props.navigation.navigate('Home');

          // const resetAction = StackActions.reset({
          //   index: 0,
          //   actions: [NavigationActions.navigate('Home')],
          // });
          // this.props.navigation.dispatch(resetAction);
        })
        .catch(error => {
          if (error.response) {
            this.setState({
              error: error.response.data.message,
            });
          } else if (error.request) {
            // The request was made but no response was received
            this.setState({
              error: 'Ops, Ocorreu um erro!',
            });
          } else {
            // Something happened in setting up the request that triggered an Error
            this.setState({
              error: 'Ops, Ocorreu um erro!',
            });
          }
        });
    }
  };

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.cpf}
          onChangeText={this.handleCpfChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        />
        {this.state.error.length !== 0 && (
          <ErrorMessage>{this.state.error}</ErrorMessage>
        )}
        <Button onPress={this.handleSignInPress}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={this.handleCreateAccountPress}>
          <SignUpLinkText>Criar conta grátis</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}
