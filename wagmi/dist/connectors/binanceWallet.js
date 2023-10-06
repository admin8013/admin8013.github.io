'use strict';

var chunkCZIYAYPK_js = require('../chunk-CZIYAYPK.js');
var wagmi = require('wagmi');
var viem = require('viem');
var injected = require('wagmi/connectors/injected');

var mappingNetwork = {
  1: "eth-mainnet",
  56: "bsc-mainnet",
  97: "bsc-testnet"
};
var _binanceChainListener = () => chunkCZIYAYPK_js.__async(void 0, null, function* () {
  return new Promise(
    (resolve) => Object.defineProperty(window, "BinanceChain", {
      get() {
        return this.bsc;
      },
      set(bsc) {
        this.bsc = bsc;
        resolve();
      }
    })
  );
});
var BinanceWalletConnector = class extends injected.InjectedConnector {
  constructor({
    chains: _chains
  } = {}) {
    const options = {
      name: "Binance",
      shimDisconnect: false,
      shimChainChangedDisconnect: true
    };
    const chains = _chains == null ? void 0 : _chains.filter((c) => !!mappingNetwork[c.id]);
    super({
      chains,
      options
    });
    this.id = "bsc";
    this.ready = typeof window !== "undefined";
  }
  connect() {
    return chunkCZIYAYPK_js.__async(this, arguments, function* ({ chainId } = {}) {
      try {
        const provider = yield this.getProvider();
        if (!provider)
          throw new wagmi.ConnectorNotFoundError();
        if (provider.on) {
          provider.on("accountsChanged", this.onAccountsChanged);
          provider.on("chainChanged", this.onChainChanged);
          provider.on("disconnect", this.onDisconnect);
        }
        this.emit("message", { type: "connecting" });
        const account = yield this.getAccount();
        let id = yield this.getChainId();
        let unsupported = this.isChainUnsupported(id);
        if (chainId && id !== chainId) {
          const chain = yield this.switchChain(chainId);
          id = chain.id;
          unsupported = this.isChainUnsupported(id);
        }
        return { account, chain: { id, unsupported }, provider };
      } catch (error) {
        if (this.isUserRejectedRequestError(error))
          throw new viem.UserRejectedRequestError(error);
        if (error.code === -32002)
          throw new viem.ResourceUnavailableRpcError(error);
        throw error;
      }
    });
  }
  getProvider() {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      if (typeof window !== "undefined") {
        if (window.BinanceChain) {
          this.provider = window.BinanceChain;
        } else {
          yield _binanceChainListener();
          this.provider = window.BinanceChain;
        }
      }
      return this.provider;
    });
  }
  switchChain(chainId) {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      var _a;
      const provider = yield this.getProvider();
      if (!provider)
        throw new wagmi.ConnectorNotFoundError();
      const id = viem.toHex(chainId);
      if (mappingNetwork[chainId]) {
        try {
          yield (_a = provider.switchNetwork) == null ? void 0 : _a.call(provider, mappingNetwork[chainId]);
          return this.chains.find((x) => x.id === chainId) || {
            id: chainId,
            name: `Chain ${id}`,
            network: `${id}`,
            nativeCurrency: { decimals: 18, name: "BNB", symbol: "BNB" },
            rpcUrls: { default: { http: [""] }, public: { http: [""] } }
          };
        } catch (error) {
          if (error.error === "user rejected") {
            throw new viem.UserRejectedRequestError(error);
          }
        }
      }
      throw new wagmi.SwitchChainNotSupportedError({ connector: this });
    });
  }
};

exports.BinanceWalletConnector = BinanceWalletConnector;
