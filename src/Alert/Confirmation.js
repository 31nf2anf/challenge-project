import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { confirmable, createConfirmation } from "react-confirm";

class ConfirmationAlert extends React.Component {
  state = {
    showw: true,
  };
  constructor(props) {
    super(props);
    this.setState({
      showw: true,
    });
  }

  toHide = () => {
    this.setState({
      showw: false,
    });
  };
  render() {
    const { confirmation, proceed, enableEscape = true } = this.props;
    {
      setTimeout(() => {
        this.toHide();
      }, 3000);
    }
    return (
      <div className="static-modal ">
        <Modal
          className="confrim_varna"
          show={this.state.showw}
          onHide={() => proceed(false)}
          backdrop={enableEscape ? true : "static"}
          keyboard={enableEscape}
        >
          <Modal.Body style={{ direction: "rtl", textAlign: "center" }}>
            <h5 className="fw-bolder">{confirmation}</h5>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

ConfirmationAlert.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func, // called when ok button is clicked.
  enableEscape: PropTypes.bool,
};

export function confirmAlert(confirmation, options = {}) {
  return createConfirmation(confirmable(ConfirmationAlert))({
    confirmation,
    ...options,
  });
}
