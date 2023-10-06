import { BaseCurrency, Currency, Token } from '@pancakeswap/swap-sdk-core';
import { Address } from 'viem';
export interface SerializedToken {
    chainId: number;
    address: Address;
    decimals: number;
    symbol: string;
    name?: string;
    projectLink?: string;
}
export declare class ERC20Token extends Token {
    constructor(chainId: number, address: Address, decimals: number, symbol: string, name?: string, projectLink?: string);
}
/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export declare class OnRampCurrency extends BaseCurrency {
    readonly isNative: boolean;
    readonly isToken: boolean;
    /**
     * The contract address on the chain on which this token lives
     */
    readonly address: `0x${string}`;
    readonly projectLink?: string;
    constructor(chainId: number, address: `0x${string}`, decimals: number, symbol: string, name?: string, projectLink?: string);
    /**
     * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
     * @param other other token to compare
     */
    equals(other: Currency): boolean;
    /**
     * Returns true if the address of this token sorts before the address of the other token
     * @param other other token to compare
     * @throws if the tokens have the same address
     * @throws if the tokens are on different chains
     */
    sortsBefore(other: Currency): boolean;
    /**
     * Return this token, which does not need to be wrapped
     */
    get wrapped(): Token;
    get serialize(): SerializedToken;
}
//# sourceMappingURL=token.d.ts.map