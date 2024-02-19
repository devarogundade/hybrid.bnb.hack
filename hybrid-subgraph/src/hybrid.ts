import {
  ApprovalRequested as ApprovalRequestedEvent,
  ApprovalResult as ApprovalResultEvent,
  AssetDowngraded as AssetDowngradedEvent,
  AssetUpgraded as AssetUpgradedEvent,
  CloseHybrid as CloseHybridEvent,
  WalletBind as WalletBindEvent,
  WalletUnBind as WalletUnBindEvent
} from "../generated/Hybrid/Hybrid"
import {
  ApprovalRequested,
  ApprovalResult,
  AssetDowngraded,
  AssetUpgraded,
  CloseHybrid,
  WalletBind,
  WalletUnBind
} from "../generated/schema"

export function handleApprovalRequested(event: ApprovalRequestedEvent): void {
  let entity = new ApprovalRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.approvalId = event.params.approvalId
  entity.assetId = event.params.assetId
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalResult(event: ApprovalResultEvent): void {
  let entity = new ApprovalResult(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.approvalId = event.params.approvalId
  entity.Status = event.params.Status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetDowngraded(event: AssetDowngradedEvent): void {
  let entity = new AssetDowngraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.assetId = event.params.assetId
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAssetUpgraded(event: AssetUpgradedEvent): void {
  let entity = new AssetUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.assetId = event.params.assetId
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCloseHybrid(event: CloseHybridEvent): void {
  let entity = new CloseHybrid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.endTimestamp = event.params.endTimestamp
  entity.status = event.params.status

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWalletBind(event: WalletBindEvent): void {
  let entity = new WalletBind(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.signer = event.params.signer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWalletUnBind(event: WalletUnBindEvent): void {
  let entity = new WalletUnBind(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
