'use strict';

var chains = require('@pancakeswap/chains');
var viem = require('viem');

// ../utils/toBigInt.ts
function toBigInt(num) {
  return BigInt(num.toString());
}
var MULTICALL_ADDRESS = {
  [chains.ChainId.ZKSYNC]: "0x95071cBD09184083E7F732a710c2e30c9882Fd5f",
  [chains.ChainId.BSC]: "0x39eecaE833c944ebb94942Fa44CaE46e87a8Da17",
  [chains.ChainId.ETHEREUM]: "0xC0916D7E360c31D5F6D0c497E6a36B7B0E80e3cf",
  [chains.ChainId.ARBITRUM_ONE]: "0xbFfE39cDD04f0183e0493c1Deb6E275c5cf84AdF",
  [chains.ChainId.POLYGON_ZKEVM]: "0xe05b539447B17630Cb087473F6b50E5c5f73FDeb",
  [chains.ChainId.LINEA]: "0x6E6B30d65D605DAa4CaC65eB270100Ecca36b140",
  [chains.ChainId.BASE]: "0x3EFaAb8D7A631cfF5ccF5f149d1Bbb3B5bfda2C0",
  [chains.ChainId.OPBNB]: "0xeF1511D29fB37cb87E33339EeC9BE13AB46E3b50",
  // Testnets
  [chains.ChainId.BSC_TESTNET]: "0xeeF6ff30cF5D5b8aBA0DE16A01d17A0697a275b5",
  [chains.ChainId.GOERLI]: "0xD55CAFAB2Ffa1139Be46bc5C0b8259c620050dFC",
  [chains.ChainId.ARBITRUM_GOERLI]: "0xe12a5c707Fb528acbE6117b20AF1f7c20b0A8077",
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: "0x236e713bFF45adb30e25D1c29A887aBCb0Ea7E21",
  [chains.ChainId.ZKSYNC_TESTNET]: "0x8A23CB45E5F4d5a1b2DB673663Ea2aAedc48acff",
  [chains.ChainId.LINEA_TESTNET]: "0x990010b6DBA3e7faa025790bC0433A9f690c65F3",
  [chains.ChainId.BASE_TESTNET]: "0x6F7f93D929d6FBaF16c245e42846EF21aee23437",
  [chains.ChainId.OPBNB_TESTNET]: "0x6A70ED893D85cf6D4059e1CF3e63a48e4D204D32",
  [chains.ChainId.SCROLL_SEPOLIA]: "0x052a99849Ef2e13a5CB28275862991671D4b6fF5"
};
var DEFAULT_BLOCK_CONFLICT_TOLERANCE = 0;
var BLOCK_CONFLICT_TOLERANCE = {
  [chains.ChainId.BSC]: 3,
  [chains.ChainId.ETHEREUM]: 1,
  [chains.ChainId.ARBITRUM_ONE]: 5,
  [chains.ChainId.POLYGON_ZKEVM]: 1,
  [chains.ChainId.ZKSYNC]: 3,
  [chains.ChainId.LINEA]: 3,
  [chains.ChainId.BASE]: 3,
  [chains.ChainId.OPBNB]: 3,
  // Testnets
  [chains.ChainId.BSC_TESTNET]: 3,
  [chains.ChainId.GOERLI]: 1,
  [chains.ChainId.ARBITRUM_GOERLI]: 5,
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: 1,
  [chains.ChainId.ZKSYNC_TESTNET]: 3,
  [chains.ChainId.LINEA_TESTNET]: 3,
  [chains.ChainId.OPBNB_TESTNET]: 3,
  [chains.ChainId.BASE_TESTNET]: 3,
  [chains.ChainId.SCROLL_SEPOLIA]: 3
};
var DEFAULT_GAS_LIMIT = 150000000n;
var DEFAULT_GAS_LIMIT_BY_CHAIN = {
  [chains.ChainId.BSC]: 100000000n,
  [chains.ChainId.ZKSYNC]: 500000000n,
  [chains.ChainId.POLYGON_ZKEVM]: 1500000n,
  [chains.ChainId.BASE]: 130000000n
};
var DEFAULT_GAS_BUFFER = 3000000n;
var DEFAULT_GAS_BUFFER_BY_CHAIN = {
  [chains.ChainId.BSC]: DEFAULT_GAS_BUFFER,
  [chains.ChainId.POLYGON_ZKEVM]: 0n
};

// src/abis/IMulticall.ts
var iMulticallABI = [
  {
    inputs: [],
    name: "gasLeft",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "gaslimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "bytes", name: "callData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Call[]",
        name: "calls",
        type: "tuple[]"
      }
    ],
    name: "multicall",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "uint256", name: "gasUsed", type: "uint256" },
          { internalType: "bytes", name: "returnData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Result[]",
        name: "returnData",
        type: "tuple[]"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "target", type: "address" },
          { internalType: "uint256", name: "gasLimit", type: "uint256" },
          { internalType: "bytes", name: "callData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Call[]",
        name: "calls",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "gasBuffer", type: "uint256" }
    ],
    name: "multicallWithGasLimitation",
    outputs: [
      { internalType: "uint256", name: "blockNumber", type: "uint256" },
      {
        components: [
          { internalType: "bool", name: "success", type: "bool" },
          { internalType: "uint256", name: "gasUsed", type: "uint256" },
          { internalType: "bytes", name: "returnData", type: "bytes" }
        ],
        internalType: "struct MultiCallV2.Result[]",
        name: "returnData",
        type: "tuple[]"
      },
      { internalType: "uint256", name: "lastSuccessIndex", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/getMulticallContract.ts
function getMulticallContract({
  chainId,
  client
}) {
  const address = MULTICALL_ADDRESS[chainId];
  if (!address) {
    throw new Error(`PancakeMulticall not supported on chain ${chainId}`);
  }
  return viem.getContract({ abi: iMulticallABI, address, publicClient: client });
}

// src/getGasLimit.ts
function getDefaultGasLimit(chainId) {
  const gasLimitOnChain = chainId && DEFAULT_GAS_LIMIT_BY_CHAIN[chainId];
  return gasLimitOnChain !== void 0 ? gasLimitOnChain : DEFAULT_GAS_LIMIT;
}
function getDefaultGasBuffer(chainId) {
  const gasBufferOnChain = chainId && DEFAULT_GAS_BUFFER_BY_CHAIN[chainId];
  return gasBufferOnChain !== void 0 ? gasBufferOnChain : DEFAULT_GAS_BUFFER;
}
async function getGasLimitOnChain({ chainId, client }) {
  const multicall = getMulticallContract({ chainId, client });
  const gasLeft = await multicall.read.gasLeft();
  return gasLeft;
}
async function getGasLimit({
  chainId,
  gasLimit: gasLimitInput,
  maxGasLimit: maxGasLimitInput = getDefaultGasLimit(chainId),
  gasBuffer: gasBufferInput = getDefaultGasBuffer(chainId),
  client
}) {
  const gasLimitOverride = gasLimitInput && toBigInt(gasLimitInput);
  const maxGasLimit = toBigInt(maxGasLimitInput);
  const gasBuffer = toBigInt(gasBufferInput);
  const gasLimit = gasLimitOverride || await getGasLimitOnChain({ chainId, client }) || maxGasLimit;
  const minGasLimit = gasLimit < maxGasLimit ? gasLimit : maxGasLimit;
  return minGasLimit - gasBuffer;
}

// src/getBlockConflictTolerance.ts
function getBlockConflictTolerance(chainId) {
  return BLOCK_CONFLICT_TOLERANCE[chainId] || DEFAULT_BLOCK_CONFLICT_TOLERANCE;
}

// src/multicall.ts
async function multicallByGasLimit(calls, { chainId, gasBuffer = getDefaultGasBuffer(chainId), client, dropUnexecutedCalls, ...rest }) {
  const gasLimit = await getGasLimit({
    chainId,
    gasBuffer,
    client,
    ...rest
  });
  const callChunks = splitCallsIntoChunks(calls, gasLimit);
  return callByChunks(callChunks, { gasBuffer, client, chainId, dropUnexecutedCalls });
}
function formatCallReturn([blockNumber, results, successIndex]) {
  const lastSuccessIndex = Number(successIndex);
  return {
    lastSuccessIndex,
    blockNumber,
    results: results.slice(0, lastSuccessIndex + 1).map(({ gasUsed, success, returnData }) => ({
      gasUsed,
      success,
      result: returnData
    }))
  };
}
async function call(calls, params) {
  const {
    chainId,
    client,
    gasBuffer = getDefaultGasBuffer(chainId),
    blockConflictTolerance = getBlockConflictTolerance(chainId),
    dropUnexecutedCalls = false
  } = params;
  if (!calls.length) {
    return {
      results: [],
      blockNumber: 0n
    };
  }
  const contract = getMulticallContract({ chainId, client });
  const { result } = await contract.simulate.multicallWithGasLimitation([calls, gasBuffer]);
  const { results, lastSuccessIndex, blockNumber } = formatCallReturn(result);
  if (lastSuccessIndex === calls.length - 1) {
    return {
      results,
      blockNumber
    };
  }
  console.warn(
    `Gas limit reached. Total num of ${calls.length} calls. First ${lastSuccessIndex + 1} calls executed. The remaining ${calls.length - lastSuccessIndex - 1} calls are not executed. Pls try adjust the gas limit per call.`
  );
  const remainingCalls = calls.slice(lastSuccessIndex + 1);
  if (dropUnexecutedCalls) {
    return {
      results: [...results, ...remainingCalls.map(() => ({ result: "0x", gasUsed: 0n, success: false }))],
      blockNumber
    };
  }
  const { results: remainingResults, blockNumber: nextBlockNumber } = await call(
    calls.slice(lastSuccessIndex + 1),
    params
  );
  if (Number(nextBlockNumber - blockNumber) > blockConflictTolerance) {
    throw new Error(
      `Multicall failed because of block conflict. Latest calls are made at block ${nextBlockNumber} while last calls made at block ${blockNumber}. Block conflict tolerance is ${blockConflictTolerance}`
    );
  }
  return {
    results: [...results, ...remainingResults],
    // Use the latest block number
    blockNumber: nextBlockNumber
  };
}
async function callByChunks(chunks, params) {
  const { blockConflictTolerance = getBlockConflictTolerance(params.chainId) } = params;
  const callReturns = await Promise.all(chunks.map((chunk) => call(chunk, params)));
  let minBlock = 0n;
  let maxBlock = 0n;
  let results = [];
  for (const { results: callResults, blockNumber } of callReturns) {
    if (minBlock === 0n || blockNumber < minBlock) {
      minBlock = blockNumber;
    }
    if (blockNumber > maxBlock) {
      maxBlock = blockNumber;
    }
    if (Number(maxBlock - minBlock) > blockConflictTolerance) {
      throw new Error(
        `Multicall failed because of block conflict. Min block is ${minBlock} while max block is ${maxBlock}. Block conflict tolerance is ${blockConflictTolerance}`
      );
    }
    results = [...results, ...callResults];
  }
  return {
    results,
    blockNumber: maxBlock
  };
}
function splitCallsIntoChunks(calls, gasLimit) {
  const chunks = [[]];
  let gasLeft = gasLimit;
  for (const callRequest of calls) {
    const { target, callData, gasLimit: gasCostLimit } = callRequest;
    const singleGasLimit = toBigInt(gasCostLimit);
    const currentChunk = chunks[chunks.length - 1];
    if (singleGasLimit > gasLeft) {
      chunks.push([callRequest]);
      gasLeft = gasLimit - singleGasLimit;
      if (gasLeft < 0n) {
        console.warn(
          `Multicall request may fail as the gas cost of a single call exceeds the gas limit ${gasLimit}. Gas cost: ${singleGasLimit}. To: ${target}. Data: ${callData}`
        );
      }
      continue;
    }
    currentChunk.push(callRequest);
    gasLeft -= singleGasLimit;
  }
  return chunks;
}

exports.BLOCK_CONFLICT_TOLERANCE = BLOCK_CONFLICT_TOLERANCE;
exports.DEFAULT_BLOCK_CONFLICT_TOLERANCE = DEFAULT_BLOCK_CONFLICT_TOLERANCE;
exports.DEFAULT_GAS_BUFFER = DEFAULT_GAS_BUFFER;
exports.DEFAULT_GAS_BUFFER_BY_CHAIN = DEFAULT_GAS_BUFFER_BY_CHAIN;
exports.DEFAULT_GAS_LIMIT = DEFAULT_GAS_LIMIT;
exports.DEFAULT_GAS_LIMIT_BY_CHAIN = DEFAULT_GAS_LIMIT_BY_CHAIN;
exports.MULTICALL_ADDRESS = MULTICALL_ADDRESS;
exports.getBlockConflictTolerance = getBlockConflictTolerance;
exports.getDefaultGasBuffer = getDefaultGasBuffer;
exports.getDefaultGasLimit = getDefaultGasLimit;
exports.getGasLimit = getGasLimit;
exports.getGasLimitOnChain = getGasLimitOnChain;
exports.getMulticallContract = getMulticallContract;
exports.iMulticallABI = iMulticallABI;
exports.multicallByGasLimit = multicallByGasLimit;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map