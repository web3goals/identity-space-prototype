import { NewOwner as NewOwnerEvent } from "../generated/Registry/Registry";
import { Account, Domain } from "../generated/schema";
import { BigInt, ByteArray, crypto, ens } from "@graphprotocol/graph-ts";

/**
 * CONSTANTS
 */

const ROOT_NODE =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const EMPTY_ADDRESS = "0x0000000000000000000000000000000000000000";
const BIG_INT_ZERO = BigInt.fromI32(0);

/**
 * UTILS
 */

function concat(a: ByteArray, b: ByteArray): ByteArray {
  let out = new Uint8Array(a.length + b.length);
  for (let i = 0; i < a.length; i++) {
    out[i] = a[i];
  }
  for (let j = 0; j < b.length; j++) {
    out[a.length + j] = b[j];
  }
  return changetype<ByteArray>(out);
}

function createDomain(node: string, timestamp: BigInt): Domain {
  let domain = new Domain(node);
  if (node == ROOT_NODE) {
    domain = new Domain(node);
    domain.owner = EMPTY_ADDRESS;
    domain.isMigrated = true;
    domain.createdAt = timestamp;
    domain.subdomainCount = 0;
  }
  return domain;
}

function getDomain(
  node: string,
  timestamp: BigInt = BIG_INT_ZERO
): Domain | null {
  let domain = Domain.load(node);
  if (domain === null && node == ROOT_NODE) {
    return createDomain(node, timestamp);
  } else {
    return domain;
  }
}

function saveDomain(domain: Domain): void {
  recurseDomainDelete(domain);
  domain.save();
}

function recurseDomainDelete(domain: Domain): string | null {
  if (
    (domain.resolver == null ||
      domain.resolver!.split("-")[0] == EMPTY_ADDRESS) &&
    domain.owner == EMPTY_ADDRESS &&
    domain.subdomainCount == 0
  ) {
    const parentDomain = Domain.load(domain.parent!);
    if (parentDomain != null) {
      parentDomain.subdomainCount = parentDomain.subdomainCount - 1;
      parentDomain.save();
      return recurseDomainDelete(parentDomain);
    }
    return null;
  }
  return domain.id;
}

function makeSubnode(event: NewOwnerEvent): string {
  return crypto
    .keccak256(concat(event.params.node, event.params.label))
    .toHexString();
}

/**
 * HANDLERS
 */

export function handleNewOwner(event: NewOwnerEvent): void {
  let account = new Account(event.params.owner.toHexString());
  account.save();

  let subnode = makeSubnode(event);
  let domain = getDomain(subnode, event.block.timestamp);
  let parent = getDomain(event.params.node.toHexString());

  if (domain === null) {
    domain = new Domain(subnode);
    domain.createdAt = event.block.timestamp;
    domain.subdomainCount = 0;
  }

  if (domain.parent === null && parent !== null) {
    parent.subdomainCount = parent.subdomainCount + 1;
    parent.save();
  }

  if (domain.name == null) {
    // Define label name
    let label = ens.nameByHash(event.params.label.toHexString());
    if (label != null) {
      domain.labelName = label;
    }
    if (label === null) {
      label = "[" + event.params.label.toHexString().slice(2) + "]";
    }
    // Define name
    if (event.params.node.toHexString() == ROOT_NODE) {
      domain.name = label;
    } else if (parent) {
      let name = parent.name;
      if (label && name) {
        domain.name = label + "." + name;
      }
    } else if (label) {
      domain.name = label + ".eth";
    }
  }

  domain.owner = event.params.owner.toHexString();
  domain.parent = event.params.node.toHexString();
  domain.labelhash = event.params.label;
  domain.isMigrated = true;
  saveDomain(domain);
}
