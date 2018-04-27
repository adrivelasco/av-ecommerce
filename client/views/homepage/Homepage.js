import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Image as ImageComponent, Item, Pagination, Grid } from 'semantic-ui-react';

import Loading from '../../components/Loading/Loading';
import { getMarketProducts } from '../../actions/marketplace';
import styles from './Homepage.css';

class Homepage extends React.Component {
  static propTypes = {
    marketplace: PropTypes.shape({
      products: PropTypes.shape({
        success: PropTypes.bool,
        isFetching: PropTypes.bool,
        results: PropTypes.arrayOf(PropTypes.shape({
          picture: PropTypes.string,
          name: PropTypes.string,
          company: PropTypes.string,
          price: PropTypes.string,
          description: PropTypes.string,
          stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        }))
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };

    this._onPageChange = this._onPageChange.bind(this);
    this._onProductClick = this._onProductClick.bind(this);
  }

  createGroupedArray(arr, chunkSize) {
    let groups = [];
    let i;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  componentDidMount() {
    if (!this.props.marketplace.products.success && !this.props.marketplace.products.isFetching) {
      this.props.dispatch(getMarketProducts.fetch());
    }
  }

  render() {
    const { marketplace } = this.props;

    if (marketplace.products.isFetching) {
      return <Loading />;
    }

    if (marketplace.products.success) {
      const groupedArr = this.createGroupedArray(marketplace.products.results, 8);
      return (
        <div className={styles.root}>
          <div className={styles.pagination}>
            <div>
              <p>Búsqueda: <strong>{marketplace.products.results.length}</strong> resultados encontrados</p>
            </div>
            <Pagination
              lastItem={null}
              firstItem={null}
              defaultActivePage={this.state.page}
              totalPages={groupedArr.length}
              onPageChange={this._onPageChange}
              size="tiny"
            />
          </div>
          <Grid>
            <Grid.Row columns={4}>
              {groupedArr[this.state.page - 1].map((product, i) => {
                return (
                  <Grid.Column key={product._id}>
                    <Item key={product._id} className={styles.item}>
                      <Item.Image
                        as="a"
                        className={styles.itemImage}
                        src={product.picture}
                        onClick={(e) => this._onProductClick(e, product)}
                      />
                      <Item.Content className={styles.itemContent}>
                        <div className={styles.itemInfo}>
                          <Item.Meta>
                            <span className={styles.itemPrice}>
                              <strong>{product.price}</strong>
                            </span>
                          </Item.Meta>
                          <Item.Header as="a">{product.name}</Item.Header>
                          <Item.Meta>
                            <span>{product.company}</span>
                          </Item.Meta>
                        </div>
                        <Item.Extra>
                          <Button
                            primary
                            onClick={(e) => this._onProductClick(e, product)}
                          >
                            Add to cart
                          </Button>
                        </Item.Extra>
                      </Item.Content>
                    </Item>
                  </Grid.Column>
                );
              })}
            </Grid.Row>
          </Grid>
        </div>
      );
    }
    return null;
  }

  _onPageChange(e, data) {
    this.setState({
      page: data.activePage
    });
  }

  _onProductClick(e, product) {
    return this.props.history.push(`/${product._id}-${product.name}`);
  }
};

function mapStateToProps(state) {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Homepage);
