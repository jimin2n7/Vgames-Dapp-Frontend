import { Box, CardBody, Flex, Text } from '@pancakeswap/uikit'
import { RoundedImage } from './styles'

const CollectibleCardBody = ({ nft }) => {
  return (
    <CardBody p="8px">
      <RoundedImage>
        <img
          src={
            nft?.collection?.logo
              ? nft?.collection?.logo
              : 'https://play-lh.googleusercontent.com/6gZqHzIlHgkJ8qZWInWukwD27cPF5ZlbQAZnHbksnfuBA1bu7xuFzGG5CADnfLHh1A'
          }
          alt="nft"
        />
      </RoundedImage>
      <Flex alignItems="center" justifyContent="space-between">
        {nft?.name && (
          <Text fontSize="12px" color="textSubtle" mb="8px">
            {nft?.name}
          </Text>
        )}
      </Flex>
      <Text as="h4" fontWeight="600" mb="8px">
        {nft?.name}
      </Text>
      <Box borderTop="1px solid" borderTopColor="cardBorder" pt="8px">
        <Flex alignItems="center" justifyContent="flex-end">
          <Text as="h4" fontWeight="500" mb="8px">
            {`#${nft?.token_id}`}
          </Text>
        </Flex>
      </Box>
    </CardBody>
  )
}

export default CollectibleCardBody
