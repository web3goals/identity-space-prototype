# 🆔 Identity Space

This is an application where you can discover a person's identity based on data from Web3 protocols.

It's also an API that can be used to integrate identities into your web or mobile application.

## 🔗 Artifacts

- Application - [identity-space.vercel.app](https://identity-space.vercel.app/)
- Subgraphs:
  - ENS Subgraph API - [Chainbase](https://api.chainbase.online/v1/subgraph/u81c71f57/id/QmYk4R1vJMhYjojkMZETmERe7QpAkS6JRNxKxnQiNZf2J6), [The Graph](https://api.thegraph.com/subgraphs/name/kiv1n/identity-space-lens)
  - Lens Subgraph API - [The Graph](https://api.thegraph.com/subgraphs/name/kiv1n/identity-space-ens)
  - Farcaster Subgraph API - [The Graph](https://api.thegraph.com/subgraphs/name/kiv1n/identity-space-farcaster)

## 🔨 How it's made

To create this project, I used:

Chainbase infrastructure to build subgraphs that index data from ENS, Lens Protocol, Farcaster so that the application can build a unified account identity.

## 🔮 Plans

There are many ideas on how to improve this project.

It would be great to:

- Add integration with other web3 protocols such as POAP or Guild.

- Implement a protocol that lets people own and control their identity, and link it to web2 services such as Twitter or Discord.

- Add metadata to API responses and create SDK for web and mobile applications.

## 🏗️ Architecture

![Architecture](/architecture.png)
