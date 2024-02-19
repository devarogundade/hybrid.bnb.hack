import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ApprovalRequested,
  ApprovalResult,
  AssetDowngraded,
  AssetUpgraded,
  CloseHybrid,
  WalletBind,
  WalletUnBind
} from "../generated/Hybrid/Hybrid"

export function createApprovalRequestedEvent(
  approvalId: Bytes,
  assetId: Address,
  owner: Address,
  spender: Address,
  value: BigInt
): ApprovalRequested {
  let approvalRequestedEvent = changetype<ApprovalRequested>(newMockEvent())

  approvalRequestedEvent.parameters = new Array()

  approvalRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "approvalId",
      ethereum.Value.fromFixedBytes(approvalId)
    )
  )
  approvalRequestedEvent.parameters.push(
    new ethereum.EventParam("assetId", ethereum.Value.fromAddress(assetId))
  )
  approvalRequestedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalRequestedEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalRequestedEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalRequestedEvent
}

export function createApprovalResultEvent(
  approvalId: Address,
  Status: i32
): ApprovalResult {
  let approvalResultEvent = changetype<ApprovalResult>(newMockEvent())

  approvalResultEvent.parameters = new Array()

  approvalResultEvent.parameters.push(
    new ethereum.EventParam(
      "approvalId",
      ethereum.Value.fromAddress(approvalId)
    )
  )
  approvalResultEvent.parameters.push(
    new ethereum.EventParam(
      "Status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(Status))
    )
  )

  return approvalResultEvent
}

export function createAssetDowngradedEvent(
  assetId: Address,
  owner: Address
): AssetDowngraded {
  let assetDowngradedEvent = changetype<AssetDowngraded>(newMockEvent())

  assetDowngradedEvent.parameters = new Array()

  assetDowngradedEvent.parameters.push(
    new ethereum.EventParam("assetId", ethereum.Value.fromAddress(assetId))
  )
  assetDowngradedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return assetDowngradedEvent
}

export function createAssetUpgradedEvent(
  assetId: Address,
  owner: Address
): AssetUpgraded {
  let assetUpgradedEvent = changetype<AssetUpgraded>(newMockEvent())

  assetUpgradedEvent.parameters = new Array()

  assetUpgradedEvent.parameters.push(
    new ethereum.EventParam("assetId", ethereum.Value.fromAddress(assetId))
  )
  assetUpgradedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return assetUpgradedEvent
}

export function createCloseHybridEvent(
  owner: Address,
  endTimestamp: BigInt,
  status: i32
): CloseHybrid {
  let closeHybridEvent = changetype<CloseHybrid>(newMockEvent())

  closeHybridEvent.parameters = new Array()

  closeHybridEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  closeHybridEvent.parameters.push(
    new ethereum.EventParam(
      "endTimestamp",
      ethereum.Value.fromUnsignedBigInt(endTimestamp)
    )
  )
  closeHybridEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status))
    )
  )

  return closeHybridEvent
}

export function createWalletBindEvent(
  owner: Address,
  signer: Address
): WalletBind {
  let walletBindEvent = changetype<WalletBind>(newMockEvent())

  walletBindEvent.parameters = new Array()

  walletBindEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  walletBindEvent.parameters.push(
    new ethereum.EventParam("signer", ethereum.Value.fromAddress(signer))
  )

  return walletBindEvent
}

export function createWalletUnBindEvent(owner: Address): WalletUnBind {
  let walletUnBindEvent = changetype<WalletUnBind>(newMockEvent())

  walletUnBindEvent.parameters = new Array()

  walletUnBindEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )

  return walletUnBindEvent
}
