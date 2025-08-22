const {
  HttpServerError,
  BadRequestError,
  NotAuthenticatedError,
  ForbiddenError,
  NotFoundError,
} = require("common");
const { hexaLogger } = require("common");
const { ReportingShareToken } = require("models");
const { Op } = require("sequelize");

const getReportingShareTokenByStoreId = async (storeId) => {
  try {
    const reportingShareToken = await ReportingShareToken.findOne({
      where: {
        storeId: storeId,
        isActive: true,
      },
    });

    if (!reportingShareToken) {
      return null;
    }
    return reportingShareToken.getData();
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenByStoreId",
      err,
    );
  }
};

module.exports = getReportingShareTokenByStoreId;
