import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class CategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category || { label: '' },
      status: 'init',
      error: null
    };
  }

  handleChange(e, key) {
    const value = e.target.value;

    this.setState(prevState => ({
      category: {
        ...prevState.category,
        [key]: value
      }
    }));
  }

  handleSave() {
    const { category } = this.state;
    category.id ? this.update(category) : this.save(category);
  }

  save(category) { }

  update(category) { }

  render() {
    const { onCancel, show } = this.props;
    const { category } = this.state;
    const edit = category && category.id;
    const title = edit ? 'Edit category' : 'Create Category';

    return (
      <Modal show={show} onHide={() => onCancel()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form>
            <FormGroup controlId="categoryForm">
              <ControlLabel>Category label</ControlLabel>
              <FormControl
                type="text"
                value={category.label}
                placeholder="category name"
                onChange={e => this.handleChange(e, 'label')}
              />
            </FormGroup>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.handleSave()}>Save</Button>
          <Button onClick={() => onCancel()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryModal;
