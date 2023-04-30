import * as React from "react"
import {Center, chakra, Heading, HStack, Icon, Link, VStack} from "@chakra-ui/react"
import michal from './michal.jpg'
import {FaGithub, FaLinkedin, FaMediumM, FaTwitter} from 'react-icons/fa'


export const Home: React.FC = () => (
    <Center h={'100%'}>
        <VStack spacing={4}>
            <chakra.img
                src={michal}
                borderRadius='full'
                boxSize='200px'
            />
            <Heading color="grey.900" as='h2' size='xl'>Michal Bock</Heading>
            <Heading color="grey.900" as='h3' size='md'>Software Engineer</Heading>
            <HStack spacing={3}>
                <SocialLink url="https://github.com/SpeedyCoder/" icon={FaGithub}></SocialLink>
                <SocialLink url="https://linkedin.com/in/michalbock/"
                            icon={FaLinkedin}></SocialLink>
                <SocialLink url="https://medium.com/@michal.bock" icon={FaMediumM}></SocialLink>
                <SocialLink url="https://twitter.com/michal_bock" icon={FaTwitter}></SocialLink>
            </HStack>
        </VStack>
    </Center>
)

type linkData = {
    url: string;
    icon?: React.ElementType;
}

function SocialLink({url, icon}: linkData) {
    return (
        <Link
            color="grey.900"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Icon as={icon} boxSize={9}/>
        </Link>
    )
}
