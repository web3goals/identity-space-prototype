import { Bytes } from "@graphprotocol/graph-ts";
import { LensHub, ProfileCreated } from "../generated/LensHub/LensHub";
import { Profile } from "../generated/schema";

export function handleProfileCreated(event: ProfileCreated): void {
  let lensContract = LensHub.bind(event.address);
  let entity = Profile.load(event.params.profileId.toString());

  if (!entity) {
    entity = new Profile(event.params.profileId.toString());
    let profileData = lensContract.getProfile(event.params.profileId);

    entity.profileId = event.params.profileId;
    entity.creator = event.params.creator;
    entity.owner = event.params.to;
    entity.pubCount = profileData.pubCount;
    entity.followModule = profileData.followModule;
    entity.followNFT = profileData.followNFT;
    entity.handle = profileData.handle.toString();
    entity.imageURI = profileData.imageURI.toString();
    entity.createdOn = event.params.timestamp;
    entity.followNFTURI = profileData.followNFTURI.toString();
    entity.followModuleReturnData = event.params.followModuleReturnData;
    entity.dispatcher = new Bytes(0x0000000000000000000000000000000000000000);
    entity.save();
  }
}
