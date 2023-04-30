import * as React from "react"
import {Center, Grid, Heading, Link, Text, VStack} from "@chakra-ui/react"


export const About = () => (
    <Center>
        <Grid fontSize='lg' textAlign='left' w='60%'>
            <Heading as='h1' mt={10} mb={5}>About Me</Heading>
            <Text mb={5}>
                I’m a software engineer currently working at
                <Link ml={1} color='blue.500' href="https://deliveroo.co.uk">Deliveroo</Link>.
            </Text>
            <Text mb={5}>
                I’ve previously worked at
                <Link ml={1} color='blue.500' href="https://uw.co.uk">Utility Warehouse</Link>,
                where I spent most of my time
                building micro-services in
                <Link ml={1} mr={1} color='blue.500' href="https://golang.org">go</Link>using
                <Link ml={1} mr={1} color='blue.500' href="https://grpc.io">gRPC</Link>and
                <Link ml={1} mr={1} color='blue.500' href="https://developers.google.com/protocol-buffers">Protobuf</Link>
                and deploying them on
                <Link ml={1} color='blue.500' href="https://kubernetes.io">Kubernetes</Link>.
                During my time there I’ve also worked on tools like
                <Link ml={1} mr={1} color='blue.500' href="https://github.com/uw-labs/substrate">Substrate</Link> and
                <Link ml={1} mr={1} color='blue.500' href="https://github.com/uw-labs/proximo">Proximo</Link>
                that provide a simple abstraction for interacting with message streaming systems like
                <Link ml={1} color='blue.500' href="https://kafka.apache.org">Kafka</Link> and
                <Link ml={1} color='blue.500' href="https://nats.io">NATS streaming</Link>.</Text>
            <Text mb={5}>
                Every now and then I write a blog post on
                <Link ml={1} mr={1} color='blue.500' href="https://medium.com/@michal.bock">Medium</Link>
                about the stuff I’m currently working on,
                though I might start adding posts here instead.
            </Text>
            <Text mb={5}>
                I’ve got a masters degree in Mathematics and Computer Science from Oxford, where I also did a bit
                of rowing and kickboxing, though not really doing any of those anymore.
            </Text>
        </Grid>
    </Center>
)