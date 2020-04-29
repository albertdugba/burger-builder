import React, { Fragment, Component } from "react";
import Modal from "../../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axiosInstance) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axiosInstance.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      axiosInstance.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        },
      );
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <div>
          <Fragment>
            <Modal
              modalClosed={this.errorConfirmedHandler}
              show={this.state.error}
            >
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Fragment>
        </div>
      );
    }
  };
};

export default withErrorHandler;
