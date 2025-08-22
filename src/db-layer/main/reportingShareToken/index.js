const utils = require("./utils");
const dbApiScripts = require("./dbApiScripts");

module.exports = {
  createReportingShareToken: utils.createReportingShareToken,
  getIdListOfReportingShareTokenByField:
    utils.getIdListOfReportingShareTokenByField,
  getReportingShareTokenById: utils.getReportingShareTokenById,
  getReportingShareTokenAggById: utils.getReportingShareTokenAggById,
  getReportingShareTokenListByQuery: utils.getReportingShareTokenListByQuery,
  getReportingShareTokenStatsByQuery: utils.getReportingShareTokenStatsByQuery,
  getReportingShareTokenByQuery: utils.getReportingShareTokenByQuery,
  updateReportingShareTokenById: utils.updateReportingShareTokenById,
  updateReportingShareTokenByIdList: utils.updateReportingShareTokenByIdList,
  updateReportingShareTokenByQuery: utils.updateReportingShareTokenByQuery,
  deleteReportingShareTokenById: utils.deleteReportingShareTokenById,
  deleteReportingShareTokenByQuery: utils.deleteReportingShareTokenByQuery,
  getReportingShareTokenByStoreId: utils.getReportingShareTokenByStoreId,
};
