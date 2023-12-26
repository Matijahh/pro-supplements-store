import React from "react";

import { Alert } from "react-bootstrap";

import "./message.css";

const Message = ({ variant, children }) => {
  return (
    <Alert variant={variant} className={`${variant} message-wrapper`}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
