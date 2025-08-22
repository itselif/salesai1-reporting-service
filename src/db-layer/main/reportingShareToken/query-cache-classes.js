const { QueryCache, QueryCacheInvalidator } = require("common");

const { Op } = require("sequelize");

class ReportingShareTokenQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("reportingShareToken", [], Op.and, Op.eq, input, wClause);
  }
}
class ReportingShareTokenQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("reportingShareToken", []);
  }
}

module.exports = {
  ReportingShareTokenQueryCache,
  ReportingShareTokenQueryCacheInvalidator,
};
