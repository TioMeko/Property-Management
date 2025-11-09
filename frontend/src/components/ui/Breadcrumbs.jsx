import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
} from '@chakra-ui/react'
import { ChevronRight, Home } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import React from 'react'

const Breadcrumbs = ({ items = [] }) => {
  return (
    <Breadcrumb
      spacing={2}
      separator={<Icon as={ChevronRight} boxSize={4} color="gray.400" />}
      fontSize="sm"
      color="gray.600"
      _dark={{ color: 'gray.400' }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <BreadcrumbItem key={index} isCurrentPage={isLast}>
            {item.href ? (
              <BreadcrumbLink
                as={RouterLink}
                to={item.href}
                display="flex"
                alignItems="center"
                gap={2}
                color={isLast ? 'gray.900' : 'gray.600'}
                fontWeight={isLast ? 'semibold' : 'normal'}
                _hover={{
                  color: isLast ? 'gray.900' : 'brand.500',
                  textDecoration: 'none',
                }}
                _dark={{
                  color: isLast ? 'gray.100' : 'gray.400',
                  _hover: {
                    color: isLast ? 'gray.100' : 'brand.300',
                  },
                }}
              >
                {item.icon && <Icon as={item.icon} boxSize={4} />}
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbLink
                display="flex"
                alignItems="center"
                gap={2}
                color="gray.900"
                fontWeight="semibold"
                cursor="default"
                _dark={{ color: 'gray.100' }}
              >
                {item.icon && <Icon as={item.icon} boxSize={4} />}
                {item.label}
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs

