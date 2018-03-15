import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment, Grid, Header, Image, Input, Breadcrumb, Modal, Icon } from 'semantic-ui-react';

import { getProductById, addProductToCart } from '../../actions/marketplace';
import s from './Product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      requested: false
    };

    this.addToCart = this.addToCart.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.increaseQuantity = this.increaseQuantity.bind(this);
    this.decreaseQuantity = this.decreaseQuantity.bind(this);
  }

  componentWillMount() {
    const { dispatch, marketplace, match } = this.props;
    if (!marketplace.product.success || marketplace.product._id != match.params.productId) {
      dispatch(getProductById.fetch({
        productId: match.params.productId,
        productList: marketplace.products.success
          ? marketplace.products.results
          : []
      }));
    }
  }

  addToCart(e) {
    this.props.dispatch(
      addProductToCart(this.props.marketplace.product.results, this.state.quantity));
    this.setState({
      requested: true
    });
  }

  closeModal(e) {
    this.setState({
      requested: false
    });
  }

  increaseQuantity(e) {
    if (this.props.marketplace.product.results.stock > this.state.quantity) {
      this.setState({
        quantity: this.state.quantity + 1
      });
    }
  }

  decreaseQuantity(e) {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }

  render() {
    const { marketplace, history } = this.props;
    if (marketplace.product.success) {
      const prod = marketplace.product.results;
      return (
        <div className={s.root}>
          <Modal open={this.state.requested} size="mini">
            <Header as="h2">
              <Icon color="green" name="check" />
              <Header.Content>
                Added to Cart
                <Header.Subheader>
                  Subtotal ({this.state.quantity} item{this.state.quantity > 1 && 's'}):
                  <strong> ${this.state.quantity * Number(prod.price.replace(/[^0-9\.-]+/g, ''))}</strong>
                </Header.Subheader>
              </Header.Content>
            </Header>
            <div className={s.modalActions}>
              <Button
                fluid
                primary
                onClick={() => history.push('/cart')}
              >
                Proceed to checkout ({this.state.quantity} item{this.state.quantity > 1 && 's'})
              </Button>
              <br />
              <Button
                fluid
                secondary
                onClick={this.closeModal}
              >
                Keep shopping
              </Button>
            </div>
          </Modal>
          <Segment style={{ padding: '4em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column width={12}>
                  <Breadcrumb>
                    <Breadcrumb.Section link onClick={() => history.push('/')}>Home</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>{prod.name}</Breadcrumb.Section>
                  </Breadcrumb>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column floated="left" width={6}>
                  <Image size='large' src={prod.picture} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h1" style={{ fontSize: '2em' }}>
                    {prod.name}
                  </Header>
                  <Header.Subheader>
                    {prod.company}
                  </Header.Subheader>
                  <Header as="h2" style={{ fontSize: '2em' }} color="grey">
                    {prod.price}
                  </Header>
                  <p>
                    {prod.description}
                  </p>
                  <div className={s.controls}>
                    <div className={s.controlsQuantity}>
                      <p>Stock: <strong>{prod.stock} unit/s</strong></p>
                      {prod.stock !== 0
                        ? (
                          <div className={s.inputs}>
                            <Button.Group>
                              <Button
                                icon="minus"
                                onClick={this.decreaseQuantity}
                              />
                              <Button
                                icon="plus"
                                onClick={this.increaseQuantity}
                              />
                            </Button.Group>
                            <Input size="large" className={s.inputQuantity}>
                              {this.state.quantity}
                            </Input>
                          </div>
                        )
                        : 'Sin stock'
                      }
                    </div>
                    <Button primary onClick={this.addToCart}>Add to cart</Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </div>
      );
    }
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Product);
