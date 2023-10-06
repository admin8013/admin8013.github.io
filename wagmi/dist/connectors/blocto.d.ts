import { Connector, Chain, WalletClient } from 'wagmi';
import { EthereumProviderInterface } from '@blocto/sdk';

declare class BloctoConnector extends Connector<EthereumProviderInterface, {
    defaultChainId: number;
    appId?: string;
}> {
    #private;
    readonly id = "blocto";
    readonly name = "Blocto";
    readonly ready: boolean;
    constructor(config?: {
        chains?: Chain[];
        options: {
            defaultChainId: number;
            appId?: string;
        };
    });
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
        provider: EthereumProviderInterface;
    }>;
    getProvider({ chainId }?: {
        chainId?: number;
    }): Promise<EthereumProviderInterface>;
    isAuthorized(): Promise<boolean>;
    getWalletClient({ chainId }?: {
        chainId?: number;
    }): Promise<WalletClient>;
    getAccount(): Promise<`0x${string}`>;
    getChainId(): Promise<number>;
    protected onAccountsChanged: (accounts: string[]) => void;
    protected onChainChanged: (chainId: number | string) => void;
    protected onDisconnect: () => void;
    disconnect(): Promise<void>;
    protected isUserRejectedRequestError(error: unknown): boolean;
}

export { BloctoConnector };
