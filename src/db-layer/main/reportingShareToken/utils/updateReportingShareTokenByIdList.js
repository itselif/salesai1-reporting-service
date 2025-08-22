const { HttpServerError } = require("common");

const { ReportingShareToken } = require("models");
const { Op } = require("sequelize");

const updateReportingShareTokenByIdList = async (idList, dataClause) => {
  try {
    let rowsCount = null;
    let rows = null;

    const options = {
      where: { id: { [Op.in]: idList }, isActive: true },
      returning: true,
    };

    [rowsCount, rows] = await ReportingShareToken.update(dataClause, options);
    const reportingShareTokenIdList = rows.map((item) => item.id);
    return reportingShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenUpdatingReportingShareTokenByIdList",
      err,
    );
  }
};

module.exports = updateReportingShareTokenByIdList;
