import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Button, Alert } from 'react-bootstrap';
import CategoryModal from './CategoryModal';
import CategoriesList from './CategoriesList';
import SweetAlert from 'react-bootstrap-sweetalert';
import './AdminCategories.css';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      status: 'init',
      error: null,
      showModal: false,
      selected: null,
      removeCandidate: null,
      removeStatus: 'init',
      removeError: null
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.setState(prevState => ({
      ...prevState,
      status: 'pending'
    }));

    fetch('http://localhost:3500/categories')
      .then(response => response.json())
      .then(data => {
        this.setState(prevState => ({
          ...prevState,
          status: 'success',
          categories: data
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          status: 'failure',
          error: err.message
        }));
      });
  }

  requestConfirmation(category) {
    this.setState(prevState => ({
      ...prevState,
      removeCandidate: category
    }));
  }

  cancelRemove(category) {
    this.setState(prevState => ({
      ...prevState,
      removeCandidate: null
    }));
  }

  removeCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      removeCandidate: null,
      removeStatus: 'pending'
    }));

    fetch(`http://localhost:3500/categories/${category.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(category => {
        this.setState(prevState => ({
          ...prevState,
          removeStatus: 'init',
          categories: prevState.categories.filter(c => c.id !== category.id)
        }));
      })
      .catch(err => {
        this.setState(prevState => ({
          ...prevState,
          removeStatus: 'failure',
          removeError: err.message
        }));
      });
  }

  updateCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      showModal: true,
      selected: category
    }));
  }

  addCategory(category) {
    this.setState(prevState => ({
      ...prevState,
      showModal: true
    }));
  }

  hideModal() {
    this.setState(prevState => ({
      ...prevState,
      showModal: false,
      selected: null
    }));
  }

  handleSave(category) {
    const { selected } = this.state;

    this.setState(prevState => ({
      ...prevState,
      showModal: false,
      selected: false,
      categories: selected
        ? prevState.categories.map(c => c.id === category.id ? category : c)
        : [...prevState.categories, category]
    }));
  }

  render() {
    const { categories, status, error, showModal, selected, removeCandidate, removeStatus, removeError } = this.state;

    return (
      <Grid>
        <PageHeader>
          Categories admin <small>Create, edit and remove categories</small>
        </PageHeader>

        <Row>
          <Col md={12}>
            <div className="AdminCategories-mainAction">
              <Button bsStyle="primary" bsSize="xs" onClick={() => this.addCategory()}>New Category</Button>
            </div>
          </Col>
        </Row>

        {removeStatus === 'failure' && <Row>
          <Alert bsStyle="danger">
            <h4>There was an error trying to delete the category.</h4>
            <p>{removeError}</p>
          </Alert>
        </Row>}

        <Row>
          {status === 'pending' && <Col md={12}>Loading...</Col>}

          {status === 'failure' && <div>Error: {error} </div>}

          {status === 'success' && <CategoriesList
            items={categories}
            onSelect={category => this.updateCategory(category)}
            onRemove={category => this.requestConfirmation(category)} />}
        </Row>

        <CategoryModal
          onCancel={() => this.hideModal()}
          show={showModal}
          category={selected}
          onSave={category => this.handleSave(category)} />

        {removeCandidate && removeStatus === 'init' &&
          <SweetAlert
            warning
            showCancel
            title={`Delete "${removeCandidate.label}"?`}
            confirmBtnText={`Yes, Delete!`}
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            onConfirm={() => this.removeCategory(removeCandidate)}
            onCancel={() => this.cancelRemove()} />}
      </Grid>
    );
  }
}

export default AdminCategories;
