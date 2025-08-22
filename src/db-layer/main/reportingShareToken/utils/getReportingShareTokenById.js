const { HttpServerError } = require("common");

let { ReportingShareToken } = require("models");
const { hexaLogger } = require("common");
const { Op } = require("sequelize");

const getReportingShareTokenById = async (reportingShareTokenId) => {
  try {
    const reportingShareToken = Array.isArray(reportingShareTokenId)
      ? await ReportingShareToken.findAll({
          where: {
            id: { [Op.in]: reportingShareTokenId },
            isActive: true,
          },
        })
      : await ReportingShareToken.findOne({
          where: {
            id: reportingShareTokenId,
            isActive: true,
          },
        });

    if (!reportingShareToken) {
      return null;
    }
    return Array.isArray(reportingShareTokenId)
      ? reportingShareToken.map((item) => item.getData())
      : reportingShareToken.getData();
  } catch (err) {
    console.log(err);
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenById",
      err,
    );
  }
};

module.exports = getReportingShareTokenById;
