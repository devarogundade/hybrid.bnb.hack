import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ApprovalRequested } from "../generated/schema"
import { ApprovalRequested as ApprovalRequestedEvent } from "../generated/Hybrid/Hybrid"
import { handleApprovalRequested } from "../src/hybrid"
import { createApprovalRequestedEvent } from "./hybrid-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let approvalId = Bytes.fromI32(1234567890)
    let assetId = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let value = BigInt.fromI32(234)
    let newApprovalRequestedEvent = createApprovalRequestedEvent(
      approvalId,
      assetId,
      owner,
      spender,
      value
    )
    handleApprovalRequested(newApprovalRequestedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ApprovalRequested created and stored", () => {
    assert.entityCount("ApprovalRequested", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ApprovalRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "approvalId",
      "1234567890"
    )
    assert.fieldEquals(
      "ApprovalRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assetId",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApprovalRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApprovalRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "spender",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ApprovalRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "value",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
