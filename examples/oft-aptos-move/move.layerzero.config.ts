import { ChainKey, EndpointId, endpointIdToChainKey } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { OAppEnforcedOption } from '@layerzerolabs/ua-devtools'

import { getDVNs } from './dvns'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

enum MsgType {
    SEND = 1,
    SEND_AND_CALL = 2,
}

const DEFAULT_BLOCK_CONFS: { [key: number]: bigint } = {
    [EndpointId.APTOS_V2_MAINNET]: BigInt(260),
    [EndpointId.ETHEREUM_V2_MAINNET]: BigInt(15),
    [EndpointId.MANTLE_V2_MAINNET]: BigInt(2),
    [EndpointId.MANTA_V2_MAINNET]: BigInt(5),
    [EndpointId.ARBITRUM_V2_MAINNET]: BigInt(20),
    [EndpointId.BSC_V2_MAINNET]: BigInt(20),
    [EndpointId.OPTIMISM_V2_MAINNET]: BigInt(20),
    [EndpointId.METIS_V2_MAINNET]: BigInt(5),
    [EndpointId.KAVA_V2_MAINNET]: BigInt(2),
    [EndpointId.SCROLL_V2_MAINNET]: BigInt(20),
    [EndpointId.MODE_V2_MAINNET]: BigInt(5),
    [EndpointId.FRAXTAL_V2_MAINNET]: BigInt(5),
    [EndpointId.ZKCONSENSYS_V2_MAINNET]: BigInt(10),
    [EndpointId.BLAST_V2_MAINNET]: BigInt(5),
    [EndpointId.XLAYER_V2_MAINNET]: BigInt(225000),
    [EndpointId.BASE_V2_MAINNET]: BigInt(10),
    [EndpointId.ZKSYNC_V2_MAINNET]: BigInt(20),
    [EndpointId.ZIRCUIT_V2_MAINNET]: BigInt(5),
    [EndpointId.MORPH_V2_MAINNET]: BigInt(20),
    [EndpointId.SWELL_V2_MAINNET]: BigInt(20),
    [EndpointId.PLUME_V2_MAINNET]: BigInt(20),
    [EndpointId.BERA_V2_MAINNET]: BigInt(20),
}

const getDefaultBlockConfs = (eid: number) => {
    return DEFAULT_BLOCK_CONFS[eid] ?? BigInt(5)
}

const DEFAULT_SEND_LIB: { [key: number]: string } = {
    [EndpointId.ETHEREUM_V2_MAINNET]: '0xbB2Ea70C9E858123480642Cf96acbcCE1372dCe1',
    [EndpointId.MANTLE_V2_MAINNET]: '0xde19274c009A22921E3966a1Ec868cEba40A5DaC',
    [EndpointId.MANTA_V2_MAINNET]: '0xD1654C656455E40E2905E96b6B91088AC2B362a2',
    [EndpointId.ARBITRUM_V2_MAINNET]: '0x975bcD720be66659e3EB3C0e4F1866a3020E493A',
    [EndpointId.BSC_V2_MAINNET]: '0x9F8C645f2D0b2159767Bd6E0839DE4BE49e823DE',
    [EndpointId.OPTIMISM_V2_MAINNET]: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
    [EndpointId.METIS_V2_MAINNET]: '0x63e39ccB510926d05a0ae7817c8f1CC61C5BdD6c',
    [EndpointId.KAVA_V2_MAINNET]: '0x83Fb937054918cB7AccB15bd6cD9234dF9ebb357',
    [EndpointId.SCROLL_V2_MAINNET]: '0x9BbEb2B2184B9313Cf5ed4a4DDFEa2ef62a2a03B',
    [EndpointId.MODE_V2_MAINNET]: '0x2367325334447C5E1E0f1b3a6fB947b262F58312',
    [EndpointId.FRAXTAL_V2_MAINNET]: '0x377530cdA84DFb2673bF4d145DCF0C4D7fdcB5b6',
    [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x32042142DD551b4EbE17B6FEd53131dd4b4eEa06',
    [EndpointId.BLAST_V2_MAINNET]: '0xc1B621b18187F74c8F6D52a6F709Dd2780C09821',
    [EndpointId.XLAYER_V2_MAINNET]: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
    [EndpointId.BASE_V2_MAINNET]: '0xB5320B0B3a13cC860893E2Bd79FCd7e13484Dda2',
    [EndpointId.ZKSYNC_V2_MAINNET]: '0x07fD0e370B49919cA8dA0CE842B8177263c0E12c',
    [EndpointId.ZIRCUIT_V2_MAINNET]: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
    [EndpointId.MORPH_V2_MAINNET]: '0xC39161c743D0307EB9BCc9FEF03eeb9Dc4802de7',
    [EndpointId.SWELL_V2_MAINNET]: '0xc1B621b18187F74c8F6D52a6F709Dd2780C09821',
    // [EndpointId.PLUME_V2_MAINNET]: '',
    // [EndpointId.BERA_V2_MAINNET]: '',
}

const DEFAULT_RECEIVE_LIB: { [key: number]: string } = {
    [EndpointId.ETHEREUM_V2_MAINNET]: '0xc02Ab410f0734EFa3F14628780e6e695156024C2',
    [EndpointId.MANTLE_V2_MAINNET]: '0x8da6512De9379fBF4F09BF520Caf7a85435ed93e',
    [EndpointId.MANTA_V2_MAINNET]: '0xC1EC25A9e8a8DE5Aa346f635B33e5B74c4c081aF',
    [EndpointId.ARBITRUM_V2_MAINNET]: '0x7B9E184e07a6EE1aC23eAe0fe8D6Be2f663f05e6',
    [EndpointId.BSC_V2_MAINNET]: '0xB217266c3A98C8B2709Ee26836C98cf12f6cCEC1',
    [EndpointId.OPTIMISM_V2_MAINNET]: '0x3c4962Ff6258dcfCafD23a814237B7d6Eb712063',
    [EndpointId.METIS_V2_MAINNET]: '0x5539Eb17a84E1D59d37C222Eb2CC4C81b502D1Ac',
    [EndpointId.KAVA_V2_MAINNET]: '0xb7e97ad5661134185Fe608b2A31fe8cEf2147Ba9',
    [EndpointId.SCROLL_V2_MAINNET]: '0x8363302080e711E0CAb978C081b9e69308d49808',
    [EndpointId.MODE_V2_MAINNET]: '0xc1B621b18187F74c8F6D52a6F709Dd2780C09821',
    [EndpointId.FRAXTAL_V2_MAINNET]: '0x8bC1e36F015b9902B54b1387A4d733cebc2f5A4e',
    [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0xE22ED54177CE1148C557de74E4873619e6c6b205',
    [EndpointId.BLAST_V2_MAINNET]: '0x377530cdA84DFb2673bF4d145DCF0C4D7fdcB5b6',
    [EndpointId.XLAYER_V2_MAINNET]: '0x2367325334447C5E1E0f1b3a6fB947b262F58312',
    [EndpointId.BASE_V2_MAINNET]: '0xc70AB6f32772f59fBfc23889Caf4Ba3376C84bAf',
    [EndpointId.ZKSYNC_V2_MAINNET]: '0x04830f6deCF08Dec9eD6C3fCAD215245B78A59e1',
    [EndpointId.ZIRCUIT_V2_MAINNET]: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
    [EndpointId.MORPH_V2_MAINNET]: '0xe1844c5D63a9543023008D332Bd3d2e6f1FE1043',
    [EndpointId.SWELL_V2_MAINNET]: '0x377530cdA84DFb2673bF4d145DCF0C4D7fdcB5b6',
    // [EndpointId.PLUME_V2_MAINNET]: '',
    // [EndpointId.BERA_V2_MAINNET]: '',
}

const EXECUTORS: { [key: number]: string } = {
    [EndpointId.ETHEREUM_V2_MAINNET]: '0x173272739Bd7Aa6e4e214714048a9fE699453059',
    [EndpointId.MANTLE_V2_MAINNET]: '0x4Fc3f4A38Acd6E4cC0ccBc04B3Dd1CCAeFd7F3Cd',
    [EndpointId.MANTA_V2_MAINNET]: '0x8DD9197E51dC6082853aD71D35912C53339777A7',
    [EndpointId.ARBITRUM_V2_MAINNET]: '0x31CAe3B7fB82d847621859fb1585353c5720660D',
    [EndpointId.BSC_V2_MAINNET]: '0x3ebD570ed38B1b3b4BC886999fcF507e9D584859',
    [EndpointId.OPTIMISM_V2_MAINNET]: '0x2D2ea0697bdbede3F01553D2Ae4B8d0c486B666e',
    [EndpointId.METIS_V2_MAINNET]: '0xE6AB3B3E632f3C65c3cb4c250DcC42f5E915A1cf',
    [EndpointId.KAVA_V2_MAINNET]: '0x41ED8065dd9bC6c0caF21c39766eDCBA0F21851c',
    [EndpointId.SCROLL_V2_MAINNET]: '0x581b26F362AD383f7B51eF8A165Efa13DDe398a4',
    [EndpointId.MODE_V2_MAINNET]: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b',
    [EndpointId.FRAXTAL_V2_MAINNET]: '0x41Bdb4aa4A63a5b2Efc531858d3118392B1A1C3d',
    [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x0408804C5dcD9796F22558464E6fE5bDdF16A7c7',
    [EndpointId.BLAST_V2_MAINNET]: '0x4208D6E27538189bB48E603D6123A94b8Abe0A0b',
    [EndpointId.XLAYER_V2_MAINNET]: '0xcCE466a522984415bC91338c232d98869193D46e',
    [EndpointId.BASE_V2_MAINNET]: '0x2CCA08ae69E0C44b18a57Ab2A87644234dAebaE4',
    [EndpointId.ZKSYNC_V2_MAINNET]: '0x664e390e672A811c12091db8426cBb7d68D5D8A6',
    [EndpointId.ZIRCUIT_V2_MAINNET]: '0xcCE466a522984415bC91338c232d98869193D46e',
    [EndpointId.MORPH_V2_MAINNET]: '0xcCE466a522984415bC91338c232d98869193D46e',
    [EndpointId.SWELL_V2_MAINNET]: '0xa20DB4Ffe74A31D17fc24BD32a7DD7555441058e',
    // [EndpointId.PLUME_V2_MAINNET]: '',
    // [EndpointId.BERA_V2_MAINNET]: '',
}

const aptos: OmniPointHardhat = {
    eid: EndpointId.APTOS_V2_MAINNET,
    contractName: 'oft',
}

const contractName = 'USDeOFT'

const eth: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: contractName + 'Adapter',
}

const plume: OmniPointHardhat = {
    eid: EndpointId.PLUME_V2_MAINNET,
    contractName,
}

const manta: OmniPointHardhat = {
    eid: EndpointId.MANTA_V2_MAINNET,
    contractName,
}

const mantle: OmniPointHardhat = {
    eid: EndpointId.MANTLE_V2_MAINNET,
    contractName,
}

const arbitrum: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName,
}

const bsc: OmniPointHardhat = {
    eid: EndpointId.BSC_V2_MAINNET,
    contractName,
}

const optimism: OmniPointHardhat = {
    eid: EndpointId.OPTIMISM_V2_MAINNET,
    contractName,
}

const metis: OmniPointHardhat = {
    eid: EndpointId.METIS_V2_MAINNET,
    contractName,
}

const kava: OmniPointHardhat = {
    eid: EndpointId.KAVA_V2_MAINNET,
    contractName,
}

const scroll: OmniPointHardhat = {
    eid: EndpointId.SCROLL_V2_MAINNET,
    contractName,
}

const mode: OmniPointHardhat = {
    eid: EndpointId.MODE_V2_MAINNET,
    contractName,
}

const fraxtal: OmniPointHardhat = {
    eid: EndpointId.FRAXTAL_V2_MAINNET,
    contractName,
}

const zkconsensys: OmniPointHardhat = {
    eid: EndpointId.ZKCONSENSYS_V2_MAINNET,
    contractName,
}

const blast: OmniPointHardhat = {
    eid: EndpointId.BLAST_V2_MAINNET,
    contractName,
}

const xlayer: OmniPointHardhat = {
    eid: EndpointId.XLAYER_V2_MAINNET,
    contractName,
}

const base: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName,
}

const zksync: OmniPointHardhat = {
    eid: EndpointId.ZKSYNC_V2_MAINNET,
    contractName,
}

const zircuit: OmniPointHardhat = {
    eid: EndpointId.ZIRCUIT_V2_MAINNET,
    contractName,
}

const morph: OmniPointHardhat = {
    eid: EndpointId.MORPH_V2_MAINNET,
    contractName,
}

const swell: OmniPointHardhat = {
    eid: EndpointId.SWELL_V2_MAINNET,
    contractName,
}

const berachain: OmniPointHardhat = {
    eid: EndpointId.BERA_V2_MAINNET,
    contractName,
}

// 20
const contracts = [
    aptos,
    eth,
    // plume,
    manta,
    mantle,
    arbitrum,
    bsc,
    optimism,
    metis,
    kava,
    scroll,
    mode,
    fraxtal,
    zkconsensys,
    blast,
    xlayer, // non-public
    base,
    zksync,
    zircuit,
    morph,
    swell,
    // berachain,
]

export const getDefaultEnforcedOptions = (toAptos = false): OAppEnforcedOption[] => {
    return toAptos
        ? [
              //send
              {
                  msgType: 1,
                  optionType: ExecutorOptionType.LZ_RECEIVE,
                  gas: 5000,
              },
              // sendCompose
              {
                  msgType: 2,
                  optionType: ExecutorOptionType.LZ_RECEIVE,
                  gas: 8000,
              },
          ]
        : [
              //send
              {
                  msgType: 1,
                  optionType: ExecutorOptionType.LZ_RECEIVE,
                  gas: 80000,
              },
              // sendCompose
              {
                  msgType: 2,
                  optionType: ExecutorOptionType.LZ_RECEIVE,
                  gas: 140000,
              },
          ]
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: aptos,
            config: {
                delegate: '0x4b3599ba4f125759a174d6bc0510f1897bd3f297378c63c8331046d60b1c9f1c',
                owner: '0x4b3599ba4f125759a174d6bc0510f1897bd3f297378c63c8331046d60b1c9f1c',
            },
        },
        ...contracts
            .filter((contract) => contract.eid != EndpointId.APTOS_V2_MAINNET)
            .map((contract) => {
                return {
                    contract,
                }
            }),
    ],
    connections: [
        ...contracts
            .filter((contract) => contract.eid != EndpointId.APTOS_V2_MAINNET)
            .map((contract) => {
                return {
                    from: aptos,
                    to: contract,
                    config: {
                        sendLibrary: '0xc33752e0220faf79e45385dd73fb28d681dcd9f1569a1480725507c1f3c3aba9',
                        receiveLibraryConfig: {
                            receiveLibrary: '0xc33752e0220faf79e45385dd73fb28d681dcd9f1569a1480725507c1f3c3aba9',
                            gracePeriod: BigInt(0),
                        },
                        sendConfig: {
                            executorConfig: {
                                executor: '0x15a5bbf1eb7998a22c9f23810d424abe40bd59ddd8e6ab7e59529853ebed41c4',
                                maxMessageSize: 10000,
                            },
                            ulnConfig: {
                                confirmations: getDefaultBlockConfs(EndpointId.APTOS_V2_MAINNET),
                                requiredDVNs: getDVNs(EndpointId.APTOS_V2_MAINNET, contract.eid),
                                optionalDVNThreshold: 0,
                            },
                        },
                        receiveConfig: {
                            ulnConfig: {
                                confirmations: getDefaultBlockConfs(contract.eid),
                                requiredDVNs: getDVNs(EndpointId.APTOS_V2_MAINNET, contract.eid),
                                optionalDVNThreshold: 0,
                            },
                        },
                        enforcedOptions: getDefaultEnforcedOptions(false),
                    },
                }
            }),
        ...contracts
            .filter((contract) => contract.eid != EndpointId.APTOS_V2_MAINNET)
            .map((contract) => {
                return {
                    from: contract,
                    to: aptos,
                    config: {
                        sendLibrary: DEFAULT_SEND_LIB[contract.eid],
                        receiveLibraryConfig: {
                            receiveLibrary: DEFAULT_RECEIVE_LIB[contract.eid],
                            gracePeriod: BigInt(0),
                        },
                        sendConfig: {
                            executorConfig: {
                                executor: EXECUTORS[contract.eid],
                                maxMessageSize: 10000,
                            },
                            ulnConfig: {
                                confirmations: DEFAULT_BLOCK_CONFS[contract.eid]!,
                                requiredDVNs: getDVNs(contract.eid, EndpointId.APTOS_V2_MAINNET),
                                optionalDVNThreshold: 0,
                            },
                        },
                        receiveConfig: {
                            ulnConfig: {
                                confirmations: DEFAULT_BLOCK_CONFS[EndpointId.APTOS_V2_MAINNET],
                                requiredDVNs: getDVNs(contract.eid, EndpointId.APTOS_V2_MAINNET),
                                optionalDVNThreshold: 0,
                            },
                        },
                        enforcedOptions: getDefaultEnforcedOptions(true),
                    },
                }
            }),
    ],
}

export default config

// sanity tests
const main = async () => {
    // values extracted in offchain-monorepo and compared against ones entered above
    const expected_senduln302: { [key: number]: string } = {
        [EndpointId.ETHEREUM_V2_MAINNET]: '0xbb2ea70c9e858123480642cf96acbcce1372dce1',
        [EndpointId.MANTLE_V2_MAINNET]: '0xde19274c009a22921e3966a1ec868ceba40a5dac',
        [EndpointId.MANTA_V2_MAINNET]: '0xd1654c656455e40e2905e96b6b91088ac2b362a2',
        [EndpointId.ARBITRUM_V2_MAINNET]: '0x975bcd720be66659e3eb3c0e4f1866a3020e493a',
        [EndpointId.BSC_V2_MAINNET]: '0x9f8c645f2d0b2159767bd6e0839de4be49e823de',
        [EndpointId.OPTIMISM_V2_MAINNET]: '0x1322871e4ab09bc7f5717189434f97bbd9546e95',
        [EndpointId.METIS_V2_MAINNET]: '0x63e39ccb510926d05a0ae7817c8f1cc61c5bdd6c',
        [EndpointId.KAVA_V2_MAINNET]: '0x83fb937054918cb7accb15bd6cd9234df9ebb357',
        [EndpointId.SCROLL_V2_MAINNET]: '0x9bbeb2b2184b9313cf5ed4a4ddfea2ef62a2a03b',
        [EndpointId.MODE_V2_MAINNET]: '0x2367325334447c5e1e0f1b3a6fb947b262f58312',
        [EndpointId.FRAXTAL_V2_MAINNET]: '0x377530cda84dfb2673bf4d145dcf0c4d7fdcb5b6',
        [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x32042142dd551b4ebe17b6fed53131dd4b4eea06',
        [EndpointId.BLAST_V2_MAINNET]: '0xc1b621b18187f74c8f6d52a6f709dd2780c09821',
        [EndpointId.XLAYER_V2_MAINNET]: '0xe1844c5d63a9543023008d332bd3d2e6f1fe1043',
        [EndpointId.BASE_V2_MAINNET]: '0xb5320b0b3a13cc860893e2bd79fcd7e13484dda2',
        [EndpointId.ZKSYNC_V2_MAINNET]: '0x07fd0e370b49919ca8da0ce842b8177263c0e12c',
        [EndpointId.ZIRCUIT_V2_MAINNET]: '0xc39161c743d0307eb9bcc9fef03eeb9dc4802de7',
        [EndpointId.MORPH_V2_MAINNET]: '0xc39161c743d0307eb9bcc9fef03eeb9dc4802de7',
        [EndpointId.SWELL_V2_MAINNET]: '0xc1b621b18187f74c8f6d52a6f709dd2780c09821',
    }

    const expected_receiveuln302: { [key: number]: string } = {
        [EndpointId.ETHEREUM_V2_MAINNET]: '0xc02ab410f0734efa3f14628780e6e695156024c2',
        [EndpointId.MANTLE_V2_MAINNET]: '0x8da6512de9379fbf4f09bf520caf7a85435ed93e',
        [EndpointId.MANTA_V2_MAINNET]: '0xc1ec25a9e8a8de5aa346f635b33e5b74c4c081af',
        [EndpointId.ARBITRUM_V2_MAINNET]: '0x7b9e184e07a6ee1ac23eae0fe8d6be2f663f05e6',
        [EndpointId.BSC_V2_MAINNET]: '0xb217266c3a98c8b2709ee26836c98cf12f6ccec1',
        [EndpointId.OPTIMISM_V2_MAINNET]: '0x3c4962ff6258dcfcafd23a814237b7d6eb712063',
        [EndpointId.METIS_V2_MAINNET]: '0x5539eb17a84e1d59d37c222eb2cc4c81b502d1ac',
        [EndpointId.KAVA_V2_MAINNET]: '0xb7e97ad5661134185fe608b2a31fe8cef2147ba9',
        [EndpointId.SCROLL_V2_MAINNET]: '0x8363302080e711e0cab978c081b9e69308d49808',
        [EndpointId.MODE_V2_MAINNET]: '0xc1b621b18187f74c8f6d52a6f709dd2780c09821',
        [EndpointId.FRAXTAL_V2_MAINNET]: '0x8bc1e36f015b9902b54b1387a4d733cebc2f5a4e',
        [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0xe22ed54177ce1148c557de74e4873619e6c6b205',
        [EndpointId.BLAST_V2_MAINNET]: '0x377530cda84dfb2673bf4d145dcf0c4d7fdcb5b6',
        [EndpointId.XLAYER_V2_MAINNET]: '0x2367325334447c5e1e0f1b3a6fb947b262f58312',
        [EndpointId.BASE_V2_MAINNET]: '0xc70ab6f32772f59fbfc23889caf4ba3376c84baf',
        [EndpointId.ZKSYNC_V2_MAINNET]: '0x04830f6decf08dec9ed6c3fcad215245b78a59e1',
        [EndpointId.ZIRCUIT_V2_MAINNET]: '0xe1844c5d63a9543023008d332bd3d2e6f1fe1043',
        [EndpointId.MORPH_V2_MAINNET]: '0xe1844c5d63a9543023008d332bd3d2e6f1fe1043',
        [EndpointId.SWELL_V2_MAINNET]: '0x377530cda84dfb2673bf4d145dcf0c4d7fdcb5b6',
    }

    const expected_executors: { [key: number]: string } = {
        [EndpointId.ETHEREUM_V2_MAINNET]: '0x173272739bd7aa6e4e214714048a9fe699453059',
        [EndpointId.MANTLE_V2_MAINNET]: '0x4fc3f4a38acd6e4cc0ccbc04b3dd1ccaefd7f3cd',
        [EndpointId.MANTA_V2_MAINNET]: '0x8dd9197e51dc6082853ad71d35912c53339777a7',
        [EndpointId.ARBITRUM_V2_MAINNET]: '0x31cae3b7fb82d847621859fb1585353c5720660d',
        [EndpointId.BSC_V2_MAINNET]: '0x3ebd570ed38b1b3b4bc886999fcf507e9d584859',
        [EndpointId.OPTIMISM_V2_MAINNET]: '0x2d2ea0697bdbede3f01553d2ae4b8d0c486b666e',
        [EndpointId.METIS_V2_MAINNET]: '0xe6ab3b3e632f3c65c3cb4c250dcc42f5e915a1cf',
        [EndpointId.KAVA_V2_MAINNET]: '0x41ed8065dd9bc6c0caf21c39766edcba0f21851c',
        [EndpointId.SCROLL_V2_MAINNET]: '0x581b26f362ad383f7b51ef8a165efa13dde398a4',
        [EndpointId.MODE_V2_MAINNET]: '0x4208d6e27538189bb48e603d6123a94b8abe0a0b',
        [EndpointId.FRAXTAL_V2_MAINNET]: '0x41bdb4aa4a63a5b2efc531858d3118392b1a1c3d',
        [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x0408804c5dcd9796f22558464e6fe5bddf16a7c7',
        [EndpointId.BLAST_V2_MAINNET]: '0x4208d6e27538189bb48e603d6123a94b8abe0a0b',
        [EndpointId.XLAYER_V2_MAINNET]: '0xcce466a522984415bc91338c232d98869193d46e',
        [EndpointId.BASE_V2_MAINNET]: '0x2cca08ae69e0c44b18a57ab2a87644234daebae4',
        [EndpointId.ZKSYNC_V2_MAINNET]: '0x664e390e672a811c12091db8426cbb7d68d5d8a6',
        [EndpointId.ZIRCUIT_V2_MAINNET]: '0xcce466a522984415bc91338c232d98869193d46e',
        [EndpointId.MORPH_V2_MAINNET]: '0xcce466a522984415bc91338c232d98869193d46e',
        [EndpointId.SWELL_V2_MAINNET]: '0xa20db4ffe74a31d17fc24bd32a7dd7555441058e',
    }

    Object.keys(expected_senduln302).forEach((key) => {
        const expected = expected_senduln302[parseInt(key)]
        const actual = DEFAULT_SEND_LIB[parseInt(key)]
        if (expected !== actual?.toLowerCase()) {
            throw new Error(`Expected ${expected} but got ${actual}`)
        }
    })

    Object.keys(expected_receiveuln302).forEach((key) => {
        const expected = expected_receiveuln302[parseInt(key)]
        const actual = DEFAULT_RECEIVE_LIB[parseInt(key)]
        if (expected !== actual?.toLowerCase()) {
            throw new Error(`${key}: Expected ${expected} but got ${actual}`)
        }
    })

    Object.keys(expected_executors).forEach((key) => {
        const expected = expected_executors[parseInt(key)]
        const actual = EXECUTORS[parseInt(key)]
        if (expected !== actual?.toLowerCase()) {
            throw new Error(`Expected ${expected} but got ${actual}`)
        }
    })

    // from monorepo, sanity check the defaults.  they are not exported so had to manually copy in.  fix that later.
    const defaultBlockConfirmations: { [key: string]: number } = {
        default: 5,
        [ChainKey.ETHEREUM]: 15,
        [ChainKey.BSC]: 20,
        [ChainKey.AVALANCHE]: 12,
        [ChainKey.POLYGON]: 512,
        [ChainKey.ARBITRUM]: 20,
        [ChainKey.OPTIMISM]: 20,
        [ChainKey.SWIMMER]: 20,
        [ChainKey.DFK]: 10,
        [ChainKey.MOONBEAM]: 10,
        [ChainKey.APTOS]: 260,
        [ChainKey.DEXALOT]: 10,
        [ChainKey.COREDAO]: 21,
        [ChainKey.OKX]: 2,
        [ChainKey.GOERLI]: 10,
        [ChainKey.DOS]: 2,
        [ChainKey.SEPOLIA]: 10,
        [ChainKey.ZKSYNC]: 20,
        [ChainKey.ZKEVM]: 225000,
        [ChainKey.MOONRIVER]: 10,
        [ChainKey.METER]: 2,
        [ChainKey.NOVA]: 20,
        [ChainKey.TENET]: 2,
        [ChainKey.CANTO]: 2,
        [ChainKey.KAVA]: 2,
        [ChainKey.MANTLE]: 2,
        [ChainKey.HUBBLE]: 2,
        [ChainKey.LINEA]: 10,
        [ChainKey.BASE]: 10,
        [ChainKey.SHIMMER]: 21,
        [ChainKey.ASTAR]: 32,
        [ChainKey.ZKATANA]: 225000,
        [ChainKey.MERLIN]: 1000000,
        [ChainKey.XLAYER]: 225000,
        [ChainKey.SOLANA]: 32,
        [ChainKey.FLARE]: 20,
        [ChainKey.ZKLINK]: 300,
        [ChainKey.CODEX]: 20,
        [ChainKey.LYRA]: 20,
        [ChainKey.APE]: 20,
        [ChainKey.REYA]: 20,
        [ChainKey.SCROLL]: 20,
        [ChainKey.BITLAYER]: 20,
        [ChainKey.DM2VERSE]: 20,
        [ChainKey.HEDERA]: 20,
        [ChainKey.EBI]: 50,
        [ChainKey.WORLDCHAIN]: 20,
        [ChainKey.UNICHAIN]: 20,
        [ChainKey.LISK]: 20,
        [ChainKey.MORPH]: 20,
        [ChainKey.ABSTRACT]: 20,
        [ChainKey.SUPERPOSITION]: 20,
        [ChainKey.EDU]: 20,
        [ChainKey.HEMI]: 20,
        [ChainKey.ISLANDER]: 20,
        [ChainKey.SONIC]: 20,
        [ChainKey.SOPHON]: 20,
        [ChainKey.SWELL]: 20,
        [ChainKey.ROOTSTOCK]: 20,
        [ChainKey.FLOW]: 20,
        [ChainKey.BL4]: 20,
        [ChainKey.BL5]: 20,
        [ChainKey.INK]: 20,
        [ChainKey.SONEIUM]: 20,
        [ChainKey.SPACE]: 2,
        [ChainKey.GLUE]: 20,
        [ChainKey.CRONOSEVM]: 2,
        [ChainKey.CRONOSZKEVM]: 2,
        [ChainKey.GOAT]: 4,
        [ChainKey.BERA]: 20,
        [ChainKey.BAHAMUT]: 15,
        [ChainKey.STORY]: 5,
        [ChainKey.XDC]: 20,
        [ChainKey.TON]: 0,
        [ChainKey.PLUME]: 20,
    }
    Object.keys(DEFAULT_BLOCK_CONFS).map((key) => {
        const chainKey = endpointIdToChainKey(parseInt(key))
        const expected = defaultBlockConfirmations[chainKey] || BigInt(5)
        const actual = DEFAULT_BLOCK_CONFS[parseInt(key)]
        if (expected != actual) {
            throw new Error(`${key}: Expected ${expected} but got ${actual}`)
        }
    })

    // contracts
    //     .filter((contract) => contract.eid != EndpointId.APTOS_V2_MAINNET)
    //     .map((contract) => {
    //         console.log(
    //             `pnpm run lz:sdk:move:set-rate-limit --oapp-config move.layerzero.config.ts --rate-limit 10000000000000 --window-seconds 3600 --to-eid ${contract.eid}`
    //         )
    //     })
}

main()
