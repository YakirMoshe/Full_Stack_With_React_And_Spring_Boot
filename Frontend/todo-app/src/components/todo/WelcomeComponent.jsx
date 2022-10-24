import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.state = {
      welcomeMessage: "",
    };
    this.handleSucessfulResponse = this.handleSucessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.match.params.name}. You can manage your todos
          <Link to="/todos">here</Link>.
        </div>
        <div className="container">
          Click here to get a customized welcome message.
          <button
            onClick={this.retrieveWelcomeMessage}
            className="btn btn-seccess"
          >
            Get Welcome Message
          </button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </>
    );
  }

  retrieveWelcomeMessage() {
    // HelloWorldService.executeHelloWorldService()
    // .then( response => this.handleSucessfulResponse(response) )

    // HelloWorldService.executeHelloWorldBeanService().then((response) =>
    //   this.handleSucessfulResponse(response)
    // );

    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.match.params.name
    ).then((response) => this.handleSucessfulResponse(response))
     .catch( error => this.handleError(error))
  }

  handleSucessfulResponse(response) {
    this.setState({
      welcomeMessage: response.data.message
    });
  }

  handleError(error) {
    console.log(error.response);
    let errorMessage = '';

    if(error.message)
    errorMessage += error.message

    if(error.message && error.response.data)
    {
      errorMessage += error.response.data.message
    }
    
        this.setState({
      welcomeMessage: errorMessage
    });
  }
}

export default WelcomeComponent;
