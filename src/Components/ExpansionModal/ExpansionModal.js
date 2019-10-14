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

  updateExpansionModalExpansions = () => {
    this.props.updateDiagramExpansions(this.state.pendingExpansions);
    this.props.toggle();
  }

  render() {
    const { modal, toggle } = this.props;
    const modalText = '';
    if (this.state.expansions) {
      return <Modal isOpen={modal} toggle={toggle}>
      <ModalBody>
        <Form>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theFirstExpansion')}
                id="theFirstExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The First Expansion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theSecondExpansion')}
                id="theSecondExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The Second Expansion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theThirdExpansion')}
                id="theThirdExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The Third Expansion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theFourthExpansion')}
                id="theFourthExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The Fourth Expansion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theFifthExpansion')}
                id="theFifthExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The Fifth Expansion
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                checked={this.state.pendingExpansions.includes('theSixthExpansion')}
                id="theSixthExpansion"
                onChange={this.handleCheckboxes}
                type="checkbox" />{' '}
              The Sixth Expansion
            </Label>
          </FormGroup>
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
