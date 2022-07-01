import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
// import {materialCommunityIcon as Icon} from 'react-native-vector-icons';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    };
  }
  componentDidMount() {
    this.initializeGame();
  }
  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer: 1,
    });
  };
  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    //row
    for (i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    //clm.
    for (var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    return 0;
  };
  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    var nextPlayer = currentPlayer == 1 ? -1 : 1;

    this.setState({currentPlayer: nextPlayer});

    var winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Player 1 is winner');
      this.initializeGame();
    } else if (winner == -1) {
      Alert.alert('Player 2 is winner');
      this.initializeGame();
    }
  };
  onNewGamePress = () => {
    this.initializeGame();
  };
  renderText = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Text style={[styles.X, {alignSelf: 'center'}]}>X</Text>;
      case -1:
        return <Text style={[styles.O, {alignSelf: 'center'}]}>O</Text>;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.block, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderText(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.block, {borderTopWidth: 0}]}>
            {this.renderText(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.block, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {this.renderText(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.block, {borderLeftWidth: 0}]}>
            {this.renderText(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.block]}>
            {this.renderText(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.block, {borderRightWidth: 0}]}>
            {this.renderText(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.block, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderText(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.block, {borderBottomWidth: 0}]}>
            {this.renderText(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[styles.block, {borderRightWidth: 0, borderBottomWidth: 0}]}>
            {this.renderText(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={[{paddingTop: 50}, {fontSize: '50'}]}>
          <Button title="New Game" onPress={this.onNewGamePress} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  block: {
    borderWidth: 2,
    width: 100,
    height: 100,
    borderColor: '#ffff33',
  },
  X: {
    color: 'red',
    fontSize: 77,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  O: {
    color: 'blue',
    fontSize: 77,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
