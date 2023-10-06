'use strict';

var chunkCZIYAYPK_js = require('./chunk-CZIYAYPK.js');
var wagmi = require('wagmi');
var react = require('react');

function useWeb3React() {
  const { chain } = wagmi.useNetwork();
  const { address, connector, isConnected, isConnecting } = wagmi.useAccount();
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
  const { address, connector } = wagmi.useAccount();
  const { signMessageAsync: sign } = wagmi.useSignMessage();
  return {
    signMessageAsync: react.useCallback(
      (args) => chunkCZIYAYPK_js.__async(this, null, function* () {
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

exports.useSignMessage = useSignMessage;
exports.useWeb3React = useWeb3React;
