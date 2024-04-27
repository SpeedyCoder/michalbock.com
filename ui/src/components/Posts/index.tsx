import * as React from "react"
import {Box, Center, Grid, Heading, List, ListItem, Link, Text, HStack} from "@chakra-ui/react"
import {BlogPostNode} from "../../generated/hypertune";
import useHypertune from "../../useHypertune";

export function Posts() {
    const flags = useHypertune();

    return (
        <Center>
            <Grid>
                <Heading as='h1' textAlign='left' mt={10} mb={5}>Posts</Heading>
                <Box>
                    <List>{flags.posts({}).map((postNode, index) => (
                        <PostLink key={index} postNode={postNode}/>
                    ))}</List>
                </Box>
            </Grid>
        </Center>
    )
}

function PostLink({postNode}: {
    postNode: BlogPostNode
}) {
    return (
        <ListItem>
            <HStack justifyContent='space-between'>
                <Text fontSize='xl'>{postNode.date({fallback: ''})}</Text>
                <Link href={postNode.link({fallback: ''})} fontSize='xl'>
                    <b>{postNode.text({fallback: ''})}</b>
                </Link>
            </HStack>
        </ListItem>
    )
}