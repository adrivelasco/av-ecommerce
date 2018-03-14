import React from 'react';
import { connect } from 'react-redux';
import { Loader, Icon, Button, Image as ImageComponent, Item, Pagination } from 'semantic-ui-react';

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
    this.props.dispatch(getMarketProducts.fetch());
  }
  onPageChange(e, data) {
    this.setState({
      page: data.activePage
    });
  }
  render() {
    const { marketplace, history } = this.props;

    if (marketplace.products.isFetching) {
      return (
        <div className={s.loader}>
          <Loader
            active
            inline='centered'
            size="big"
          />
        </div>
      );
    }

    if (marketplace.products.success) {
      const groupedArr = this.createGroupedArray(marketplace.products.results, 6);
      return (
        <div>
          <div className={s.pagination}>
            <Pagination
              lastItem={null}
              firstItem={null}
              defaultActivePage={this.state.page}
              totalPages={groupedArr.length}
              onPageChange={this.onPageChange}
              size="tiny"
            />
          </div>
          <Item.Group divided>
            {groupedArr[this.state.page - 1].map((product, i) => {
              return (
                <Item key={product._id}>
                  <Item.Image src={product.picture} />
                  <Item.Content>
                    <Item.Header as='a'>{product.name}</Item.Header>
                    <Item.Meta>
                      <span>{product.company}</span>
                    </Item.Meta>
                    <Item.Description>{product.description}</Item.Description>
                    <Item.Extra>
                      <Button
                        primary
                        floated='right'
                        onClick={(e) => history.push(`/${product._id}-${product.name}`)}
                      >
                        Add to cart
                      </Button>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
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
