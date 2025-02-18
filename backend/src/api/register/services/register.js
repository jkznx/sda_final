'use strict';

/**
 * register service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::register.register');
