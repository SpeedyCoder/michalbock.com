import * as React from "react"
import {Box, Center, Grid, Heading, List, ListItem, Link, Text, HStack} from "@chakra-ui/react"

export const Posts = () => (
    <Center>
        <Grid>
            <Heading as='h1' textAlign='left' mt={10} mb={5}>Posts</Heading>
            <Box>
                <List>
                    <PostLink
                        date='November 8, 2021'
                        href='https://medium.com/@michal.bock/software-engineering-interviews-in-2021-37b644253527'
                        text='Software Engineering Interviews in 2021'
                    />
                    <PostLink
                        date='August 30, 2019'
                        href='https://medium.com/swlh/managing-groups-of-gorutines-in-go-ee7523e3eaca'
                        text='Managing Groups of Goroutines in Go'
                    />
                    <PostLink
                        date='October 10, 2018'
                        href='https://medium.com/@michal.bock/deploy-certificate-authority-service-on-kubernetes-21853c152ade'
                        text='Deploying Certificate Authority Service on Kubernetes'
                    />
                    <PostLink
                        date='May 14, 2018'
                        href='https://medium.com/@michal.bock/fix-weird-exceptions-when-running-django-tests-f58def71b59a'
                        text='Fix weird exceptions when running Django tests'
                    />
                </List>
            </Box>
        </Grid>
    </Center>
)

type linkData = {
    date: string;
    href: string;
    text: string;
}

function PostLink({date, href, text}: linkData) {
    return (
        <ListItem>
            <HStack justifyContent='space-between'>
                <Text fontSize='xl'>{date}</Text>
                <Link href={href} fontSize='xl'>
                    <b>{text}</b>
                </Link>
            </HStack>
        </ListItem>
    )
}