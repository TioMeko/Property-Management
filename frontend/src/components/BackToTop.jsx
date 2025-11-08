import { useState, useEffect } from 'react'
import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { ArrowUp } from 'lucide-react'
import { Icon } from '@chakra-ui/react'

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const bgColor = useColorModeValue('brand.500', 'brand.400')
  const hoverBgColor = useColorModeValue('brand.600', 'brand.300')

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <IconButton
      aria-label="Back to top"
      icon={<Icon as={ArrowUp} boxSize={5} />}
      onClick={scrollToTop}
      position="fixed"
      bottom={8}
      right={8}
      zIndex={1000}
      size="lg"
      colorScheme="brand"
      borderRadius="full"
      boxShadow="lg"
      bg={bgColor}
      color="white"
      _hover={{
        bg: hoverBgColor,
        transform: 'translateY(-2px)',
        boxShadow: 'xl',
      }}
      transition="all 0.3s ease"
    />
  )
}

export default BackToTop

