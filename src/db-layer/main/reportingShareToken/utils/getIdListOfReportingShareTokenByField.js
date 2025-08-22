const { HttpServerError, NotFoundError, BadRequestError } = require("common");

const { ReportingShareToken } = require("models");
const { Op } = require("sequelize");

const getIdListOfReportingShareTokenByField = async (
  fieldName,
  fieldValue,
  isArray,
) => {
  try {
    let isValidField = false;

    const reportingShareTokenProperties = [
      "id",
      "configName",
      "objectName",
      "objectId",
      "ownerId",
      "peopleOption",
      "tokenPermissions",
      "allowedEmails",
      "expireDate",
      "storeId",
    ];

    isValidField = reportingShareTokenProperties.includes(fieldName);

    if (!isValidField) {
      throw new BadRequestError(`Invalid field name: ${fieldName}.`);
    }

    const expectedType = typeof ReportingShareToken[fieldName];

    if (typeof fieldValue !== expectedType) {
      throw new BadRequestError(
        `Invalid field value type for ${fieldName}. Expected ${expectedType}.`,
      );
    }

    const options = {
      where: isArray
        ? { [fieldName]: { [Op.contains]: [fieldValue] }, isActive: true }
        : { [fieldName]: fieldValue, isActive: true },
      attributes: ["id"],
    };

    let reportingShareTokenIdList = await ReportingShareToken.findAll(options);

    if (!reportingShareTokenIdList || reportingShareTokenIdList.length === 0) {
      throw new NotFoundError(
        `ReportingShareToken with the specified criteria not found`,
      );
    }

    reportingShareTokenIdList = reportingShareTokenIdList.map(
      (item) => item.id,
    );
    return reportingShareTokenIdList;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenRequestingReportingShareTokenIdListByField",
      err,
    );
  }
};

module.exports = getIdListOfReportingShareTokenByField;
