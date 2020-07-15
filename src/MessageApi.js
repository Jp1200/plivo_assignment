import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

let apilink = "http://localhost:3001/send_sms";
export default class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      log: [],
      toNumber: "",
      message: "",
      isLoading: true,
      numberSelection: "",
      messageLog: [],
      date: "",
    };
  }
  //   componentDidMount = () => {
  // fetch("http://localhost:3001/messages/")
  //   .then((r) => r.json())
  //   .then((data) => {
  //     console.log(data.rep);
  //     this.setState({
  //       log: data.rep,
  //       isLoading: false,
  //         });
  //       });
  //   };
  handleSend = (event) => {
    fetch(
      apilink +
        `?From=+14388123089&To=${this.state.toNumber}&Text=${this.state.message}`,
      { method: "POST", headers: { "Content-Type": "application/json" } }
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  handleNumber = (event) => {
    this.setState({ toNumber: event.target.value });
  };
  handleMessage = (event) => {
    this.setState({ message: event.target.value });
  };
  handleMessageLog = (uuid) => {
    fetch(`http://localhost:3001/message?Uuid=${uuid}`)
      .then((resp) => {
        console.log(resp);
      })
      .then((data) => {
        this.setState({
          messageLog: data,
        });
      });
  };
  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  handleDate = (event) => {
    let format = " 00:00:00.000000";
    console.log(event.target.value + format);
    fetch(`http://localhost:3001/messages/?Time=${event.target.value}` + format)
      .then((r) => r.json())
      .then((data) => {
        console.log(data.rep);
        this.setState({
          log: data.rep,
          isLoading: false,
        });
      });
  };
  // if (u.fromNumber === "14388123089")
  render() {
    let loadingMess = <p>Select a date</p>;
    let messageLog = this.state.log
      .slice(0)
      .reverse()
      .map((u, key) => {
        return (
          <p className="message-text">
            From: {u.fromNumber} --> To: {u.toNumber}
            <br /> Message State: {u.messageState}
            <br /> Error: {u.errorCode}
            <br /> Message Time: {u.messageTime}
            <br />
            <br />
          </p>
        );
      });

    let historyLogNum = this.state.log.map((r, key) => r.toNumber);

    let uniqueLog = historyLogNum.filter(this.onlyUnique);

    let historyLog = uniqueLog.map((f, key) => {
      return (
        <ListGroup.Item action key={key}>
          {f}
        </ListGroup.Item>
      );
    });

    // Unused classnames:
    //  <img src={require("./assestImgs/imgPhone.svg")} alt="undraw" />
    return (
      <Container className="message-container">
        <Row align="center">
          <Col className="input-container">
            <Form id="form">
              <Form.Group controlId="number">
                <Form.Control
                  onChange={this.handleNumber}
                  size="sm"
                  type="text"
                  placeholder="Enter Number"
                />
                <Form.Text className="mutedText">
                  Only +15128763450 forms
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="text">
                <Form.Control
                  onChange={this.handleMessage}
                  size="lg"
                  as="textarea"
                  rows="3"
                  placeholder="Type here... Messages are sent from registered phone number through plivo console"
                />
              </Form.Group>
              <Button
                onClick={this.handleSend}
                className="btn"
                variant="primary"
                type="submit"
              >
                Send
              </Button>
            </Form>
          </Col>
          <Col className="history">
            <h2 className="tag">List of Recepients</h2>
            <ListGroup className="list-group-numb">
              {this.state.isLoading ? loadingMess : historyLog}
            </ListGroup>
          </Col>
        </Row>
        <Row className="fixed-bottom message-container">
          <Col sm="2">
            <p className="tag"></p>
          </Col>

          <Col sm="6">
            <h2 className="tag">
              Message Log
              <input
                className="tag"
                onChange={this.handleDate}
                type="date"
              ></input>
            </h2>

            {this.state.isLoading ? loadingMess : messageLog}
          </Col>
        </Row>
      </Container>
    );
  }
}
