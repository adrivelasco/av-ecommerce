import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Header, Button, Table, Icon } from 'semantic-ui-react';

import { formatPrice, priceToNumber } from '../../utils/price';
import { getCart, removeProduct } from '../../actions/marketplace';
import s from './Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.getSubtotal = this.getSubtotal.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
  }

  async removeProduct(product) {
    await this.props.dispatch(removeProduct(product));
    this.props.dispatch(getCart());
  }

  componentWillMount() {
    this.props.dispatch(getCart());
  }

  getSubtotal() {
    let subtotal = 0;
    this.props.marketplace.cart.results.map((product, i) => {
      let price = priceToNumber(product.price);
      subtotal = subtotal + (price * product.quantity);
    });
    return subtotal;
  }

  getTotal() {
    const shipping = 0;
    return this.getSubtotal() + shipping;
  }

  render() {
    const { marketplace, history } = this.props;
    if (marketplace.cart.success) {
      if (typeof marketplace.cart.results === 'undefined' ||
      marketplace.cart.results === null ||
      marketplace.cart.results.length === 0) {
        return (
          <div className={s.empty}>
            <Header as="h1" icon>
              Your cart is empty
              <Header.Subheader>
                You don't have any product added
              </Header.Subheader>
              <br />
              <Button primary onClick={(e) => history.push('/')}>
                Back to Home
              </Button>
            </Header>
          </div>
        );
      }
      return (
        <div className={s.root}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <div>
                  <Item.Group divided>
                    {marketplace.cart.results.map((product, i) => {
                      return (
                        <Item key={i}>
                          <Item.Image size="small" src={product.picture} />
                          <Item.Content>
                            <Item.Header>{product.name} - {product.company}</Item.Header>
                            <Item.Meta>
                              <div className={s.productInfo}>
                                <p className="price">
                                  Subtotal: <strong>{product.price}</strong>
                                </p>
                                <p className="quantity">
                                  Quantity: <strong>{product.quantity}</strong>
                                </p>
                                <p className="quantity">
                                  Total:
                                  <strong> ${formatPrice(product.quantity * priceToNumber(product.price))}</strong>
                                </p>
                              </div>
                            </Item.Meta>
                          </Item.Content>
                          <div
                            className={s.close}
                            onClick={() => this.removeProduct(product)}
                          >
                            <Icon name="close" />
                          </div>
                        </Item>
                      );
                    })}
                  </Item.Group>
                </div>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>
                  <Table singleLine>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Summary</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Subtotal</Table.Cell>
                        <Table.Cell>${formatPrice(this.getSubtotal())}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Shipping</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Total</Table.Cell>
                        <Table.Cell>${formatPrice(this.getTotal())}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Button fluid primary>
                    Checkout
                  </Button>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Cart);
