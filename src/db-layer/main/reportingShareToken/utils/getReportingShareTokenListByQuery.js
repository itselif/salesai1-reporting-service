const { HttpServerError, BadRequestError } = require("common");

const { ReportingShareToken } = require("models");
const { Op } = require("sequelize");
const { hexaLogger } = require("common");

const getReportingShareTokenListByQuery = async (query) => {
  try {
    if (!query || typeof query !== "object") {
      throw new BadRequestError(
        "Invalid query provided. Query must be an object.",
      );
    }

    const reportingShareToken = await ReportingShareToken.findAll({
      where: { ...query, isActive: true },
    });

    //should i add not found error or only return empty array?
    if (!reportingShareToken || reportingShareToken.length === 0) return [];

    //      if (!reportingShareToken || reportingShareToken.length === 0) {
    //      throw new NotFoundError(
    //      `ReportingShareToken with the specified criteria not found`
    //  );
    //}

    return reportingShareToken.map((item) => item.getData());
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenListByQuery",
      err,
    );
  }
};

module.exports = getReportingShareTokenListByQuery;
