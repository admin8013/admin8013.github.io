/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export declare const getPoolAprByTokenPerBlock: (stakingTokenPrice: number, rewardTokenPrice: number, totalStaked: number, tokenPerBlock: number) => number | null;
export declare const getPoolAprByTokenPerSecond: (stakingTokenPrice: number, rewardTokenPrice: number, totalStaked: number, tokenPerSecond: number) => number | null;
//# sourceMappingURL=apr.d.ts.map