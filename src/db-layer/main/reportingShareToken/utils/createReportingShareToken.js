const { HttpServerError, BadRequestError } = require("common");

const { ElasticIndexer } = require("serviceCommon");

const { ReportingShareToken } = require("models");
const { hexaLogger, newUUID } = require("common");

const indexDataToElastic = async (data) => {
  const elasticIndexer = new ElasticIndexer(
    "reportingShareToken",
    this.session,
    this.requestId,
  );
  await elasticIndexer.indexData(data);
};

const validateData = (data) => {
  const requiredFields = [
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

  requiredFields.forEach((field) => {
    if (data[field] === null || data[field] === undefined) {
      throw new BadRequestError(
        `Field "${field}" is required and cannot be null or undefined.`,
      );
    }
  });

  if (!data.id) {
    data.id = newUUID();
  }
};

const createReportingShareToken = async (data) => {
  try {
    validateData(data);

    const newreportingShareToken = await ReportingShareToken.create(data);
    const _data = newreportingShareToken.getData();
    await indexDataToElastic(_data);
    return _data;
  } catch (err) {
    throw new HttpServerError(
      "errMsg_dbErrorWhenCreatingReportingShareToken",
      err,
    );
  }
};

module.exports = createReportingShareToken;
