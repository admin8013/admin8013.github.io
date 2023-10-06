import { ChainId } from '@pancakeswap/chains';
import { Address } from 'viem';
import { OnChainProvider, SerializedLockedVaultUser, SerializedVaultUser } from '../types';
interface Params {
    account: Address;
    chainId: ChainId;
    provider: OnChainProvider;
}
export declare const fetchVaultUser: ({ account, chainId, provider }: Params) => Promise<SerializedLockedVaultUser>;
export declare const fetchFlexibleSideVaultUser: ({ account, chainId, provider, }: Params) => Promise<SerializedVaultUser>;
export {};
//# sourceMappingURL=fetchVaultUser.d.ts.map