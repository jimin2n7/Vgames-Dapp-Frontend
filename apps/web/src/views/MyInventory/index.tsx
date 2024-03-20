import {
  ArrowBackIcon,
  ArrowForwardIcon,
  BunnyPlaceholderIcon,
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

const MyInventory = () => {
  const { address, isConnected } = useAccount()
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [nftList, setNftList] = useState([])

  const fetchNFTs = async (myAddress) => {
    try {
      const res = await fetch(
        `${MORALIS_BASEURL}/${myAddress}/nft?chain=bsc%20testnet&format=decimal&exclude_spam=false&token_addresses=0xF2e5482c230cb62b1363039E4128a8f2A7Ce8f5D&normalizeMetadata=false&media_items=false`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'X-API-Key': `${MORALIS_API_KEY}`,
          },
        },
      )
      const response = await res.json()
      setNftList(response.result.sort((a, b) => parseInt(b.token_id) - parseInt(a.token_id)))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs(address)
    }
  }, [])

  useEffect(() => {
    if (isConnected && address) {
      fetchNFTs(address)
    } else {
      setNftList([])
    }
  }, [address, isConnected])

  useEffect(() => {
    let extraPages = 1
    if (nftList) {
      if (nftList.length % ITEMS_PER_PAGE === 0) {
        extraPages = 0
      }
      setMaxPage(Math.max(Math.floor(nftList.length / ITEMS_PER_PAGE) + extraPages, 1))
    }
  }, [nftList])

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
      {nftList && (
        <Flex p="16px">
          <Text bold>{nftList.length} Result</Text>
        </Flex>
      )}

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
                {nftList
                  .map((nft) => {
                    return (
                      <tr key={nft.token_id} data-test="nft-item-row">
                        <Td style={{ cursor: 'pointer', minWidth: '200px' }}>
                          <Flex alignItems="center">
                            <ProfileAvatar
                              src={
                                nft?.collection?.logo
                                  ? nft?.collection?.logo
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
                  })
                  .slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE)}
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
            ? nftList.slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE).map((nft) => {
                return <NftCard key={nft.token_id} nft={nft} data-test="nft" />
              })
            : null}
        </Grid>
      )}
      {nftList.length > 0 ? (
        <PageButtons>
          <Arrow
            onClick={() => {
              setPage(page === 1 ? page : page - 1)
            }}
          >
            <ArrowBackIcon color={page === 1 ? 'textDisabled' : 'primary'} />
          </Arrow>
          <Text>{`Page ${page} of ${maxPage}`}</Text>
          <Arrow
            onClick={() => {
              setPage(page === maxPage ? page : page + 1)
            }}
          >
            <ArrowForwardIcon color={page === maxPage ? 'textDisabled' : 'primary'} />
          </Arrow>
        </PageButtons>
      ) : null}
    </Page>
  )
}

export default MyInventory
