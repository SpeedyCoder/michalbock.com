import {extendTheme, defineStyleConfig} from "@chakra-ui/react"

export const linkTheme = defineStyleConfig({
    baseStyle: {
        _hover: {
            textDecoration: 'underline',
            color: 'blue.500',
        }
    },
})

export const theme = extendTheme({
    fonts: {
        heading: `'Lato,Helvetica', sans-serif`,
        body: `'Lato,Helvetica', sans-serif`,
    },
    components: {
        Link: linkTheme,
    }
})