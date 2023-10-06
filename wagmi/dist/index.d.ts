import { Chain, Connector } from 'wagmi';
import { SignMessageArgs } from 'wagmi/actions';

declare function useWeb3React(): {
    chainId: number | undefined;
    account: `0x${string}` | null | undefined;
    isConnected: boolean;
    isConnecting: boolean;
    chain: (Chain & {
        unsupported?: boolean | undefined;
    }) | undefined;
    connector: Connector | undefined;
};

declare function useSignMessage(): {
    signMessageAsync: (args: SignMessageArgs) => Promise<any>;
};

export { useSignMessage, useWeb3React };
