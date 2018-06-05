// @flow strict
const nextRoutes = require('next-routes');

const routes = nextRoutes().add('dynamic', '/dynamic/:id');

module.exports = routes;
