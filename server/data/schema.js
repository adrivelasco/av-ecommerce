const rp = require('request-promise');
const { makeExecutableSchema } = require('graphql-tools');

const config = require('../config');

const typeDefs = `
  type Query {
    product(id: Int!): Product!
    products: [Product]!
    cart: [Product]!
  }

  type Product {
    name: String
    company: String
    description: String
    price: String
    address: String
    picture: String
  }
`;

const resolvers = {
  Query: {
    /**
     * Product by id
     * @param {Object} obj
     * @param {Object} args - Args passed to resolver
     * @param {Number} args.id - Product ID
     * @returns {Object} - Result of filter products by id
     */
    product: async (obj, args) => {
      if (typeof args.id !== 'number') {
        throw Error('ID is necessary to filter');
      }

      try {
        const response = await rp({
          json: true,
          uri: config.apiMarketPlace
        });
        return response.find((product, i) => i === args.id);
      } catch (err) {
        throw Error(err);
      }
    },
    /**
     * List of products
     * @returns {Array} - List of products
     */
    products: async () => {
      try {
        const response = await rp({
          json: true,
          uri: config.apiMarketPlace
        });
        return response;
      } catch (err) {
        throw Error(err);
      }
    }
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = schema;
