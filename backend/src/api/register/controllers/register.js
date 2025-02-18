'use strict';

/**
 * register controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::register.register');
