import {
  ArrowBackIcon,
  ArrowForwardIcon,
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
import CollectionCardWithVolume from 'views/Nft/market/components/CollectibleCard/CollectionCardWithVolume'
import nfts from './nfts'

export const ITEMS_PER_PAGE = 9

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
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [nftList, setNftList] = useState(nfts)

  useEffect(() => {
    setNftList(nfts)
  }, [nftList])

  useEffect(() => {
    let extraPages = 1
    if (nftList.length % ITEMS_PER_PAGE === 0) {
      extraPages = 0
    }
    setMaxPage(Math.max(Math.floor(nftList.length / ITEMS_PER_PAGE) + extraPages, 1))
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
                  Contract Address
                </Th>
              </tr>
            </thead>
            <tbody>
              {nftList
                ? nftList
                    .map((nft) => {
                      return (
                        <tr key={nft.tokenID} data-test="nft-item-row">
                          <Td style={{ cursor: 'pointer', minWidth: '200px' }}>
                            <Flex alignItems="center">
                              <ProfileAvatar src={nft.avatar} width={48} height={48} mr="16px" />
                              {nft.name}
                            </Flex>
                          </Td>
                          <Td>
                            <Flex alignItems="center">{nft.tokenID}</Flex>
                          </Td>
                          <Td>{nft.tokenStandard}</Td>
                          <Td>{nft.address}</Td>
                        </tr>
                      )
                    })
                    .slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE)
                : null}
            </tbody>
          </Table>
        </Card>
      ) : (
        <Grid
          gridGap="16px"
          gridTemplateColumns={['1fr', '1fr', 'repeat(2, 1fr)', 'repeat(3, 1fr)']}
          mb="32px"
          data-test="nft-collection-row"
        >
          {nftList.slice(ITEMS_PER_PAGE * (page - 1), page * ITEMS_PER_PAGE).map((nft) => {
            return (
              <CollectionCardWithVolume
                key={nft.tokenID}
                bgSrc={nft.avatar}
                avatarSrc={nft.avatar}
                collectionName={nft.name}
                url={`/collections/${nft.address}`}
                volume={0}
              />
            )
          })}
        </Grid>
      )}
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
    </Page>
  )
}

export default MyInventory
