# Tankabu — Blockchain Fuel Logistics Platform

**Tankabu** is a decentralized fuel logistics platform that tracks fuel shipments in real-time, detects volume anomalies at checkpoints, and enforces delivery integrity through on-chain smart contracts.

---

## Overview

The fuel distribution industry suffers from systemic losses due to diversion, adulteration, and measurement fraud. Tankabu addresses this by combining GPS-based shipment tracking with a transparent, immutable audit trail on the blockchain.

Every checkpoint scan is recorded on-chain. When a volume anomaly is detected — a discrepancy between the expected and recorded volume — a smart contract fires automatically, logging the incident and alerting operations.

---

## Features

- 🚛 **Live Fleet Dashboard** — Monitor all active shipments and their route progress in real-time.
- 📍 **Checkpoint Verification** — Scan and verify fuel volume at each delivery checkpoint.
- ⚠️ **Anomaly Detection** — Automatically flags volume discrepancies with on-chain evidence.
- 🔗 **Smart Contract Integration** — Incidents are immutably logged on-chain via auto-fired contracts.
- 🦊 **MetaMask Wallet Connect** — Role-based access gated behind wallet authentication.
- 🗺️ **Route Map Visualization** — SVG-based live route map with interactive checkpoint markers.
- 📋 **Multi-Role Interfaces** — Dedicated views for Admin, Driver, Dispatcher, Checkpoint Officer, and Station Manager.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript |
| Routing | React Router v7 |
| Build | Vite |
| Styling | Tailwind CSS + Vanilla CSS |
| Web3 | MetaMask / Ethers.js |
| Package Manager | pnpm |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 9

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm preview
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

---

## Project Structure

```
src/
├── components/       # Shared UI components (TopNav, layout, etc.)
├── context/          # React context providers (Shipments, Wallet)
├── layouts/          # Page layout wrappers
├── pages/            # Route-level page components
└── main.tsx          # Application entry point
```

---

## License

MIT © Tankabu
