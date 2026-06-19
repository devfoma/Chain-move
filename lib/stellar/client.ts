import { getStellarConfig, type StellarConfig, type StellarNetwork } from "./config"

const NETWORK_PASSPHRASES: Record<StellarNetwork, string> = {
  testnet: "Test SDF Network ; September 2015",
  mainnet: "Public Global Stellar Network ; September 2015",
}

export function getHorizonUrl(config: StellarConfig = getStellarConfig()): string {
  return config.horizonUrl
}

export function getStellarRpcUrl(config: StellarConfig = getStellarConfig()): string {
  return config.rpcUrl
}

export function getStellarNetworkPassphrase(
  config: Pick<StellarConfig, "network"> = getStellarConfig(),
): string {
  return NETWORK_PASSPHRASES[config.network]
}
