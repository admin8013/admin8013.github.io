import { SerializedToken, Token } from '@pancakeswap/swap-sdk-core';
import { T as TokenInfo, a as TokenList, V as Version } from './types-d6730d17.js';
export { b as Tags } from './types-d6730d17.js';

interface SerializedWrappedToken extends SerializedToken {
    chainId: number;
    address: `0x${string}`;
    decimals: number;
    symbol: string;
    name?: string;
    projectLink?: string;
    logoURI?: string;
}
/**
 * Token instances created from token info.
 */
declare class WrappedTokenInfo extends Token {
    readonly logoURI: string | undefined;
    constructor(tokenInfo: TokenInfo);
    get serialize(): SerializedWrappedToken;
}
type TokenAddressMap<TChainId extends number> = Readonly<{
    [chainId in TChainId]: Readonly<{
        [tokenAddress: string]: {
            token: WrappedTokenInfo;
            list: TokenList;
        };
    }>;
}>;
declare function deserializeToken(serializedToken: SerializedWrappedToken): Token;

/**
 * Enum describing types of version differences
 */

declare enum VersionUpgrade {
    NONE = 0,
    PATCH = 1,
    MINOR = 2,
    MAJOR = 3
}
/**
 * Return the upgrade type from the base version to the update version.
 * Note that downgrades and equivalent versions are both treated as `NONE`.
 * @param base base list
 * @param update update to the list
 */
declare function getVersionUpgrade(base: Version, update: Version): VersionUpgrade;

declare function createFilterToken<T extends TokenInfo | Token>(search: string, isAddress: (address: string) => boolean): (token: T) => boolean;

export { SerializedWrappedToken, TokenAddressMap, TokenInfo, TokenList, Version, VersionUpgrade, WrappedTokenInfo, createFilterToken, deserializeToken, getVersionUpgrade };
