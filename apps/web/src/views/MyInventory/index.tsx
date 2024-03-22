import {
  AutoRenewIcon,
  BunnyPlaceholderIcon,
  Button,
  Card,
  Flex,
  Grid,
  ProfileAvatar,
  Table,
  Td,
  Text,
  Th,
  ToggleView,
} from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useEffect, useState } from 'react'
import { ViewMode } from 'state/user/actions'
import { styled } from 'styled-components'
import { useAccount } from 'wagmi'
import { MORALIS_API_KEY, MORALIS_BASEURL } from '../../config/moralis'
import NftCard from './components/NftCard'

export const ITEMS_PER_PAGE = 8

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  &:hover {
    cursor: pointer;
  }
`
interface NFT {
  token_id: string
  name: string
  collection_logo: string
  contract_type: string
  owner_of: string
  cursor: string
}

const MyInventory = () => {
  const { address, isConnected } = useAccount()
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const [nextCursorVal, setNextCursorVal] = useState(null)
  const [nftList, setNftList] = useState<NFT[]>([])
  const [isFetchingNfts, setIsFetchingNfts] = useState(false)

  const fetchNFTs = async (myAddress, cursor) => {
    try {
      const res = await fetch(
        `${MORALIS_BASEURL}/${myAddress}/nft?chain=bsc%20testnet&format=decimal&limit=8&exclude_spam=false&token_addresses=0xF2e5482c230cb62b1363039E4128a8f2A7Ce8f5D${
          cursor ? `&cursor=${cursor}` : `&cursor=null`
        }&normalizeMetadata=false&media_items=false`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-Key': `${MORALIS_API_KEY}`,
          },
        },
      )
      const response = await res.json()

      setNextCursorVal(response.cursor)
      const sortResponse = response.result.sort((a, b) => parseInt(b.token_id) - parseInt(a.token_id))

      setNftList([...nftList, ...sortResponse])
      setIsFetchingNfts(false)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs(address, null)
    }
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs(address, null)
    } else {
      setNftList([])
    }
  }, [address, isConnected])

  const handleLoadMore = async () => {
    if (isConnected && address) {
      setIsFetchingNfts(true)
      await fetchNFTs(address, nextCursorVal)
    }
  }

  return (
    <Page>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        pr={[null, null, '4px']}
        pl={['4px', null, '0']}
        mb="8px"
      >
        <ToggleView idPrefix="clickMyInventory" viewMode={viewMode} onToggle={setViewMode} />
      </Flex>
      {/* {nftList && (
        <Flex p="16px">
          <Text bold>{nftList.length} Result</Text>
        </Flex>
      )} */}

      {viewMode === ViewMode.TABLE ? (
        <Card style={{ overflowX: 'auto' }} mb="32px">
          <Table>
            <thead>
              <tr>
                <Th textAlign="left" style={{ cursor: 'pointer' }}>
                  Item
                </Th>
                <Th textAlign="left" style={{ cursor: 'pointer' }}>
                  Token ID
                </Th>
                <Th textAlign="left" style={{ cursor: 'pointer' }}>
                  Token Standard
                </Th>
                <Th textAlign="left" style={{ cursor: 'pointer' }}>
                  Owner
                </Th>
              </tr>
            </thead>
            {nftList.length > 0 ? (
              <tbody>
                {nftList.map((nft) => {
                  return (
                    <tr key={nft?.token_id} data-test="nft-item-row">
                      <Td style={{ cursor: 'pointer', minWidth: '200px' }}>
                        <Flex alignItems="center">
                          <ProfileAvatar
                            src={
                              nft?.collection_logo
                                ? nft?.collection_logo
                                : 'https://play-lh.googleusercontent.com/6gZqHzIlHgkJ8qZWInWukwD27cPF5ZlbQAZnHbksnfuBA1bu7xuFzGG5CADnfLHh1A'
                            }
                            width={48}
                            height={48}
                            mr="16px"
                          />
                          {nft?.name}
                        </Flex>
                      </Td>
                      <Td>
                        <Flex alignItems="center">{nft?.token_id}</Flex>
                      </Td>
                      <Td>{nft?.contract_type}</Td>
                      <Td>{nft?.owner_of}</Td>
                    </tr>
                  )
                })}
              </tbody>
            ) : null}
          </Table>
          {nftList.length <= 0 && (
            <Flex flexDirection="column" mt="32px" mb="32px">
              <BunnyPlaceholderIcon width={80} height={80} margin="auto" />
              <Text bold mb="8px" textAlign="center">
                You have no NFT
              </Text>
            </Flex>
          )}
        </Card>
      ) : nftList.length <= 0 ? (
        <Flex flexDirection="column" mt="32px" mb="32px">
          <BunnyPlaceholderIcon width={80} height={80} margin="auto" />
          <Text bold mb="8px" textAlign="center">
            You have no NFT
          </Text>
        </Flex>
      ) : (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
          mb="32px"
          data-test="nft-collection-row"
        >
          {nftList.length > 0
            ? nftList.map((nft) => {
                return <NftCard key={nft?.token_id} nft={nft} data-test="nft" />
              })
            : null}
        </Grid>
      )}
      {nextCursorVal ? (
        <PageButtons>
          <Button
            onClick={handleLoadMore}
            disabled={isFetchingNfts}
            endIcon={isFetchingNfts ? <AutoRenewIcon spin color="currentColor" /> : undefined}
          >
            {isFetchingNfts ? 'Loading' : 'Load more'}
          </Button>
        </PageButtons>
      ) : null}
    </Page>
  )
}

export default MyInventory
