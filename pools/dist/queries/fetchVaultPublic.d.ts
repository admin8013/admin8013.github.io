import { ChainId } from '@pancakeswap/chains';
import { Address } from 'viem';
import { OnChainProvider } from '../types';
interface Params {
    cakeVaultAddress?: Address;
    chainId: ChainId;
    provider: OnChainProvider;
}
export declare const fetchPublicVaultData: ({ chainId, cakeVaultAddress, provider, }: Params) => Promise<{
    totalShares: string;
    totalLockedAmount: string;
    pricePerFullShare: string;
    totalCakeInVault: string;
} | {
    totalShares: null;
    totalLockedAmount: null;
    pricePerFullShare: null;
    totalCakeInVault: null;
}>;
export declare const fetchPublicFlexibleSideVaultData: ({ chainId, cakeVaultAddress, provider, }: Params) => Promise<{
    totalShares: string;
    pricePerFullShare: string;
    totalCakeInVault: string;
} | {
    totalShares: null;
    pricePerFullShare: null;
    totalCakeInVault: null;
}>;
export declare const fetchVaultFees: ({ chainId, cakeVaultAddress, provider, }: Params) => Promise<{
    performanceFee: number;
    withdrawalFee: number;
    withdrawalFeePeriod: number;
} | {
    performanceFee: null;
    withdrawalFee: null;
    withdrawalFeePeriod: null;
}>;
export {};
//# sourceMappingURL=fetchVaultPublic.d.ts.map