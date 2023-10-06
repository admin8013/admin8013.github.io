/// <reference types="lodash" />
import { ChainId } from '@pancakeswap/chains';
import { OnChainProvider } from '../types';
interface FetchUserDataParams {
    account: string;
    chainId: ChainId;
    provider: OnChainProvider;
}
export declare const fetchPoolsAllowance: ({ account, chainId, provider }: FetchUserDataParams) => Promise<import("lodash").Dictionary<string>>;
export declare const fetchUserBalances: ({ account, chainId, provider }: FetchUserDataParams) => Promise<{
    [x: string]: string;
}>;
export declare const fetchUserStakeBalances: ({ account, chainId, provider }: FetchUserDataParams) => Promise<import("lodash").Dictionary<string>>;
export declare const fetchUserPendingRewards: ({ account, chainId, provider }: FetchUserDataParams) => Promise<import("lodash").Dictionary<string>>;
export {};
//# sourceMappingURL=fetchUserPoolsData.d.ts.map