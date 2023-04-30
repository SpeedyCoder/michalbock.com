import * as React from 'react'
import {Box, Center, Flex, Heading, Link, Stack} from '@chakra-ui/react'
import {ColorModeSwitcher} from './ColorModeSwitcher'
import {Link as RouteLink} from 'react-router-dom'

export const Navigation :React.FC = () => (
    <Box textAlign="center">
        <Flex h={16} alignItems='center' justifyContent='space-around'>
            <Link as={RouteLink} to='/'><Heading size='lg' fontSize='20px'>MICHALBOCK.COM</Heading></Link>

            <Flex alignItems={'center'}>
                <Stack direction={'row'} spacing={7}>
                    <Center>
                        <Link as={RouteLink} to='/posts'><b>Blog</b></Link>
                    </Center>
                    <Center>
                        <Link as={RouteLink} to='/about'><b>About</b></Link>
                    </Center>
                    <ColorModeSwitcher></ColorModeSwitcher>
                </Stack>
            </Flex>
        </Flex>
    </Box>
)
