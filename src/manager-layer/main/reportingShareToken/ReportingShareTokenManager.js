const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReportingServiceManager = require("../../service-manager/ReportingServiceManager");

/* Base Class For the Crud Routes Of DbObject ReportingShareToken */
class ReportingShareTokenManager extends ReportingServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "reportingShareToken";
    this.modelName = "ReportingShareToken";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ReportingShareTokenManager;
