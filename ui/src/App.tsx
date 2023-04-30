import * as React from "react"
import {
    Box,
    ChakraProvider,
    extendTheme,
    Grid,
    GridItem,
    Heading,
    Text,
} from "@chakra-ui/react"
import {Navigation} from "./components/Navigation"
import {Home} from "./components/Home"

const theme = extendTheme({
    fonts: {
        heading: `'Lato,Helvetica', sans-serif`,
        body: `'Lato,Helvetica', sans-serif`,
    },
})

export const App = () => (
    <ChakraProvider theme={theme}>
        <Box textAlign="center">
            <Grid minH="100vh"
                  p={3}
                  templateAreas={`"header"
                  "main"
                  "footer"`}
                  gridTemplateRows={'50px 1fr 20px'}
            >
                <GridItem area={'header'}><Navigation></Navigation></GridItem>
                <GridItem area={'main'}><Home></Home></GridItem>
                <GridItem area={'footer'}>
                    <Heading as='h6' size='xs' color="grey.900">
                        &copy; {new Date().getFullYear()} &middot; Michal Bock &middot; All rights reserved.
                    </Heading>
                </GridItem>
            </Grid>
        </Box>
    </ChakraProvider>
)
