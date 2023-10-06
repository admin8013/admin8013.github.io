import { __privateAdd, __async, __privateGet, __spreadProps, __spreadValues, __privateSet } from '../chunk-WE74IZDZ.mjs';
import { getAddress, UserRejectedRequestError, ResourceNotFoundRpcError, createWalletClient, custom } from 'viem';
import { Connector, ConnectorNotFoundError, ChainNotConfiguredError } from 'wagmi';

// connectors/utils.ts
function normalizeChainId(chainId) {
  if (typeof chainId === "string")
    return Number.parseInt(chainId, chainId.trim().substring(0, 2) === "0x" ? 16 : 10);
  if (typeof chainId === "bigint")
    return Number(chainId);
  return chainId;
}

// connectors/blocto/blocto.ts
var chainIdToNetwork = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  42: "kovan",
  56: "bsc",
  // BSC Mainnet
  97: "chapel",
  // BSC Testnet
  137: "polygon",
  // Polygon Mainnet
  80001: "mumbai",
  // Polygon Testnet
  43114: "avalanche",
  // Avalanche Mainnet
  43113: "fuji",
  // Avalanche Testnet
  42161: "arbitrum",
  // Arbitrum Mainnet
  421613: "arbitrumGoerli"
  // Arbitrum Testnet
};
var _provider;
var BloctoConnector = class extends Connector {
  constructor(config = {
    options: { defaultChainId: 56 }
  }) {
    var _a;
    const chains = (_a = config.chains) == null ? void 0 : _a.filter((c) => !!chainIdToNetwork[c.id]);
    super({
      chains,
      options: config.options
    });
    this.id = "blocto";
    this.name = "Blocto";
    this.ready = typeof window !== "undefined";
    __privateAdd(this, _provider, void 0);
    this.onAccountsChanged = (accounts) => {
      if (accounts.length === 0)
        this.emit("disconnect");
      else {
        let account = accounts[0];
        if (typeof account === "string" && !account.startsWith("0x")) {
          account = `0x${account}`;
        }
        this.emit("change", {
          account: getAddress(account)
        });
      }
    };
    this.onChainChanged = (chainId) => {
      const id = normalizeChainId(chainId);
      const unsupported = this.isChainUnsupported(id);
      this.emit("change", { chain: { id, unsupported } });
    };
    this.onDisconnect = () => {
      this.emit("disconnect");
    };
  }
  connect() {
    return __async(this, arguments, function* ({ chainId } = {}) {
      try {
        const provider = yield this.getProvider({ chainId });
        if (!provider)
          throw new ConnectorNotFoundError();
        if (provider.on) {
          provider.on("accountsChanged", this.onAccountsChanged);
          provider.on("chainChanged", this.onChainChanged);
          provider.on("disconnect", this.onDisconnect);
        }
        this.emit("message", { type: "connecting" });
        const account = yield this.getAccount();
        const id = yield this.getChainId();
        const unsupported = this.isChainUnsupported(id);
        return { account, chain: { id, unsupported }, provider };
      } catch (error) {
        this.disconnect();
        if (this.isUserRejectedRequestError(error))
          throw new UserRejectedRequestError(error);
        if (error.code === -32002)
          throw new ResourceNotFoundRpcError(error);
        throw error;
      }
    });
  }
  getProvider() {
    return __async(this, arguments, function* ({ chainId } = {}) {
      if (!__privateGet(this, _provider) || chainId) {
        const rpc = this.chains.reduce(
          // eslint-disable-next-line @typescript-eslint/no-shadow
          (rpc2, chain) => __spreadProps(__spreadValues({}, rpc2), { [chain.id]: chain.rpcUrls.default.http[0] }),
          {}
        );
        let targetChainId = chainId;
        if (!targetChainId) {
          const fallbackChainId = this.options.defaultChainId;
          if (fallbackChainId && !this.isChainUnsupported(fallbackChainId))
            targetChainId = fallbackChainId;
        }
        if (!targetChainId)
          throw new ChainNotConfiguredError({ chainId: targetChainId || 0, connectorId: this.id });
        const BloctoSDK = (yield import('@blocto/sdk')).default;
        __privateSet(this, _provider, new BloctoSDK({
          appId: this.options.appId,
          ethereum: {
            chainId: targetChainId,
            rpc: rpc[targetChainId]
          }
        }).ethereum);
      }
      if (!__privateGet(this, _provider))
        throw new ConnectorNotFoundError();
      return __privateGet(this, _provider);
    });
  }
  isAuthorized() {
    return __async(this, null, function* () {
      var _a, _b;
      const walletName = (_a = this.storage) == null ? void 0 : _a.getItem("wallet");
      const connected = Boolean((_b = this.storage) == null ? void 0 : _b.getItem("connected"));
      const isConnect = walletName === "blocto" && connected;
      return Promise.resolve(isConnect);
    });
  }
  getWalletClient() {
    return __async(this, arguments, function* ({ chainId } = {}) {
      const [provider, account] = yield Promise.all([this.getProvider({ chainId }), this.getAccount()]);
      const chain = this.chains.find((x) => x.id === chainId) || this.chains[0];
      if (!provider)
        throw new Error("provider is required.");
      return createWalletClient({
        account,
        chain,
        transport: custom(provider)
      });
    });
  }
  getAccount() {
    return __async(this, null, function* () {
      const provider = yield this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      const accounts = yield provider.request({
        method: "eth_requestAccounts"
      });
      let account = accounts[0];
      if (typeof account === "string" && !account.startsWith("0x")) {
        account = `0x${account}`;
      }
      return getAddress(account);
    });
  }
  getChainId() {
    return __async(this, null, function* () {
      const provider = yield this.getProvider();
      if (!provider)
        throw new ConnectorNotFoundError();
      return provider.request({ method: "eth_chainId" }).then(normalizeChainId);
    });
  }
  disconnect() {
    return __async(this, null, function* () {
      const provider = yield this.getProvider();
      if (provider) {
        yield provider.request({ method: "wallet_disconnect" });
      }
      if (!(provider == null ? void 0 : provider.removeListener))
        return;
      provider.removeListener("accountsChanged", this.onAccountsChanged);
      provider.removeListener("chainChanged", this.onChainChanged);
      provider.removeListener("disconnect", this.onDisconnect);
    });
  }
  isUserRejectedRequestError(error) {
    return error.code === 4001;
  }
};
_provider = new WeakMap();

export { BloctoConnector };
