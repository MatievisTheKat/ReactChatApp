import React from "react";

export default class Message extends React.Component {
  render() {
    return (
      <div>
        <p>
          <strong>
            {this.props.author}{" "}
            <small>
              <em>{this.props.timestamp}</em>
            </small>
          </strong>
          <br />
          {this.props.content}
        </p>
      </div>
    );
  }
}
