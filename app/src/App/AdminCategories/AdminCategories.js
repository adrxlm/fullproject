import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader, Button } from 'react-bootstrap';
import CategoryModal from './CategoryModal';
import CategoriesList from './CategoriesList';
import './AdminCategories.css';

class AdminCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      status: 'init',
      error: null,
      showModal: false,
      selected: undefined
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

  removeCategory(category) {}

  updateCategory(category) {}

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
      selected: false
    }));
  }

  render() {
    const { categories, status, error, showModal, selected } = this.state;

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

        <Row>
          {status === 'pending' && <Col md={12}>Loading...</Col>}

          {status === 'failure' && <div>Error: {error} </div>}

          {status === 'success' && <CategoriesList items={categories} />}
        </Row>

        <CategoryModal onCancel={() => this.hideModal()} show={showModal} category={selected} />
      </Grid>
    );
  }
}

export default AdminCategories;
