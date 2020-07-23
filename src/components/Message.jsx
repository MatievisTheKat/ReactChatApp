import React from "react";

export default class Message extends React.Component {
  render() {
    return (
      <div className="border-left">
        <p className="ml-4">
          <strong className={this.props.author.toLowerCase() === "you" ? "" : "text-primary"}>{this.props.author} </strong>
          <small>
            <em>{this.props.time}</em>
          </small>
          <br />
          {this.props.content}
        </p>
      </div>
    );
  }
}
