import { Register as RegisterEvent } from "../generated/IdRegistry/IdRegistry";
import { Register } from "../generated/schema";

export function handleRegister(event: RegisterEvent): void {
  let entity = new Register(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.to = event.params.to;
  entity.IdRegistry_id = event.params.id;
  entity.recovery = event.params.recovery;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
