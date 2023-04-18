import { bscTestnetTokens } from '@pancakeswap/tokens'

import { PoolCategory, SerializedPool } from '../../types'

export const livePools: SerializedPool[] = [
  {
    sousId: 1,
    stakingToken: bscTestnetTokens.cake2,
    earningToken: bscTestnetTokens.mockA,
    contractAddress: {
      97: '0xe7080E3afDfF2322080B5ba85700FE41287D864B',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.01',
  },
  {
    sousId: 2,
    stakingToken: bscTestnetTokens.mockA,
    earningToken: bscTestnetTokens.mockB,
    contractAddress: {
      97: '0x31a069925fb770202b302c7911af1acbe0395420',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.01',
  },
  {
    sousId: 3,
    stakingToken: bscTestnetTokens.wbnb,
    earningToken: bscTestnetTokens.cake2,
    contractAddress: {
      97: '0x550d3a43D5CB57E70dD1F53699CEaA0f371ADbBb',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.01',
  },
  {
    sousId: 4,
    stakingToken: bscTestnetTokens.cake2,
    earningToken: bscTestnetTokens.msix,
    contractAddress: {
      97: '0xcEbF4Bd7b40b224b793B70E7c71Fa3A009209625',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '100000000',
  },
  {
    sousId: 5,
    stakingToken: bscTestnetTokens.msix,
    earningToken: bscTestnetTokens.cake2,
    contractAddress: {
      97: '0xf45c9e61318006Dc31CA4993b8ab75E611fe0792',
    },
    poolCategory: PoolCategory.CORE,
    tokenPerSecond: '0.0001',
  },
].map((p) => ({
  ...p,
  stakingToken: p.stakingToken.serialize,
  earningToken: p.earningToken.serialize,
}))

// known finished pools
export const finishedPools: SerializedPool[] = []

export const pools: SerializedPool[] = [...livePools, ...finishedPools]