import { ChainId } from '@pancakeswap/chains';
import { Address, WalletClient, GetContractReturnType, PublicClient } from 'viem';
import { iCakeABI } from '../abis/ICake';
import { OnChainProvider } from '../types';
export declare const getIfoCreditAddressContract: (chainId: ChainId, provider: OnChainProvider, walletClient?: WalletClient) => GetContractReturnType<typeof iCakeABI, PublicClient, WalletClient>;
export declare const fetchPublicIfoData: (chainId: ChainId, provider: OnChainProvider) => Promise<{
    ceiling: string;
}>;
interface Params {
    account: Address;
    chainId: ChainId;
    provider: OnChainProvider;
}
export declare const fetchUserIfoCredit: ({ account, chainId, provider }: Params) => Promise<string>;
export {};
//# sourceMappingURL=fetchUserIfo.d.ts.map