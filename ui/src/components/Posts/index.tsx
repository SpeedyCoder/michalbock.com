import * as React from "react"
import {Box, Center, Grid, Heading, List, ListItem, Link, Text, HStack} from "@chakra-ui/react"
import {RootNode, BlogPostNode} from "../../generated/generated";

type PostsProps = {
    flags: RootNode
}

export function Posts({flags}: PostsProps) {
    return (
        <Center>
            <Grid>
                <Heading as='h1' textAlign='left' mt={10} mb={5}>Posts</Heading>
                <Box>
                    <List>{flags.posts({}).map((post, index) => (
                        <PostLink key={index} post={post}/>
                    ))}</List>
                </Box>
            </Grid>
        </Center>
    )
}

type PostLinkProps = {
    post: BlogPostNode
}


function PostLink({post}: PostLinkProps) {
    return (
        <ListItem>
            <HStack justifyContent='space-between'>
                <Text fontSize='xl'>{post.date({}).get('')}</Text>
                <Link href={post.link({}).get('')} fontSize='xl'>
                    <b>{post.text({}).get('')}</b>
                </Link>
            </HStack>
        </ListItem>
    )
}