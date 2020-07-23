import React from "react";
import Message from "./Message";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      convo: [],
      typingMessage: ""
    };
  }

  appendMessage(msg) {
    console.log(this);

    const joined = this.state.convo.concat(msg);
    this.setState({ convo: joined });
  }

  inputOnChange(evnt) {
    this.setState({ typingMessage: evnt.target.value });
  }

  render() {
    return (
      <div className="container container shadow p-5 mt-3 mb-3 bg-white rounded height">
        <div className="container center">Feel free to chat here!</div>
        <hr />
        {this.state.convo.map((m, i) => (
          <Message key={i} content={m.content} author={m.author} time={m.time} />
        ))}
        <div className="row">
          <input
            className="form-control w-75"
            type="text"
            name="message"
            id="message"
            placeholder="Type your message here"
            onChange={(evnt) => this.inputOnChange(evnt)}
            value={this.state.typingMessage}
          />
          <button type="submit" className="btn-outline-primary w-25" onClick={(evnt) => this.appendMessage({ author: "You", content: "Hello there", time: "9:45 am" })}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

// import React, { useState } from "react";

// export default function Example() {
//   // Declare a new state variable, which we'll call "count"
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }
