import React from 'react';
import './App.css';

// top text to display the current player's turn
function CurrentPlayer(props) {
  return(
      <div className="current-player">
          <h1>{props.currentPlayer}'s turn</h1>
      </div>
  );
}

// create individual cells for the board
class Cell extends React.Component {
  render() {
      return (
          <div className="cell" style={this.props.color}></div>
      );
  }
}

// reset button at the bottom
function ResetButton(props) {
  return (
      <button className="reset-button" onClick={props.onClick}>Reset</button>
  );
}

// create the actual board, winner not necessary for assignment
class Board extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          boardState: [],
          currentPlayer: 0,
          players: ["Black", "Red"],
          winner: null,
          columnState: Array(props.width).fill(false),
      };
  }

  // reset the game
  reset() {
      this.setState({
          boardState: [],
          currentPlayer: 0,
          winner: null,
      })
  }

  dropToken(column, colHeight) {
     //const [isDisabled, setDisabled] = React.useState(false);
      var checkState = this.state.boardState;
      var player = this.state.currentPlayer;
      let row;
      //var full = this.state.columnState;
      
      // column in original state and not full
      if (checkState[column][colHeight-1] && !checkState[column][0]) {
          for (var i = 0; i < colHeight; i++) {
              if (checkState[column][i]) {
                  checkState[column][i-1] = this.state.players[player];
                  row = i-1;
                  break;
              }
          }
      } else if(!checkState[column][colHeight-1]) {
          checkState[column][colHeight-1] = this.state.players[player];
          // eslint-disable-next-line
          row = colHeight-1;
      } else {
          return;
      }

      if (!JSON.stringify(checkState[column]).includes(null)) {
        //full = true;
        this.setState(prevState => {
            const newColumnState = [...prevState.columnState]
            newColumnState[column] = true;
            return { columnState: newColumnState }
        }
      )};
      
      // move to next player
      player++;
      if (player === this.state.players.length) {
          player = 0;
      }

      this.setState({
          boardState: checkState,
          currentPlayer: player,
          //columnState: full,
      });
  }

  // render all the cells
  renderCell(column, row) {
      return <Cell color={{backgroundColor: this.state.boardState[column][row]}}/>;
  }

  renderCells() {
      const columnList = [];
      for(var column = 0; column < this.props.width; column++) {
          if (this.state.boardState.length < this.props.width) {
            this.state.boardState.push([]);
          }

          const rowList = [];
          for (var row = 0; row < this.props.height; row++) {
            rowList.push(this.renderCell(column, row));
          }

          columnList.push(
            <>
              <div>
                {this.state.columnState[column] === true ? (
                  <button 
                  className="drop-button"
                  disabled={true}
                  id={column} 
                  onClick={(e) => this.dropToken(parseInt(e.target.id), parseInt(this.props.height))}
                >
                Drop
              </button>
                ) : (
                  <button 
                    className="drop-button"
                    disabled={false}
                    id={column} 
                    onClick={(e) => this.dropToken(parseInt(e.target.id), parseInt(this.props.height))}
                  >
                    Drop
                  </button>
                )}

                <div className="column-container" id={column}>
                    {rowList}
                </div>
              </div>
            </>
          );
      }
      return columnList;
  }

  render() {
      return(
          <div className="container">
              <CurrentPlayer currentPlayer={this.state.players[this.state.currentPlayer]} />
              <div className="board">
                  {this.renderCells()}
              </div>
              <ResetButton onClick={() => this.reset()} />
          </div>
      );
  }
}

const App = () => {
  return (
      <div className="App">
          <Board width={7} height={6}/>
      </div>
  )
};

export default App;
