import * as React from 'react'
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack
} from '@chakra-ui/react'
import {ColorModeSwitcher} from './ColorModeSwitcher'
import {Link as RouteLink} from 'react-router-dom'
import {FaBars} from "react-icons/fa"
import {RootNode} from "../../generated/project_2610";

type NavigationProps = {
    flags: RootNode
}

export function Navigation({flags}: NavigationProps) {
    const enableExample = flags.exampleFlag({}).get(false);

    return (
        <Box textAlign="center">
            <Flex h={16} alignItems='center' justifyContent='space-around'>
                <Link as={RouteLink} to='/'><Heading size='lg' fontSize='20px'>MICHALBOCK.COM</Heading></Link>

                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={7}>
                        <Menu placement='bottom-end'>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<FaBars/>}
                                variant='outline'
                            />
                            <MenuList>
                                <MenuItem as={RouteLink} to='/posts'>
                                    Blog
                                </MenuItem>
                                <MenuItem as={RouteLink} to='/about'>
                                    About
                                </MenuItem>
                                {enableExample && (
                                    <MenuItem as={RouteLink} to='/about'>
                                        Example
                                    </MenuItem>
                                )}
                                <MenuDivider/>
                                <ColorModeSwitcher/>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    )
}
