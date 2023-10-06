import { ChainId } from '@pancakeswap/chains';
import { GetContractReturnType, PublicClient } from 'viem';
import { iMulticallABI } from './abis/IMulticall';
type Params = {
    chainId: ChainId;
    client?: PublicClient;
};
export declare function getMulticallContract({ chainId, client, }: Params): GetContractReturnType<typeof iMulticallABI, PublicClient>;
export {};
//# sourceMappingURL=getMulticallContract.d.ts.map