"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetType = exports.ApprovalStatus = void 0;
var ApprovalStatus;
(function (ApprovalStatus) {
    ApprovalStatus[ApprovalStatus["ACCEPTED"] = 0] = "ACCEPTED";
    ApprovalStatus[ApprovalStatus["REJECTED"] = 1] = "REJECTED";
    ApprovalStatus[ApprovalStatus["PENDING"] = 2] = "PENDING";
    ApprovalStatus[ApprovalStatus["DEFAULT"] = 3] = "DEFAULT";
})(ApprovalStatus || (exports.ApprovalStatus = ApprovalStatus = {}));
var AssetType;
(function (AssetType) {
    AssetType[AssetType["ERC36"] = 0] = "ERC36";
    AssetType[AssetType["ERC754"] = 1] = "ERC754";
})(AssetType || (exports.AssetType = AssetType = {}));
