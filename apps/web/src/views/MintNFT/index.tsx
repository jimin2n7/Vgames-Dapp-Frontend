import { Box, Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import QuantityInputModal from 'components/QuantityInputModal'
import { CardWrapper, RoundedImage } from './styles'

const MintNFT = () => {
  const [onPresentQuantityInputModal] = useModal(<QuantityInputModal title="Quantity" />)

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
              <Button width="100%" onClick={onPresentQuantityInputModal}>
                Mint NFT
              </Button>
            </Box>
          </CardBody>
        </CardWrapper>
      </Flex>
    </Page>
  )
}

export default MintNFT
