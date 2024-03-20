/* eslint-disable react/no-array-index-key */
import { BalanceInput, Button, Modal, ModalProps } from '@pancakeswap/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { useNftVgamesContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import { useEffect, useRef, useState } from 'react'
import { useAccount } from 'wagmi'

interface QuantityInputModalProps extends ModalProps {
  onDismiss?: () => void
  title
}

const QuantityInputModal: React.FC<React.PropsWithChildren<QuantityInputModalProps>> = ({ onDismiss, title }) => {
  const { theme } = useTheme()
  const [quantity, setQuantity] = useState<string>('')
  const nftVgamesContract = useNftVgamesContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: isLoading } = useCatchTxError()
  const { address: account } = useAccount()

  const balanceInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (balanceInputRef?.current) {
      balanceInputRef.current.focus()
    }
  }, [])

  const handleMintConfirm = async (quant: string) => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(nftVgamesContract, 'mint', [account, quant, []])
    })
    onDismiss?.()
  }

  const handleChangeInput = (input: string) => {
    if (input) {
      setQuantity(input)
    } else {
      setQuantity('')
    }
  }

  return (
    <Modal title={title} onDismiss={onDismiss} headerBackground={theme.colors.gradientCardHeader}>
      <BalanceInput innerRef={balanceInputRef} placeholder="0" value={quantity} onUserInput={handleChangeInput} />
      <Button
        mt="8px"
        isLoading={isLoading}
        disabled={parseInt(quantity) <= 0 || quantity === ''}
        onClick={() => handleMintConfirm(quantity)}
      >
        Confirm
      </Button>
    </Modal>
  )
}

export default QuantityInputModal
