import * as React from "react"
import {Box, Center, ChakraProvider, Grid, GridItem, Heading,} from "@chakra-ui/react"
import {Navigation} from "./components/Navigation"
import {theme} from "./theme";
import {Routes} from "./routes";
import useHypertune from "./useHypertune";

export function App(){
    const flags = useHypertune();

    return (
        <ChakraProvider theme={theme}>
            <Box textAlign="center">
                <Grid minH="100vh"
                      p={3}
                      templateAreas={`"header"
                  "main"
                  "footer"`}
                      gridTemplateRows={'60px 1fr 20px'}
                >
                    <GridItem area={'header'}>
                        <Navigation/>
                    </GridItem>
                    <GridItem area={'main'}>
                        <Routes flags={flags} />
                    </GridItem>
                    <GridItem area={'footer'}>
                        <Heading as='h6' size='xs' color="grey.900">
                            &copy; {new Date().getFullYear()} &middot; Michal Bock &middot; All rights reserved.
                        </Heading>
                    </GridItem>
                </Grid>
            </Box>
        </ChakraProvider>
    )
}
