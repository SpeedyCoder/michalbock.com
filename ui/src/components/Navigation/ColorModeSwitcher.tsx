import * as React from "react"
import {IconButtonProps, MenuItem, useColorMode, useColorModeValue,} from "@chakra-ui/react"
import {FaMoon, FaSun} from "react-icons/fa"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
    const {toggleColorMode} = useColorMode()
    const text = useColorModeValue("Dark", "Light")
    const SwitchIcon = useColorModeValue(FaMoon, FaSun)

    return (
        <MenuItem
            size="md"
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={<SwitchIcon/>}
            aria-label={`Switch to ${text} mode`}
            {...props}
        >{`${text} Mode`}</MenuItem>
    )
}
