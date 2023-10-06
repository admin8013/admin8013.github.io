import { ChainId } from '@pancakeswap/chains';
import { WalletClient, PublicClient, Address, GetContractReturnType, Account, Chain } from 'viem';
import { smartChefABI } from '../abis/ISmartChef';
import { sousChefV2ABI } from '../abis/ISousChefV2';
import { sousChefBnbABI } from '../abis/ISousChefBNB';
interface Params {
    chainId?: ChainId;
    sousId: number;
    signer?: any;
    publicClient?: any;
}
type GetContractReturnType_<TAbi extends readonly unknown[]> = GetContractReturnType<TAbi, any, any> & {
    abi: TAbi;
    address: Address;
    account?: Account;
    chain?: Chain;
};
export declare function getSousChefBNBContract({ address, signer, publicClient, }: {
    address: Address;
    signer?: WalletClient;
    publicClient?: PublicClient;
}): GetContractReturnType_<typeof sousChefBnbABI>;
export declare function getSousChefV2Contract({ address, signer, publicClient, }: {
    address: Address;
    signer?: WalletClient;
    publicClient?: PublicClient;
}): GetContractReturnType_<typeof sousChefV2ABI>;
export declare function getSmartChefChefV2Contract({ address, signer, publicClient, }: {
    address: Address;
    signer?: WalletClient;
    publicClient?: PublicClient;
}): GetContractReturnType_<typeof smartChefABI>;
export declare function getPoolContractBySousId({ chainId, sousId, signer, publicClient }: Params): any | null;
export {};
//# sourceMappingURL=getPoolContractBySousId.d.ts.map