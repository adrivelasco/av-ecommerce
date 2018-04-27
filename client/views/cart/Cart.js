import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Segment, Item, Header, Button, Table, Icon, Popup } from 'semantic-ui-react';

import { formatPrice, priceToNumber } from '../../utils/price';
import { getCart, removeProduct } from '../../actions/marketplace';
import styles from './Cart.css';

class Cart extends React.Component {
  static propTypes = {
    marketplace: PropTypes.shape({
      cart: PropTypes.shape({
        success: PropTypes.bool,
        results: PropTypes.arrayOf(PropTypes.shape({
          picture: PropTypes.string,
          name: PropTypes.string,
          company: PropTypes.string,
          price: PropTypes.string,
          description: PropTypes.string,
          stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }))
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this._removeProduct = this._removeProduct.bind(this);
  }

  componentDidMount() {
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
          <div className={styles.empty}>
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
        <div className={styles.root}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <Segment>
                  <Item.Group divided>
                    {marketplace.cart.results.map((product, i) => {
                      return (
                        <Item key={i} style={{ position: 'relative' }}>
                          <Item.Image size="small" src={product.picture} />
                          <Item.Content>
                            <Item.Header>{product.name} - {product.company}</Item.Header>
                            <Item.Meta>
                              <div className={styles.productInfo}>
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
                          <Popup
                            size="mini"
                            trigger={
                              <div
                                className={styles.close}
                                onClick={() => this._removeProduct(product)}
                              >
                                <Icon className={styles.icon} name="close" />
                              </div>
                            }
                            content="Remove product"
                            inverted
                          />
                        </Item>
                      );
                    })}
                  </Item.Group>
                </Segment>
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

  async _removeProduct(product) {
    await this.props.dispatch(removeProduct(product));
    this.props.dispatch(getCart());
  }
}

function mapStateToProps(state) {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Cart);
