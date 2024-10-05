declare module 'shamirs-secret-sharing' {
  export function split(
    secret: Buffer,
    { shares: number, threshold: number }
  ): Buffer[];
  export function combine(shares: Buffer[]): Buffer;
}
