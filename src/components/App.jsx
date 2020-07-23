import React from "react";
import moment from "moment";
import Axios from "axios";
import Message from "./Message";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      convo: [],
      message: "",
      botTyping: false
    };
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  appendMessage(msg) {
    const joined = this.state.convo.concat(msg);
    this.setState({ convo: joined });
  }

  onInputChange(evnt) {
    this.setState({ message: evnt.target.value });
  }

  sendMessage(author, content) {
    if (!content) return console.log("You can't send an empty message!");

    const msg = {
      author,
      time: moment().format("hh:mm a"),
      content
    };

    this.appendMessage(msg);
    if (author.toLowerCase() === "you") {
      this.setState({ message: "" });

      this.setState({ botTyping: true });
      Axios.post("https://cb.matthewis.online/response", {
        conversation: this.state.convo,
        message: content
      }).then((res) => {
        this.sendMessage("Bot", res.data.response);
        this.setState({ botTyping: false });
      });
    }
  }

  render() {
    return (
      <div className="container chatbox p-5 mt-3 mb-3 bg-dark text-light">
        <div className="center">
          <h5>You should really get some friends...</h5>
        </div>
        <br />
        <div className="container">
          {this.state.convo.map((m, i) => (
            <>
              <hr className="stylish-color-dark" />
              <Message key={i} content={m.content} author={m.author} time={m.time} />
            </>
          ))}
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={(el) => {
            this.messagesEnd = el;
          }}></div>

        <div>
          {" "}
          <em>{this.state.botTyping ? "Typing response..." : ""}</em>
        </div>

        <div className="row bg-dark chat-input">
          <div className="row container center">
            <input
              className="form-control w-75"
              type="text"
              name="message"
              id="message"
              placeholder="Type your message here"
              onKeyDown={(evnt) => (evnt.keyCode === 13 ? this.sendMessage("You", this.state.message) : null)}
              onChange={(evnt) => this.onInputChange(evnt)}
              value={this.state.message}
            />
            <button type="submit" className="btn-outline-primary w-25" onClick={() => this.sendMessage("You", this.state.message)}>
              Send
            </button>
          </div>
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
