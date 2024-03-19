import { Box, Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import QuantityInputModal from 'components/QuantityInputModal'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNftVgamesContract } from 'hooks/useContract'
import { useAccount } from 'wagmi'
import { CardWrapper, RoundedImage } from './styles'

const MintNFT = () => {
  const nftVgamesContract = useNftVgamesContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const { address: account } = useAccount()

  const handleMintConfirm = async (quantity: string) => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nftVgamesContract, 'mint', [
        account,
        quantity,
        ['0x0000000000000000000000000000000000000000000000000000000000000000'],
      ])
    })
  }

  const [onPresentQuantityInputModal] = useModal(
    <QuantityInputModal mintConfirmCallback={handleMintConfirm} title="Quantity" />,
  )

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
