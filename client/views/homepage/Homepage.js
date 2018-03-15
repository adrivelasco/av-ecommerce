import React from 'react';
import { connect } from 'react-redux';
import { Button, Image as ImageComponent, Item, Pagination, Grid } from 'semantic-ui-react';

import Loading from '../../components/Loading/Loading';
import { getMarketProducts } from '../../actions/marketplace';
import s from './Homepage.css';

class Homepage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };

    this.createGroupedArray = this.createGroupedArray.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onProductClick = this.onProductClick.bind(this);
  }

  createGroupedArray(arr, chunkSize) {
    let groups = [];
    let i;
    for (i = 0; i < arr.length; i += chunkSize) {
      groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
  }

  componentWillMount() {
    if (!this.props.marketplace.products.success &&
      !this.props.marketplace.products.isFetching) {
      this.props.dispatch(getMarketProducts.fetch());
    }
  }

  onPageChange(e, data) {
    this.setState({
      page: data.activePage
    });
  }

  onProductClick(e, product) {
    return this.props.history.push(`/${product._id}-${product.name}`);
  }

  render() {
    const { marketplace } = this.props;

    if (marketplace.products.isFetching) {
      return <Loading />;
    }

    if (marketplace.products.success) {
      const groupedArr = this.createGroupedArray(marketplace.products.results, 8);
      return (
        <div className={s.root}>
          <div className={s.pagination}>
            <div>
              <p>Búsqueda: <strong>{marketplace.products.results.length}</strong> resultados encontrados</p>
            </div>
            <Pagination
              lastItem={null}
              firstItem={null}
              defaultActivePage={this.state.page}
              totalPages={groupedArr.length}
              onPageChange={this.onPageChange}
              size="tiny"
            />
          </div>
          <Grid>
            <Grid.Row columns={4}>
              {groupedArr[this.state.page - 1].map((product, i) => {
                return (
                  <Grid.Column key={product._id}>
                    <Item key={product._id} className={s.item}>
                      <Item.Image
                        as="a"
                        className={s.itemImage}
                        src={product.picture}
                        onClick={(e) => this.onProductClick(e, product)}
                      />
                      <Item.Content className={s.itemContent}>
                        <div className={s.itemInfo}>
                          <Item.Meta>
                            <span className={s.itemPrice}>
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
                            onClick={(e) => this.onProductClick(e, product)}
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
};

const mapStateToProps = (state) => {
  return {
    marketplace: state.marketplace
  };
};

export default connect(mapStateToProps)(Homepage);
