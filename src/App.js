import React, { Component } from "react";
import logo from "./logo.svg";
import io from "socket.io-client";
import { Button } from "react-bootstrap";
import "./components/css/bootstrap.min.css";
import TwitchJS from "twitch-js";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      channel: "nickmercs",
      options: {
        channels: ["#nickmercs"]
        // Provide an identity
        // identity: {
        //   username: "Isak_",
        //   password: "oauth:a29b68aede41e25179a66c5978b21437"
        // },
      }
    };
  }

  componentDidMount() {
    const client = new TwitchJS.client(this.state.options);
    let chat = document.getElementById("chat");
    client.on("chat", (channel, userstate, message, self) => {
      document.getElementById("chat").value += `${userstate["display-name"]}: ${message}\n`;
      chat.scrollTop = chat.scrollHeight;


      // Do not repond if the message is from the connected identity.
      if (self) return;

      if (this.state.options.identity && message === "!command") {
        // If an identity was provided, respond in channel with message.
        client.say(channel, "Hello world!");
      }
    });
    client.connect();
  }
  clearChat() {
    console.log("Chat cleared!");
  }

  render() {
    return (
      <div className="App">
      <div className="header">
        <h2 style={{color: 'white', textAlign: 'center'}}>{this.state.channel} live feed</h2>
      </div>
        <div className="chatCenter">
          <textarea className="form-control" id="chat" value="123"/>
        </div>
        <Button onClick={console.log("clear")}>Clear chat</Button>
      </div>
    );
  }

}

export default App;
