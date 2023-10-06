'use strict';

var chunkCZIYAYPK_js = require('../chunk-CZIYAYPK.js');
var viem = require('viem');
var wagmi = require('wagmi');
var injected = require('wagmi/connectors/injected');

var MiniProgramConnector = class extends injected.InjectedConnector {
  constructor({ chains, getWeb3Provider }) {
    const options = {
      name: "BnInjected",
      shimDisconnect: false,
      shimChainChangedDisconnect: false
    };
    super({
      chains,
      options
    });
    this.id = "miniprogram";
    this.ready = typeof window !== "undefined" && !!window.bn;
    this.getWeb3Provider = getWeb3Provider;
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
  getAccount() {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      const provider = yield this.getProvider();
      if (!provider)
        throw new wagmi.ConnectorNotFoundError();
      const accounts = yield provider.request({
        method: "eth_accounts"
      });
      return viem.getAddress(accounts[0]);
    });
  }
  getChainId() {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      return 56;
    });
  }
  getProvider() {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      if (typeof window !== "undefined") {
        this.provider = this.getWeb3Provider();
      }
      return this.provider;
    });
  }
};

exports.MiniProgramConnector = MiniProgramConnector;
