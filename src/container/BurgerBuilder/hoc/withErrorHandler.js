import React, { Fragment } from "react";

import Modal from "../../../components/UI/Modal/Modal";
import useHttpError from "../hooks/httpError";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return props => {
    const [error, setError] = useHttpError(axiosInstance);
    return (
      <div>
        <Fragment>
          <Modal modalClosed={setError} show={error}>
            {error ? error.message : "null"}
          </Modal>
          <WrappedComponent {...props} />
        </Fragment>
      </div>
    );
  };
};

export default withErrorHandler;
