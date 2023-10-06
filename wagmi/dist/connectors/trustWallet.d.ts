import { WindowProvider, Chain } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

declare global {
    interface Window {
        trustwallet?: WindowProvider;
    }
}
declare function getTrustWalletProvider(): WindowProvider | undefined;
declare class TrustWalletConnector extends InjectedConnector {
    readonly id = "trustWallet";
    constructor({ chains, options: _options, }?: {
        chains?: Chain[];
        options?: {
            shimDisconnect?: boolean;
            shimChainChangedDisconnect?: boolean;
        };
    });
    private handleFailedConnect;
    connect({ chainId }?: {
        chainId?: number;
    }): Promise<{
        account: `0x${string}`;
        chain: {
            id: number;
            unsupported: boolean;
        };
        provider: WindowProvider;
    }>;
    getProvider(): Promise<WindowProvider | undefined>;
}

export { TrustWalletConnector, getTrustWalletProvider };
