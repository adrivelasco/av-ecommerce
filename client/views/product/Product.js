import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Segment, Grid, Header, Image, Input, Breadcrumb, Modal, Icon, Message, Divider } from 'semantic-ui-react';

import Loading from '../../components/Loading/Loading';
import { formatPrice, priceToNumber } from '../../utils/price';
import { getProductById, addProductToCart } from '../../actions/marketplace';
import styles from './Product.css';

class Product extends React.Component {
  static propTypes = {
    marketplace: PropTypes.shape({
      products: PropTypes.shape({
        success: PropTypes.bool,
        results: PropTypes.arrayOf(PropTypes.shape({
          picture: PropTypes.string,
          name: PropTypes.string,
          company: PropTypes.string,
          price: PropTypes.string,
          description: PropTypes.string,
          stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }))
      }).isRequired,
      product: PropTypes.shape({
        success: PropTypes.bool,
        _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      requested: false
    };

    this._addToCart = this._addToCart.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._increaseQuantity = this._increaseQuantity.bind(this);
    this._decreaseQuantity = this._decreaseQuantity.bind(this);
  }

  componentDidMount() {
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

  render() {
    const { marketplace, history } = this.props;

    if (marketplace.products.isFetching) {
      return <Loading />;
    }

    if (marketplace.product.success) {
      const prod = marketplace.product.results;
      return (
        <div className={styles.root}>
          <Modal open={this.state.requested} size="mini">
            <Header as="h2">
              <Icon color="green" name="check" />
              <Header.Content>
                Added to Cart
                <Header.Subheader>
                  Subtotal ({this.state.quantity} item{this.state.quantity > 1 && 's'}):
                  <strong> ${formatPrice(this.state.quantity * priceToNumber(prod.price))}</strong>
                </Header.Subheader>
              </Header.Content>
            </Header>
            <div className={styles.modalActions}>
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
                onClick={this._closeModal}
              >
                Keep shopping
              </Button>
            </div>
          </Modal>
          <Segment style={{ padding: '3em 0em' }} vertical>
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
                <Grid.Column width={7}>
                  <Image size='large' src={prod.picture} />
                </Grid.Column>
                <Grid.Column width={8}>
                  <Header as="h1" style={{ fontSize: '2em' }}>{prod.name}</Header>
                  <Header.Subheader>{prod.company}</Header.Subheader>
                  <Header as="h2" style={{ fontSize: '2em' }} color="grey">{prod.price}</Header>
                  <p>{prod.description}</p>
                  <br/>
                  <Divider className={styles.divider} />
                  <br/>
                  <div className={styles.controls}>
                    <div className={styles.controlsQuantity}>
                      {prod.stock !== 0
                        ? <p>Stock: <strong>{prod.stock} unit/s</strong></p>
                        : (
                          <Message
                            error
                            size="tiny"
                            content="Product not available"
                          />
                        )
                      }
                      {prod.stock !== 0 && (
                        <div className={styles.inputs}>
                          <Button.Group>
                            <Button
                              icon="minus"
                              onClick={this._decreaseQuantity}
                            />
                            <Button
                              icon="plus"
                              onClick={this._increaseQuantity}
                            />
                          </Button.Group>
                          <Input size="large" className={styles.inputQuantity}>
                            {this.state.quantity}
                          </Input>
                        </div>
                      )}
                    </div>
                    <Button
                      size="large"
                      disabled={prod.stock === 0}
                      primary
                      onClick={this._addToCart}
                    >
                      Add to Cart
                    </Button>
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

  _addToCart(e) {
    this.props.dispatch(
      addProductToCart(this.props.marketplace.product.results, this.state.quantity));
    this.setState({
      requested: true
    });
  }

  _closeModal(e) {
    this.setState({
      requested: false
    });
  }

  _increaseQuantity(e) {
    if (this.props.marketplace.product.results.stock > this.state.quantity) {
      this.setState({
        quantity: this.state.quantity + 1
      });
    }
  }

  _decreaseQuantity(e) {
    if (this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity - 1
      });
    }
  }
};

function mapStateToProps(state) {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Product);
