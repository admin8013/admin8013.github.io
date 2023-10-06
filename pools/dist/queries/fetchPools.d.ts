import BigNumber from 'bignumber.js';
import { ChainId } from '@pancakeswap/chains';
import { OnChainProvider } from '../types';
export declare const fetchPoolsTimeLimits: (chainId: ChainId, provider: OnChainProvider) => Promise<{
    sousId: number;
    startTimestamp: number;
    endTimestamp: number;
}[] | null>;
export declare const fetchPoolsTotalStaking: (chainId: ChainId, provider: OnChainProvider) => Promise<{
    sousId: number;
    totalStaked: string;
}[] | null>;
interface FetchingPoolsStakingLimitsParams {
    poolsWithStakingLimit: number[];
    chainId: ChainId;
    provider: OnChainProvider;
}
export declare const fetchPoolsStakingLimitsByBlock: ({ poolsWithStakingLimit, chainId, provider, }: FetchingPoolsStakingLimitsParams) => Promise<{
    [key: string]: {
        stakingLimit: BigNumber;
        numberSecondsForUserLimit: number;
    };
}>;
export declare const fetchPoolsStakingLimits: (params: FetchingPoolsStakingLimitsParams) => Promise<{
    [key: string]: {
        stakingLimit: BigNumber;
        numberSecondsForUserLimit: number;
    };
}>;
export declare const fetchPoolsProfileRequirement: (chainId: ChainId, provider: OnChainProvider) => Promise<{
    [key: string]: {
        required: boolean;
        thresholdPoints: string;
    };
}>;
export {};
//# sourceMappingURL=fetchPools.d.ts.map