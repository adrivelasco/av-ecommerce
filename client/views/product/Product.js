import React from 'react';
import { connect } from 'react-redux';
import { Button, Segment, Grid, Header, Image, Input } from 'semantic-ui-react';

import { getProductById } from '../../actions/marketplace';
import s from './Product.css';

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1
    };
  }
  componentWillMount() {
    const { dispatch, marketplace, match } = this.props;
    if (!marketplace.product.success || marketplace.product._id != match.params.id) {
      dispatch(getProductById.fetch({
        productId: match.params.productId,
        productList: marketplace.products.success
          ? marketplace.products.results
          : []
      }));
    }
  }
  render() {
    const { marketplace } = this.props;
    if (marketplace.product.success) {
      const prod = marketplace.product.results;
      return (
        <div className={s.root}>
          <Segment style={{ padding: '8em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
              <Grid.Row>
                <Grid.Column floated='left' width={6}>
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
                  <div>
                    <div>
                      <Input size="large">
                        {this.state.quantity}
                      </Input>
                      <Button.Group>
                        <Button icon='minus' onClick={this.handleRemove} />
                        <Button icon='plus' onClick={this.handleAdd} />
                      </Button.Group>
                    </div>
                    <Button primary>Add to cart</Button>
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
