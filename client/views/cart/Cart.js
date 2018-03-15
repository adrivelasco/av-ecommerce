import React from 'react';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Header, Button, Icon, Table } from 'semantic-ui-react';

import { getCart } from '../../actions/marketplace';
import s from './Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.getSubtotal = this.getSubtotal.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getCart());
  }

  formatPrice(price, n = 2, x = 3, s = ',', c = '.') {
    let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
    let num = price.toFixed(Math.max(0, ~~n));
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  }

  priceToNumber(price) {
    return Number(price.replace(/[^0-9\.-]+/g, ''));
  }

  getSubtotal() {
    let subtotal = 0;
    this.props.marketplace.cart.results.map((product, i) => {
      let price = this.priceToNumber(product.price);
      subtotal = subtotal + (price * product.quantity);
    });
    console.log(subtotal);
    return subtotal;
  }

  getTotal() {
    const shipping = 0;
    return this.getSubtotal() + shipping;
  }

  render() {
    const { marketplace, history } = this.props;
    if (marketplace.cart.success) {
      if (typeof marketplace.cart.results === 'undefined' || marketplace.cart.results.length === 0) {
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
                            <Item.Header>{product.name}</Item.Header>
                            <Item.Header size="small">{product.company}</Item.Header>
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
                                  <strong> ${this.formatPrice(product.quantity * this.priceToNumber(product.price))}</strong>
                                </p>
                              </div>
                            </Item.Meta>
                          </Item.Content>
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
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Subtotal</Table.Cell>
                        <Table.Cell>${this.formatPrice(this.getSubtotal())}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Shipping</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Total</Table.Cell>
                        <Table.Cell>${this.formatPrice(this.getTotal())}</Table.Cell>
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
