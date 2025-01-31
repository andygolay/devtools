import { EndpointId } from '@layerzerolabs/lz-definitions'

type Networks = Record<string, string>

interface DVNS {
    LZ_LABS: Networks
    HORIZEN: Networks
}

// modified from original repo
const DVNS: DVNS = {
    LZ_LABS: {
        [EndpointId.APTOS_V2_MAINNET]: '0xdf8f0a53b20f1656f998504b81259698d126523a31bdbbae45ba1e8a3078d8da',
        [EndpointId.ETHEREUM_V2_MAINNET]: '0x589dEDbD617e0CBcB916A9223F4d1300c294236b',
        [EndpointId.MANTLE_V2_MAINNET]: '0x28B6140ead70cb2Fb669705b3598ffB4BEaA060b',
        [EndpointId.MANTA_V2_MAINNET]: '0xA09dB5142654e3eB5Cf547D66833FAe7097B21C3',
        [EndpointId.ARBITRUM_V2_MAINNET]: '0x2f55C492897526677C5B68fb199ea31E2c126416',
        [EndpointId.BSC_V2_MAINNET]: '0xfD6865c841c2d64565562fCc7e05e619A30615f0',
        [EndpointId.OPTIMISM_V2_MAINNET]: '0x6A02D83e8d433304bba74EF1c427913958187142',
        [EndpointId.METIS_V2_MAINNET]: '0x32d4F92437454829b3Fe7BEBfeCE5D0523DEb475',
        [EndpointId.KAVA_V2_MAINNET]: '0x2D40A7B66F776345Cf763c8EBB83199Cd285e7a3',
        [EndpointId.SCROLL_V2_MAINNET]: '0xbe0d08a85EeBFCC6eDA0A843521f7CBB1180D2e2',
        [EndpointId.MODE_V2_MAINNET]: '0xce8358bc28dd8296Ce8cAF1CD2b44787abd65887',
        [EndpointId.FRAXTAL_V2_MAINNET]: '0xcCE466a522984415bC91338c232d98869193D46e',
        [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x129Ee430Cb2Ff2708CCADDBDb408a88Fe4FFd480',
        [EndpointId.BLAST_V2_MAINNET]: '0xc097ab8cd7b053326dfe9fb3e3a31a0cce3b526f',
        [EndpointId.XLAYER_V2_MAINNET]: '0x9C061c9A4782294eeF65ef28Cb88233A987F4bdD',
        [EndpointId.BASE_V2_MAINNET]: '0x9e059a54699a285714207b43B055483E78FAac25',
        [EndpointId.ZKSYNC_V2_MAINNET]: '0x620A9DF73D2F1015eA75aea1067227F9013f5C51',
        [EndpointId.ZIRCUIT_V2_MAINNET]: '0x6788f52439aca6bff597d3eec2dc9a44b8fee842',
        [EndpointId.MORPH_V2_MAINNET]: '0x6788f52439aca6bff597d3eec2dc9a44b8fee842',
        [EndpointId.SWELL_V2_MAINNET]: '0x6788f52439aca6bff597d3eec2dc9a44b8fee842',
        [EndpointId.PLUME_V2_MAINNET]: '0x6788f52439aca6bff597d3eec2dc9a44b8fee842',
        [EndpointId.BERA_V2_MAINNET]: '0x282b3386571f7f794450d5789911a9804fa346b4',
    },
    HORIZEN: {
        [EndpointId.APTOS_V2_MAINNET]: '0x93adea241d46ddebc207d74402ff9a150f70b9de828b8b2208d69b7d08e90bd7',
        [EndpointId.ETHEREUM_V2_MAINNET]: '0x380275805876Ff19055EA900CDb2B46a94ecF20D',
        [EndpointId.MANTLE_V2_MAINNET]: '0x7fe673201724925B5c477d4E1A4Bd3E954688cF5',
        [EndpointId.MANTA_V2_MAINNET]: '0x31F748a368a893Bdb5aBB67ec95F232507601A73',
        [EndpointId.ARBITRUM_V2_MAINNET]: '0x19670Df5E16bEa2ba9b9e68b48C054C5bAEa06B8',
        [EndpointId.BSC_V2_MAINNET]: '0x247624e2143504730aeC22912ed41F092498bEf2',
        [EndpointId.OPTIMISM_V2_MAINNET]: '0x9E930731cb4A6bf7eCc11F695A295c60bDd212eB',
        [EndpointId.METIS_V2_MAINNET]: '0x7fe673201724925B5c477d4E1A4Bd3E954688cF5',
        [EndpointId.KAVA_V2_MAINNET]: '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
        [EndpointId.SCROLL_V2_MAINNET]: '0x7fe673201724925B5c477d4E1A4Bd3E954688cF5',
        [EndpointId.MODE_V2_MAINNET]: '0xaCDe1f22EEAb249d3ca6Ba8805C8fEe9f52a16e7',
        [EndpointId.FRAXTAL_V2_MAINNET]: '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
        [EndpointId.ZKCONSENSYS_V2_MAINNET]: '0x7fe673201724925B5c477d4E1A4Bd3E954688cF5',
        [EndpointId.BLAST_V2_MAINNET]: '0x70BF42C69173d6e33b834f59630DAC592C70b369',
        [EndpointId.XLAYER_V2_MAINNET]: '0xDd7B5E1dB4AaFd5C8EC3b764eFB8ed265Aa5445B',
        [EndpointId.BASE_V2_MAINNET]: '0xa7b5189bcA84Cd304D8553977c7C614329750d99',
        [EndpointId.ZKSYNC_V2_MAINNET]: '0x1253E268Bc04bB43CB96D2F7Ee858b8A1433Cf6D',
        [EndpointId.ZIRCUIT_V2_MAINNET]: '0xdcdd4628f858b45260c31d6ad076bd2c3d3c2f73',
        [EndpointId.MORPH_V2_MAINNET]: '0x6c5f923b63fdd52fb9c45daefa8695fa6b55a935',
        [EndpointId.SWELL_V2_MAINNET]: '0xf4672690ef45b46eaa3b688fe2f0fc09e9366b20',
        [EndpointId.PLUME_V2_MAINNET]: '0xd841a741addcb6dea735d3b8c9faf96ba3f3d30d',
    },
}

const getLayerZeroLabsDVN = (from: EndpointId): string => {
    const dvn = DVNS.LZ_LABS[from]
    if (!dvn) {
        throw new Error(`No LayerZeroLabs DVN found for ${from}`)
    }
    return dvn
}

const getHorizenDVN = (from: EndpointId): string => {
    const dvn = DVNS.HORIZEN[from]
    if (!dvn) {
        throw new Error(`No Horizen DVN found for ${from}`)
    }
    return dvn
}

// Unused until Bera is re-introduced
const NETHERMIND_DVNS: { [key: number]: string } = {
    [EndpointId.APTOS_V2_MAINNET]: '0x7aae9c9a36878bdd16fc77dedd1bdc9a1711ad0513f8ea26b0fd4fcd4e3abcac',
    [EndpointId.BERA_V2_MAINNET]: '0xdd7b5e1db4aafd5c8ec3b764efb8ed265aa5445b',
}

const getNethermindDVN = (from: EndpointId): string => {
    const dvn = NETHERMIND_DVNS[from]
    if (!dvn) {
        throw new Error(`No nethermind DVN for ${from}`)
    }
    return dvn
}

export const getDVNs = (from: EndpointId, to: EndpointId): string[] => {
    // Horizen doesn't support bera yet
    const involvesBera = from == EndpointId.BERA_V2_MAINNET || to == EndpointId.BERA_V2_MAINNET
    if (involvesBera) {
        throw new Error('bera isnt supported yet')
    }
    if (involvesBera) {
        return [getLayerZeroLabsDVN(from), getHorizenDVN(from)]
    }
    return [getLayerZeroLabsDVN(from), getHorizenDVN(from)]
}

// console.log(getDVNs(EndpointId.APTOS_V2_MAINNET, EndpointId.BERA_V2_MAINNET))
