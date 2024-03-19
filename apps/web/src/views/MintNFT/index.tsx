import Page from 'components/Layout/Page'
import { Flex, Text, CardBody, Card, Box, Button } from '@pancakeswap/uikit'
import { AppBody } from 'components/App'
import { RoundedImage, CardWrapper } from './styles'

const MintNFT = () => {
  return (
    <Page>
      <Flex justifyContent="center" alignItems="flex-start">
        <CardWrapper>
          <CardBody>
            <RoundedImage
              width={320}
              height={320}
              src="https://storage.googleapis.com/cdn.heroestd.io/Images/Box_Rare.png"
              alt="mint nft"
            />
            <Box mt="20px">
              <Button width="100%">Mint NFT</Button>
            </Box>
          </CardBody>
        </CardWrapper>
      </Flex>
    </Page>
  )
}

export default MintNFT
