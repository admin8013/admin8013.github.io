import { __async } from '../chunk-WE74IZDZ.mjs';
import { UserRejectedRequestError, ResourceUnavailableRpcError, getAddress } from 'viem';
import { ConnectorNotFoundError } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

var MiniProgramConnector = class extends InjectedConnector {
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
    return __async(this, arguments, function* ({ chainId } = {}) {
      try {
        const provider = yield this.getProvider();
        if (!provider)
          throw new ConnectorNotFoundError();
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
          throw new UserRejectedRequestError(error);
        if (error.code === -32002)
          throw new ResourceUnavailableRpcError(error);
        throw error;
      }
    });
  }
  getAccount() {
    return __async(this, null, function* () {
      const provider = yield this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      const accounts = yield provider.request({
        method: "eth_accounts"
      });
      return getAddress(accounts[0]);
    });
  }
  getChainId() {
    return __async(this, null, function* () {
      return 56;
    });
  }
  getProvider() {
    return __async(this, null, function* () {
      if (typeof window !== "undefined") {
        this.provider = this.getWeb3Provider();
      }
      return this.provider;
    });
  }
};

export { MiniProgramConnector };
