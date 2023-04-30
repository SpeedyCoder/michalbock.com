import * as React from 'react'
import {Box, Flex, Heading, Link, Stack} from '@chakra-ui/react'
import {ColorModeSwitcher} from './ColorModeSwitcher'

export const Navigation :React.FC = () => (
    <Box textAlign="center">
        <Flex h={16} alignItems='center' justifyContent='space-around'>
            <Link _hover={{color: 'blue.500'}} href='/ui/public'><Heading size='lg' fontSize='20px'>MICHALBOCK.COM</Heading></Link>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <ColorModeSwitcher></ColorModeSwitcher>
                </Stack>
            </Flex>
        </Flex>
    </Box>
)
