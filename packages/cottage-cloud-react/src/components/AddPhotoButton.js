import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { change, submit, isSubmitting } from "redux-form";
import {
  fetchEnd,
  fetchStart,
  required,
  showNotification,
  Button,
  SaveButton,
  SimpleForm,
  TextInput,
  CREATE,
  REDUX_FORM_NAME,
} from "react-admin";
import IconContentAdd from "@material-ui/icons/Add";
import IconCancel from "@material-ui/icons/Cancel";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { createForm } from 'final-form'
import dataProvider from "../utils/DataProvider";

class AddPhotoButton extends Component {
  state = {
    error: false,
    showDialog: false,
  };

  handleClick = () => {
    this.setState({ showDialog: true });
  };

  handleCloseClick = () => {
    this.setState({ showDialog: false });
  };

  handleSaveClick = () => {
    const { submit } = this.props;

    // Trigger a submit of our custom quick create form
    // This is needed because our modal action buttons are oustide the form
    submit("post-quick-create");
  };

  handleSubmit = values => {
    const { change, fetchStart, fetchEnd, showNotification } = this.props;

    // Dispatch an action letting react-admin know a API call is ongoing
    fetchStart();

    // As we want to know when the new post has been created in order to close the modal, we use the
    // dataProvider directly
    dataProvider(CREATE, "photos", { data: values })
      .then(({ data }) => {
        // Update the main react-admin form (in this case, the comments creation form)
        this.setState({ showDialog: false });
      })
      .catch(error => {
        showNotification(error.message, "error");
      })
      .finally(() => {
        // Dispatch an action letting react-admin know a API call has ended
        fetchEnd();
      });
  };

  render() {
    const { showDialog } = this.state;
    const { isSubmitting } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleClick} label="ra.action.create">
          <IconContentAdd />
        </Button>
        <Dialog
          fullWidth
          open={showDialog}
          onClose={this.handleCloseClick}
          aria-label="Add Photo"
        >
          <DialogTitle>Create post</DialogTitle>
          <DialogContent>
            <SimpleForm
              // We override the redux-form name to avoid collision with the react-admin main form
              form={createForm({onSubmit: () => {}})}
              resource="photos"
              // We override the redux-form onSubmit prop to handle the submission ourselves
              onSubmit={this.handleSubmit}
              // We want no toolbar at all as we have our modal actions
              toolbar={null}
              validate={false}
            >
              <TextInput source="property_id" />
              <TextInput source="description" />
              <TextInput source="list_position" />
              <TextInput source="photoBlob" />
            </SimpleForm>
          </DialogContent>
          <DialogActions>
            <SaveButton saving={isSubmitting} onClick={this.handleSaveClick} />
            <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
              <IconCancel />
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isSubmitting: isSubmitting("post-quick-create")(state),
});

const mapDispatchToProps = {
  change,
  fetchEnd,
  fetchStart,
  showNotification,
  submit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPhotoButton);