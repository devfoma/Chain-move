import { describe, expect, it } from "vitest"

import type { StellarConfig } from "./config"
import { getHorizonUrl, getStellarNetworkPassphrase, getStellarRpcUrl } from "./client"

const config: StellarConfig = {
  network: "testnet",
  horizonUrl: "https://example.com/horizon",
  rpcUrl: "https://example.com/rpc",
  assetCode: "CMOVE",
  issuerPublicKey: "",
  distributionPublicKey: "",
  contractId: "",
  mock: true,
}

describe("Stellar client utilities", () => {
  it("returns configured endpoints", () => {
    expect(getHorizonUrl(config)).toBe("https://example.com/horizon")
    expect(getStellarRpcUrl(config)).toBe("https://example.com/rpc")
  })

  it("returns the network passphrase", () => {
    expect(getStellarNetworkPassphrase(config)).toBe("Test SDF Network ; September 2015")
  })
})
