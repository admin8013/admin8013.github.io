import { __async } from './chunk-WE74IZDZ.mjs';
import { useNetwork, useAccount, useSignMessage as useSignMessage$1 } from 'wagmi';
import { useCallback } from 'react';

function useWeb3React() {
  const { chain } = useNetwork();
  const { address, connector, isConnected, isConnecting } = useAccount();
  return {
    chainId: chain == null ? void 0 : chain.id,
    account: isConnected ? address : null,
    // TODO: migrate using `isConnected` instead of account to check wallet auth
    isConnected,
    isConnecting,
    chain,
    connector
  };
}
function useSignMessage() {
  const { address, connector } = useAccount();
  const { signMessageAsync: sign } = useSignMessage$1();
  return {
    signMessageAsync: useCallback(
      (args) => __async(this, null, function* () {
        var _a, _b;
        if ((connector == null ? void 0 : connector.id) === "bsc" && window.BinanceChain && address) {
          const res = yield (_b = (_a = window.BinanceChain).bnbSign) == null ? void 0 : _b.call(_a, address, args.message);
          if (res) {
            return res.signature;
          }
          return null;
        }
        return sign(args);
      }),
      [address, connector == null ? void 0 : connector.id, sign]
    )
  };
}

export { useSignMessage, useWeb3React };
