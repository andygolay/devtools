// Get the environment configuration from .env file

// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.EVM_PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        // adapter
        ethereum: {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM || 'https://eth.llamarpc.com',
            accounts,
        },

        arbitrum: {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM || 'https://arb1.arbitrum.io/rpc',
            accounts,
        },
        base: {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE || 'https://base.llamarpc.com',
            accounts,
        },
        berachain: {
            eid: EndpointId.BERA_V2_MAINNET,
            url: process.env.RPC_URL_BERA || 'TODO',
            accounts,
        },
        blast: {
            eid: EndpointId.BLAST_V2_MAINNET,
            url: process.env.RPC_URL_BLAST || 'https://rpc.ankr.com/blast',
            accounts,
        },
        bsc: {
            eid: EndpointId.BSC_V2_MAINNET,
            url: process.env.RPC_URL_BSC || 'https://bscrpc.com',
            accounts,
        },
        fraxtal: {
            eid: EndpointId.FRAXTAL_V2_MAINNET,
            url: process.env.RPC_URL_FRAXTAL || 'https://rpc.staging.mainnet.frax.com/layer-zero',
            accounts,
        },
        kava: {
            eid: EndpointId.KAVA_V2_MAINNET,
            url: process.env.RPC_URL_KAVA || 'https://evm.kava-rpc.com',
            accounts,
        },
        manta: {
            eid: EndpointId.MANTA_V2_MAINNET,
            url: process.env.RPC_URL_MANTA || 'https://manta.nirvanalabs.xyz/mantapublic',
            accounts,
        },
        mantle: {
            eid: EndpointId.MANTLE_V2_MAINNET,
            url: process.env.RPC_URL_MANTLE || 'https://mantle.drpc.org',
            accounts,
        },
        metis: {
            eid: EndpointId.METIS_V2_MAINNET,
            url: process.env.RPC_URL_METIS || 'https://metis.drpc.org',
            accounts,
        },
        mode: {
            eid: EndpointId.MODE_V2_MAINNET,
            url: process.env.RPC_URL_MODE || 'https://mainnet.mode.network/',
            accounts,
        },
        morph: {
            eid: EndpointId.MORPH_V2_MAINNET,
            url: process.env.RPC_URL_MORPH || 'https://rpc.morph.network',
            accounts,
        },
        optimism: {
            eid: EndpointId.OPTIMISM_V2_MAINNET,
            url: process.env.RPC_URL_OPTIMISM || 'https://mainnet.optimism.io',
            accounts,
        },
        plume: {
            eid: EndpointId.PLUME_V2_MAINNET,
            url: process.env.RPC_URL_PLUME || 'https://plume.drpc.org',
            accounts,
        },
        scroll: {
            eid: EndpointId.SCROLL_V2_MAINNET,
            url: process.env.RPC_URL_SCROLL || 'https://scroll.drpc.org',
            accounts,
        },
        swell: {
            eid: EndpointId.SWELL_V2_MAINNET,
            url: process.env.RPC_URL_SWELL || 'https://swell.drpc.org',
            accounts,
        },
        xlayer: {
            eid: EndpointId.XLAYER_V2_MAINNET,
            url: process.env.RPC_URL_XLAYER || 'https://rpc.xlayer.tech',
            accounts,
        },
        zircuit: {
            eid: EndpointId.ZIRCUIT_V2_MAINNET,
            url: process.env.RPC_URL_ZIRCUIT || 'https://zircuit.drpc.org',
            accounts,
        },
        zkconsensys: {
            eid: EndpointId.ZKCONSENSYS_V2_MAINNET,
            url: process.env.RPC_URL_ZKCONSENSYS || 'https://zkconsensys.drpc.org',
            accounts,
        },
        zksync: {
            eid: EndpointId.ZKSYNC_V2_MAINNET,
            url: process.env.RPC_URL_ZKSYNC || 'https://mainnet.zksync.io',
            accounts,
        },
        'aptos-mainnet': {
            eid: EndpointId.APTOS_V2_MAINNET,
            url: process.env.RPC_URL_APTOS_MAINNET || 'https://fullnode.mainnet.aptoslabs.com/',
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
