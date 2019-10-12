import React from 'react';
import {
  Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

import './ExpansionModal.scss';

class ExpansionModal extends React.Component {
  state = {
    expansions: [],
    pendingExpansions: [],
    test: [],
  }

  cancelModal = () => {
    this.setState({ expansions: this.props.expansions, pendingExpansions: [] });
    this.props.toggle();
  }

  componentDidMount() {
    this.setState({ expansions: this.props.expansions });
  }

  componentDidUpdate(prevProps) {
    // if (this.props.expansion !== prevProps.expansion) {
    //   this.setState({ expansions: this.props.expansions });
    // }
  }

  handleCheckboxes = (e) => {
    const expansion = e.target;
    const currentExpansions = [...this.state.expansions];
    if (e.target.checked === true) {
      currentExpansions.push(expansion.id);
      this.setState({ pendingExpansions: currentExpansions });
    } else {
      const expansionsWithRemovedItem = currentExpansions.filter((item) => item !== expansion.id);
      this.setState({ pendingExpansions: expansionsWithRemovedItem });
    }
  }

  updateExpansionModalExpansions = () => {
    this.props.updateDiagramExpansions(this.state.pendingExpansions);
    this.props.toggle();
  }

  render() {
    const { modal, toggle } = this.props;

    return (
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Expansions</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    checked={this.state.expansions ? this.state.expansions.includes('theFirstExpansion') : ''}
                    id="theFirstExpansion"
                    onChange={this.handleCheckboxes}
                    type="checkbox" />{' '}
                  The First Expansion
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="theSecondExpansion"
                    onChange={this.handleCheckboxes}
                    type="checkbox" />{' '}
                  The Second Expansion
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="theThirdExpansion"
                    onChange={this.handleCheckboxes}
                    type="checkbox" />{' '}
                  The Third Expansion
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="theFourthExpansion"
                    onChange={this.handleCheckboxes}
                    type="checkbox" />{' '}
                  The Fourth Expansion
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    id="theFifthExpansion"
                    onChange={this.handleCheckboxes}
                    type="checkbox" />{' '}
                  The Fifth Expansion
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
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
        </Modal>
      </div>
    );
  }
}

export default ExpansionModal;
