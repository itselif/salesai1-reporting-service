const { HttpServerError, NotFoundError } = require("common");
const { hexaLogger } = require("common");

const {
  ReportRequest,
  ReportFile,
  ReportPolicy,
  ReportingShareToken,
} = require("models");
const { Op } = require("sequelize");

const getReportingShareTokenAggById = async (reportingShareTokenId) => {
  try {
    const forWhereClause = false;
    const includes = [];

    const reportingShareToken = Array.isArray(reportingShareTokenId)
      ? await ReportingShareToken.findAll({
          where: {
            id: { [Op.in]: reportingShareTokenId },
            isActive: true,
          },
          include: includes,
        })
      : await ReportingShareToken.findOne({
          where: {
            id: reportingShareTokenId,
            isActive: true,
          },
          include: includes,
        });

    if (!reportingShareToken) {
      return null;
    }

    const reportingShareTokenData =
      Array.isArray(reportingShareTokenId) && reportingShareTokenId.length > 0
        ? reportingShareToken.map((item) => item.getData())
        : reportingShareToken.getData();
    await ReportingShareToken.getCqrsJoins(reportingShareTokenData);
    return reportingShareTokenData;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenAggById",
      err,
    );
  }
};

module.exports = getReportingShareTokenAggById;
