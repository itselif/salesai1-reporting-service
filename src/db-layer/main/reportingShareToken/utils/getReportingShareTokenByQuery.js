const { HttpServerError, BadRequestError } = require("common");

const { ReportingShareToken } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReportingShareTokenByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reportingShareToken = await ReportingShareToken.findOne({
      where: { ...query, isActive: true },
    });

    if (!reportingShareToken) return null;
    return reportingShareToken.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenByQuery",
      err,
    );
  }
};

module.exports = getReportingShareTokenByQuery;
