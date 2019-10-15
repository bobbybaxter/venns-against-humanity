import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter,
} from 'reactstrap';

import './ExpansionModal.scss';

class ExpansionModal extends React.Component {
  state = {
    expansions: [],
    pendingExpansions: [],
  }

  cancelModal = () => {
    this.setState({ expansions: this.props.expansions, pendingExpansions: this.props.expansions });
    this.props.toggle();
  }

  componentDidMount() {
    this.setState({ expansions: this.props.expansions, pendingExpansions: this.props.expansions });
  }

  componentDidUpdate(prevProps) {
    if (this.props.expansion !== prevProps.expansion) {
      this.setState({ expansions: this.props.expansions });
    }
  }

  handleCheckboxes = (e) => {
    const checkbox = e.target;
    const updatedExpansions = [...this.state.pendingExpansions];
    if (checkbox.checked === true) {
      updatedExpansions.push(checkbox.id);
      this.setState({ pendingExpansions: updatedExpansions });
    } else {
      const expansionsWithRemovedItem = updatedExpansions.filter((item) => item !== checkbox.id);
      this.setState({ pendingExpansions: expansionsWithRemovedItem });
    }
  }

  selectAll = () => {
    const allExpansionNames = this.props.allExpansions.map((exp) => exp.order[0]);
    this.setState({ pendingExpansions: allExpansionNames });
  }

  unselectAll = () => {
    this.setState({ pendingExpansions: [] });
  }

  updateExpansionModalExpansions = () => {
    this.props.updateDiagramExpansions(this.state.pendingExpansions);
    this.props.toggle();
  }

  render() {
    const { allExpansions, modal, toggle } = this.props;
    const modalText = '';
    const printExpansionList = allExpansions.map((exp) => <FormGroup key={exp.order[0]} check>
        <Label check>
          <Input
            checked={this.state.pendingExpansions.includes(exp.order[0])}
            id={exp.order[0]}
            onChange={this.handleCheckboxes}
            type="checkbox" />{' '}
          {exp.data.name}
        </Label>
      </FormGroup>);

    if (this.state.expansions) {
      return <Modal isOpen={modal} toggle={toggle}>
      <ModalBody>
        <div className="d-flex selectButtons">
          <button
            className="btn btn-outline-primary col-3"
            onClick={this.selectAll}>
            Select All
          </button>
          <button className="btn btn-outline-danger col-3"
            onClick={this.unselectAll}>
            Unselect All
          </button>
        </div>
      </ModalBody>
      <ModalBody className="modal-body-main">
        <Form className="d-flex flex-column flex-wrap">
          {printExpansionList}
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.updateExpansionModalExpansions}>Confirm</Button>{' '}
        <Button color="secondary" onClick={this.cancelModal}>Cancel</Button>
      </ModalFooter>
    </Modal>;
    }

    return (
      <div>
        {modalText}
      </div>
    );
  }
}

export default ExpansionModal;
