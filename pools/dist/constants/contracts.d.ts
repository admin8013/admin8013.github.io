import { ChainId } from '@pancakeswap/chains';
import { Address } from 'viem';
import { SupportedChainId } from './supportedChains';
export type ContractAddresses<T extends ChainId = SupportedChainId> = {
    [chainId in T]: Address;
};
export declare const ICAKE: {
    readonly 56: "0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1";
    readonly 97: "0x";
    readonly 1: "0x";
    readonly 42161: "0x";
    readonly 421613: "0x";
    readonly 324: "0x";
    readonly 280: "0x";
    readonly 84531: "0x";
    readonly 59140: "0x";
    readonly 1442: "0x";
};
export declare const CAKE_VAULT: {
    readonly 56: "0x45c54210128a065de780C4B0Df3d16664f7f859e";
    readonly 97: "0x1088Fb24053F03802F673b84d16AE1A7023E400b";
    readonly 1: "0x";
    readonly 42161: "0x";
    readonly 421613: "0x";
    readonly 324: "0x";
    readonly 280: "0x";
    readonly 84531: "0x";
    readonly 59140: "0x";
    readonly 1442: "0x";
};
export declare const CAKE_FLEXIBLE_SIDE_VAULT: {
    readonly 56: "0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0";
    readonly 97: "0x";
    readonly 1: "0x";
    readonly 42161: "0x";
    readonly 421613: "0x";
    readonly 324: "0x";
    readonly 280: "0x";
    readonly 84531: "0x";
    readonly 59140: "0x";
    readonly 1442: "0x";
};
//# sourceMappingURL=contracts.d.ts.map