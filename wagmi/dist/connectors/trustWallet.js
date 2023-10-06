'use strict';

var chunkCZIYAYPK_js = require('../chunk-CZIYAYPK.js');
var wagmi = require('wagmi');
var injected = require('wagmi/connectors/injected');
require('wagmi/window');
var viem = require('viem');

function getTrustWalletProvider() {
  var _a;
  const isTrustWallet = (ethereum) => {
    const trustWallet = !!ethereum.isTrust;
    return trustWallet;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }
  return window.trustwallet;
}
var TrustWalletConnector = class extends injected.InjectedConnector {
  constructor({
    chains,
    options: _options
  } = {}) {
    var _a, _b;
    const options = {
      name: "Trust Wallet",
      shimDisconnect: (_a = _options == null ? void 0 : _options.shimDisconnect) != null ? _a : false,
      shimChainChangedDisconnect: (_b = _options == null ? void 0 : _options.shimChainChangedDisconnect) != null ? _b : true
    };
    super({
      chains,
      options
    });
    this.id = "trustWallet";
  }
  handleFailedConnect(error) {
    if (this.isUserRejectedRequestError(error)) {
      throw new viem.UserRejectedRequestError(error);
    }
    if (error.code === -32002) {
      throw new viem.ResourceUnavailableRpcError(error);
    }
    throw error;
  }
  connect() {
    return chunkCZIYAYPK_js.__async(this, arguments, function* ({ chainId } = {}) {
      var _a, _b, _c, _d;
      try {
        const provider = yield this.getProvider();
        if (!provider) {
          throw new wagmi.ConnectorNotFoundError();
        }
        if (provider.on) {
          provider.on("accountsChanged", this.onAccountsChanged);
          provider.on("chainChanged", this.onChainChanged);
          provider.on("disconnect", this.onDisconnect);
        }
        this.emit("message", { type: "connecting" });
        let account = null;
        if (((_a = this.options) == null ? void 0 : _a.shimDisconnect) && !((_b = this.storage) == null ? void 0 : _b.getItem(this.shimDisconnectKey))) {
          account = yield this.getAccount().catch(() => null);
          const isConnected = !!account;
          if (isConnected) {
            try {
              yield provider.request({
                method: "wallet_requestPermissions",
                params: [{ eth_accounts: {} }]
              });
              account = yield this.getAccount();
            } catch (error) {
              if (this.isUserRejectedRequestError(error)) {
                throw new viem.UserRejectedRequestError(error);
              }
            }
          }
        }
        if (!account) {
          const accounts = yield provider.request({
            method: "eth_requestAccounts"
          });
          account = viem.getAddress(accounts[0]);
        }
        let id = yield this.getChainId();
        let unsupported = this.isChainUnsupported(id);
        if (chainId && id !== chainId) {
          const chain = yield this.switchChain(chainId);
          id = chain.id;
          unsupported = this.isChainUnsupported(id);
        }
        if ((_c = this.options) == null ? void 0 : _c.shimDisconnect) {
          (_d = this.storage) == null ? void 0 : _d.setItem(this.shimDisconnectKey, true);
        }
        return { account, chain: { id, unsupported }, provider };
      } catch (error) {
        this.handleFailedConnect(error);
      }
    });
  }
  getProvider() {
    return chunkCZIYAYPK_js.__async(this, null, function* () {
      return getTrustWalletProvider();
    });
  }
};

exports.TrustWalletConnector = TrustWalletConnector;
exports.getTrustWalletProvider = getTrustWalletProvider;
