import {
  ChangeRecoveryAddress as ChangeRecoveryAddressEvent,
  DisableTrustedOnly as DisableTrustedOnlyEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  Recover as RecoverEvent,
  Register as RegisterEvent,
  SetTrustedCaller as SetTrustedCallerEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent
} from "../generated/IdRegistry/IdRegistry"
import {
  ChangeRecoveryAddress,
  DisableTrustedOnly,
  EIP712DomainChanged,
  OwnershipTransferStarted,
  OwnershipTransferred,
  Paused,
  Recover,
  Register,
  SetTrustedCaller,
  Transfer,
  Unpaused
} from "../generated/schema"

export function handleChangeRecoveryAddress(
  event: ChangeRecoveryAddressEvent
): void {
  let entity = new ChangeRecoveryAddress(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.IdRegistry_id = event.params.id
  entity.recovery = event.params.recovery

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDisableTrustedOnly(event: DisableTrustedOnlyEvent): void {
  let entity = new DisableTrustedOnly(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRecover(event: RecoverEvent): void {
  let entity = new Recover(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.IdRegistry_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRegister(event: RegisterEvent): void {
  let entity = new Register(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.to = event.params.to
  entity.IdRegistry_id = event.params.id
  entity.recovery = event.params.recovery

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSetTrustedCaller(event: SetTrustedCallerEvent): void {
  let entity = new SetTrustedCaller(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.oldCaller = event.params.oldCaller
  entity.newCaller = event.params.newCaller
  entity.owner = event.params.owner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.IdRegistry_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
