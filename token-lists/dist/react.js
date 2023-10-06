'use strict';

var chunkOGWZ2K32_js = require('./chunk-OGWZ2K32.js');
var chunk4TPCCB4K_js = require('./chunk-4TPCCB4K.js');
var toolkit = require('@reduxjs/toolkit');
var jotai = require('jotai');
var utils = require('jotai/utils');
var localForage = require('localforage');
var react = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var localForage__default = /*#__PURE__*/_interopDefault(localForage);

var fetchTokenList = {
  pending: toolkit.createAction("lists/fetchTokenList/pending"),
  fulfilled: toolkit.createAction("lists/fetchTokenList/fulfilled"),
  rejected: toolkit.createAction("lists/fetchTokenList/rejected")
};
var addList = toolkit.createAction("lists/addList");
var removeList = toolkit.createAction("lists/removeList");
var enableList = toolkit.createAction("lists/enableList");
var disableList = toolkit.createAction("lists/disableList");
var acceptListUpdate = toolkit.createAction("lists/acceptListUpdate");
var rejectVersionUpdate = toolkit.createAction("lists/rejectVersionUpdate");
var updateListVersion = toolkit.createAction("lists/updateListVersion");

// react/reducer.ts
var NEW_LIST_STATE = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
};
var createTokenListReducer = (initialState, DEFAULT_LIST_OF_LISTS, DEFAULT_ACTIVE_LIST_URLS) => toolkit.createReducer(
  initialState,
  (builder) => builder.addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
    var _a, _b, _c, _d;
    const current = (_b = (_a = state.byUrl[url]) == null ? void 0 : _a.current) != null ? _b : null;
    const pendingUpdate = (_d = (_c = state.byUrl[url]) == null ? void 0 : _c.pendingUpdate) != null ? _d : null;
    state.byUrl[url] = {
      current,
      pendingUpdate,
      loadingRequestId: requestId,
      error: null
    };
  }).addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
    var _a, _b;
    const current = (_a = state.byUrl[url]) == null ? void 0 : _a.current;
    const loadingRequestId = (_b = state.byUrl[url]) == null ? void 0 : _b.loadingRequestId;
    if (current) {
      const upgradeType = chunkOGWZ2K32_js.getVersionUpgrade(current.version, tokenList.version);
      if (upgradeType === 0 /* NONE */)
        return;
      if (loadingRequestId === null || loadingRequestId === requestId) {
        state.byUrl[url] = chunk4TPCCB4K_js.__spreadProps(chunk4TPCCB4K_js.__spreadValues({}, state.byUrl[url]), {
          loadingRequestId: null,
          error: null,
          current,
          pendingUpdate: tokenList
        });
      }
    } else {
      if (DEFAULT_ACTIVE_LIST_URLS.includes(url) && state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url);
      }
      state.byUrl[url] = chunk4TPCCB4K_js.__spreadProps(chunk4TPCCB4K_js.__spreadValues({}, state.byUrl[url]), {
        loadingRequestId: null,
        error: null,
        current: tokenList,
        pendingUpdate: null
      });
    }
  }).addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
    var _a;
    if (((_a = state.byUrl[url]) == null ? void 0 : _a.loadingRequestId) !== requestId) {
      return;
    }
    state.byUrl[url] = chunk4TPCCB4K_js.__spreadProps(chunk4TPCCB4K_js.__spreadValues({}, state.byUrl[url]), {
      loadingRequestId: null,
      error: errorMessage,
      current: null,
      pendingUpdate: null
    });
  }).addCase(addList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
      state.byUrl[url] = NEW_LIST_STATE;
    }
  }).addCase(removeList, (state, { payload: url }) => {
    if (state.byUrl[url]) {
      delete state.byUrl[url];
    }
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
      state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
  }).addCase(enableList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
      state.byUrl[url] = NEW_LIST_STATE;
    }
    if (state.activeListUrls && !state.activeListUrls.includes(url)) {
      state.activeListUrls.push(url);
    }
    if (!state.activeListUrls) {
      state.activeListUrls = [url];
    }
  }).addCase(disableList, (state, { payload: url }) => {
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
      state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
  }).addCase(acceptListUpdate, (state, { payload: url }) => {
    var _a;
    if (!((_a = state.byUrl[url]) == null ? void 0 : _a.pendingUpdate)) {
      throw new Error("accept list update called without pending update");
    }
    state.byUrl[url] = chunk4TPCCB4K_js.__spreadProps(chunk4TPCCB4K_js.__spreadValues({}, state.byUrl[url]), {
      pendingUpdate: null,
      current: state.byUrl[url].pendingUpdate
    });
  }).addCase(updateListVersion, (state) => {
    if (!state.lastInitializedDefaultListOfLists) {
      state.byUrl = initialState.byUrl;
      state.activeListUrls = initialState.activeListUrls;
    } else if (state.lastInitializedDefaultListOfLists) {
      const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce(
        (s, l) => s.add(l),
        /* @__PURE__ */ new Set()
      );
      const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), /* @__PURE__ */ new Set());
      DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
        if (!lastInitializedSet.has(listUrl)) {
          state.byUrl[listUrl] = NEW_LIST_STATE;
        }
      });
      state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
        if (!newListOfListsSet.has(listUrl)) {
          delete state.byUrl[listUrl];
        }
      });
    }
    state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS;
    if (!state.activeListUrls) {
      state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS;
      DEFAULT_ACTIVE_LIST_URLS.forEach((listUrl) => {
        if (!state.byUrl[listUrl]) {
          state.byUrl[listUrl] = NEW_LIST_STATE;
        }
        return true;
      });
    }
  })
);
function noop() {
}
var noopStorage = {
  getItem: () => Promise.resolve(noop()),
  setItem: () => Promise.resolve(noop()),
  removeItem: () => Promise.resolve(noop())
};
var EMPTY = Symbol();
var createListsAtom = (storeName, reducer, initialState) => {
  function IndexedDBStorage(dbName) {
    if (typeof window !== "undefined") {
      const db = localForage__default.default.createInstance({
        name: dbName,
        storeName
      });
      return {
        getItem: (key) => chunk4TPCCB4K_js.__async(this, null, function* () {
          const value = yield db.getItem(key);
          if (value) {
            return value;
          }
          return initialState;
        }),
        setItem: (k, v) => chunk4TPCCB4K_js.__async(this, null, function* () {
          if (v === EMPTY)
            return;
          yield db.setItem(k, v);
        }),
        removeItem: db.removeItem
      };
    }
    return noopStorage;
  }
  const listsStorageAtom = utils.atomWithStorage("lists", EMPTY, IndexedDBStorage("lists"));
  const defaultStateAtom = jotai.atom(
    (get) => {
      const value = get(utils.loadable(listsStorageAtom));
      if (value.state === "hasData" && value.data !== EMPTY) {
        return value.data;
      }
      return initialState;
    },
    (get, set, action) => chunk4TPCCB4K_js.__async(void 0, null, function* () {
      set(listsStorageAtom, reducer(yield get(defaultStateAtom), action));
    })
  );
  const isReadyAtom = utils.loadable(listsStorageAtom);
  function useListState() {
    return jotai.useAtom(defaultStateAtom);
  }
  function useListStateReady() {
    const value = jotai.useAtomValue(isReadyAtom);
    return value.state === "hasData" && value.data !== EMPTY;
  }
  return {
    listsAtom: defaultStateAtom,
    useListStateReady,
    useListState
  };
};
function useFetchListCallback(dispatch) {
  return react.useCallback(
    (listUrl, sendDispatch = true) => chunk4TPCCB4K_js.__async(this, null, function* () {
      const requestId = toolkit.nanoid();
      if (sendDispatch) {
        dispatch(fetchTokenList.pending({ requestId, url: listUrl }));
      }
      const getTokenList = (yield import('./getTokenList-YNKBKHZ3.js')).default;
      return getTokenList(listUrl).then((tokenList) => {
        if (sendDispatch) {
          dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }));
        }
        return tokenList;
      }).catch((error) => {
        console.error(`Failed to get list at url ${listUrl}`, error);
        if (sendDispatch) {
          dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }));
        }
        throw error;
      });
    }),
    [dispatch]
  );
}
var useFetchListCallback_default = useFetchListCallback;

exports.NEW_LIST_STATE = NEW_LIST_STATE;
exports.acceptListUpdate = acceptListUpdate;
exports.addList = addList;
exports.createListsAtom = createListsAtom;
exports.createTokenListReducer = createTokenListReducer;
exports.disableList = disableList;
exports.enableList = enableList;
exports.fetchTokenList = fetchTokenList;
exports.rejectVersionUpdate = rejectVersionUpdate;
exports.removeList = removeList;
exports.updateListVersion = updateListVersion;
exports.useFetchListCallback = useFetchListCallback_default;
