import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';

class CategoryModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.category || { label: '' },
      status: 'init',
      error: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const { category } = nextProps;

    this.setState(prevState => ({
      ...prevState,
      category: category || { label: '' }
    }));
  }

  handleChange(e, key) {
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
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

  save(category) {
    const { onSave } = this.props;

    this.setState(prevState => ({
      ...prevState,
      status: 'loading'
    }));

    fetch('http://localhost:3500/categories', {
      method: 'POST',
      body: JSON.stringify(category),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(category => {
        console.log('category');
        console.log(category);
        this.setState(prevState => ({
          ...prevState,
          status: 'init',
          error: null
        }));
        onSave(category);
      })
      .catch(err => this.setState(prevState => ({
        ...prevState,
        status: 'failure',
        error: null
      })));
  }

  update(category) {
    const { onSave } = this.props;

    this.setState(prevState => ({
      ...prevState,
      status: 'loading'
    }));

    fetch(`http://localhost:3500/categories/${category.id}`, {
      method: 'PUT',
      body: JSON.stringify(category),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(category => {
        this.setState(prevState => ({
          ...prevState,
          status: 'init',
          error: null
        }));
        onSave(category);
      })
      .catch(err => this.setState(prevState => ({
        ...prevState,
        status: 'failure',
        error: null
      })));
  }

  render() {
    const { onCancel, show } = this.props;
    const { category, status, error } = this.state;
    const edit = category && category.id;
    const title = edit ? 'Edit category' : 'Create Category';

    return (
      <Modal show={show} onHide={() => onCancel()}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === 'failure' && (
            <Alert bsStyle="warning">
              <strong>Error!</strong> {error}
            </Alert>
          )}

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
          <Button onClick={() => this.handleSave()} disabled={status === 'loading'}>Save</Button>
          <Button onClick={() => onCancel()} disabled={status === 'loading'}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CategoryModal;
