'use strict';

/**
 * static-entity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::static-entity.static-entity');
