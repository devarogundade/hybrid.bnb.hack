import { Bytes } from "@graphprotocol/graph-ts";
import {
  ApprovalRequested as ApprovalRequestedEvent,
  ApprovalResult as ApprovalResultEvent,
  AssetDowngraded as AssetDowngradedEvent,
  AssetUpgraded as AssetUpgradedEvent,
  DowngradeRequested as DowngradeRequestedEvent,
  WalletBind as WalletBindEvent,
  WalletUnBind as WalletUnBindEvent
} from "../generated/Hybrid/Hybrid";
import {
  ApprovalRequest,
  DowngradeRequest,
  AssetGrade,
  WalletBind,
  BindRequest
} from "../generated/schema";

enum Status {
  ACCEPTED,
  REJECTED,
  PENDING,
  DEFAULT
}

export function handleApprovalRequested(event: ApprovalRequestedEvent): void {
  let entity = new ApprovalRequest(
    event.params.approvalId
  );

  entity.approvalId = event.params.approvalId;
  entity.assetId = event.params.assetId;
  entity.owner = event.params.owner;
  entity.spender = event.params.spender;
  entity.value = event.params.value;
  entity.status = Status.PENDING;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalResult(event: ApprovalResultEvent): void {
  let entity = ApprovalRequest.load(
    event.params.approvalId
  );

  if (!entity) return;

  entity.status = event.params.Status;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleAssetDowngraded(event: AssetDowngradedEvent): void {
  let entity = AssetGrade.load(
    event.params.assetId.concat(event.params.owner)
  );

  if (!entity) return;

  entity.assetId = Bytes.empty();
  entity.owner = Bytes.empty();

  entity.save();
}

export function handleAssetUpgraded(event: AssetUpgradedEvent): void {
  let entity = new AssetGrade(
    event.params.assetId.concat(event.params.owner)
  );

  entity.assetId = event.params.assetId;
  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleDowngradeRequested(event: DowngradeRequestedEvent): void {
  let entity = new DowngradeRequest(
    event.params.owner
  );

  entity.owner = event.params.owner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWalletBind(event: WalletBindEvent): void {
  let entity = new WalletBind(
    event.params.owner
  );

  entity.owner = event.params.owner;
  entity.signer = event.params.signer;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleWalletUnBind(event: WalletUnBindEvent): void {
  let entity = WalletBind.load(
    event.params.owner
  );

  if (!entity) return;

  entity.owner = Bytes.empty();
  entity.signer = Bytes.empty();

  entity.save();
}

export function handleBindRequest(event: WalletBindEvent): void {
  let entity = new BindRequest(
    event.params.owner
  );

  entity.status = Status.PENDING;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
