export type StellarNetwork = "testnet" | "mainnet"

export interface StellarConfig {
  network: StellarNetwork
  horizonUrl: string
  rpcUrl: string
  assetCode: string
  issuerPublicKey: string
  distributionPublicKey: string
  contractId: string
  explorerBaseUrl: string
  mock: boolean
  demoPublicKey: string
}

const TESTNET_EXPLORER_BASE_URL = "https://stellar.expert/explorer/testnet"
const MAINNET_EXPLORER_BASE_URL = "https://stellar.expert/explorer/public"
const FALLBACK_DEMO_PUBLIC_KEY = "GABCDMOCKSTELLARPUBLICKEYTESTNET000000000000000000000000000000"

const NETWORK_DEFAULTS: Record<StellarNetwork, Pick<StellarConfig, "horizonUrl" | "rpcUrl" | "explorerBaseUrl">> = {
  testnet: {
    horizonUrl: "https://horizon-testnet.stellar.org",
    rpcUrl: "https://soroban-testnet.stellar.org",
    explorerBaseUrl: TESTNET_EXPLORER_BASE_URL,
  },
  mainnet: {
    horizonUrl: "https://horizon.stellar.org",
    rpcUrl: "https://soroban-mainnet.stellar.org",
    explorerBaseUrl: MAINNET_EXPLORER_BASE_URL,
  },
}

/**
 * Normalizes the deployment network to a supported Stellar network.
 *
 * Keeping this validation in the shared config layer means all server clients
 * select the same endpoints and fail fast instead of silently using Testnet.
 */
export function parseStellarNetwork(value: string | undefined): StellarNetwork {
  const network = value?.trim().toLowerCase() || "testnet"

  if (network === "testnet" || network === "mainnet") {
    return network
  }

  throw new Error(`Invalid Stellar network "${value}". Expected "testnet" or "mainnet".`)
}

export function getStellarConfig(): StellarConfig {
  const network = parseStellarNetwork(process.env.STELLAR_NETWORK)
  const defaults = NETWORK_DEFAULTS[network]
  const mock = process.env.ENABLE_MOCK_STELLAR === "true"

  return {
    network,
    horizonUrl: process.env.STELLAR_HORIZON_URL || defaults.horizonUrl,
    rpcUrl: process.env.STELLAR_RPC_URL || process.env.RPC_URL || defaults.rpcUrl,
    assetCode: process.env.STELLAR_ASSET_CODE || "CMOVE",
    issuerPublicKey: process.env.STELLAR_ISSUER_PUBLIC_KEY || "",
    distributionPublicKey: process.env.STELLAR_DISTRIBUTION_PUBLIC_KEY || "",
    contractId: process.env.STELLAR_CONTRACT_ID || process.env.CHAINMOVE_CA || "",
    explorerBaseUrl: process.env.STELLAR_EXPLORER_BASE_URL || defaults.explorerBaseUrl,
    mock,
    demoPublicKey: process.env.NEXT_PUBLIC_STELLAR_DEMO_PUBLIC_KEY || process.env.STELLAR_DEMO_PUBLIC_KEY || FALLBACK_DEMO_PUBLIC_KEY,
  }
}

export function getStellarNetworkLabel(network: string) {
  const normalized = network.trim().toLowerCase()
  if (!normalized) return "Stellar"
  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

export function buildStellarReferenceUrl(reference: string, config = getStellarConfig()) {
  const normalizedReference = reference.trim()
  if (!normalizedReference) return null

  const baseUrl = config.explorerBaseUrl.replace(/\/$/, "")
  return `${baseUrl}/tx/${encodeURIComponent(normalizedReference)}`
}
