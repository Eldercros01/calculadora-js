import React from "react";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "0",
      formula: "",
      evaluated: false,
    };
  }

  clear = () => {
    this.setState({
      input: "0",
      formula: "",
      evaluated: false,
    });
  };

  handleNumber = (e) => {
    const val = e.target.innerText;
    const { input, formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        input: val,
        formula: val === "0" ? "" : val,
        evaluated: false,
      });
    } else {
      if (input === "0" && val === "0") {
        return;
      } else if (input === "0" && val !== "0") {
        this.setState({
          input: val,
          formula: formula + val,
        });
      } else {
        this.setState({
          input: input + val,
          formula: formula + val,
        });
      }
    }
  };

  handleDecimal = () => {
    const { input, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        input: "0.",
        formula: "0.",
        evaluated: false,
      });
      return;
    }

    if (!input.includes(".")) {
      this.setState({
        input: input + ".",
        formula: this.state.formula + ".",
      });
    }
  };

  handleOperator = (e) => {
    const val = e.target.innerText;
    const { formula, evaluated } = this.state;

    if (evaluated) {
      this.setState({
        formula: this.state.input + val,
        input: val,
        evaluated: false,
      });
      return;
    }

    const operators = ["+", "-", "*", "/"];
    if (operators.includes(formula.slice(-1))) {
      if (val === "-" && formula.slice(-1) !== "-") {
        this.setState({
          formula: formula + val,
          input: val,
        });
      } else {
        this.setState({
          formula: formula.slice(0, -1) + val,
          input: val,
        });
      }
    } else {
      this.setState({
        formula: formula + val,
        input: val,
      });
    }
  };

  evaluate = () => {
    let expression = this.state.formula;

    const operators = ["+", "-", "*", "/"];
    while (operators.includes(expression.slice(-1))) {
      expression = expression.slice(0, -1);
    }

    try {
      let result = Function(`"use strict"; return (${expression})`)();
      result = Math.round(result * 10000) / 10000;

      this.setState({
        input: result.toString(),
        formula: result.toString(),
        evaluated: true,
      });
    } catch {
      this.setState({
        input: "Error",
        formula: "",
        evaluated: true,
      });
    }
  };

  render() {
    return (
      <div id="drum-machine" style={styles.calculator}>
        <div id="display" style={styles.display}>
          {this.state.input}
        </div>

        <div style={styles.buttons}>
          <button id="clear" onClick={this.clear} style={styles.button}>
            AC
          </button>
          <button id="divide" onClick={this.handleOperator} style={styles.button}>
            /
          </button>
          <button id="multiply" onClick={this.handleOperator} style={styles.button}>
            *
          </button>
          <button id="subtract" onClick={this.handleOperator} style={styles.button}>
            -
          </button>
          <button id="add" onClick={this.handleOperator} style={styles.button}>
            +
          </button>
          <button id="seven" onClick={this.handleNumber} style={styles.button}>
            7
          </button>
          <button id="eight" onClick={this.handleNumber} style={styles.button}>
            8
          </button>
          <button id="nine" onClick={this.handleNumber} style={styles.button}>
            9
          </button>
          <button id="four" onClick={this.handleNumber} style={styles.button}>
            4
          </button>
          <button id="five" onClick={this.handleNumber} style={styles.button}>
            5
          </button>
          <button id="six" onClick={this.handleNumber} style={styles.button}>
            6
          </button>
          <button id="one" onClick={this.handleNumber} style={styles.button}>
            1
          </button>
          <button id="two" onClick={this.handleNumber} style={styles.button}>
            2
          </button>
          <button id="three" onClick={this.handleNumber} style={styles.button}>
            3
          </button>
          <button id="zero" onClick={this.handleNumber} style={styles.button}>
            0
          </button>
          <button id="decimal" onClick={this.handleDecimal} style={styles.button}>
            .
          </button>
          <button id="equals" onClick={this.evaluate} style={styles.button}>
            =
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  calculator: {
    width: 320,
    margin: "20px auto",
    border: "2px solid #333",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#eee",
    userSelect: "none",
  },
  display: {
    backgroundColor: "#222",
    color: "#0f0",
    fontSize: 32,
    height: 60,
    marginBottom: 20,
    padding: 10,
    textAlign: "right",
    borderRadius: 5,
    fontFamily: "monospace",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 10,
  },
  button: {
    fontSize: 20,
    padding: 15,
    borderRadius: 5,
    border: "none",
    backgroundColor: "#444",
    color: "white",
    cursor: "pointer",
  },
};

export default Calculator;
