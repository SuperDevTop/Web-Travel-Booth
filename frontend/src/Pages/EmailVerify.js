import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Image,
  } from "@chakra-ui/react";
import { useEffect } from "react";
import { EmailVerifyComponent } from "../components/Authentication/EmailVerifyComponent";
import logo from '../assets/logo.png';

const EmailVerify = () => {
    useEffect(() => {
        const header = document.getElementById('header');
       
          document.getElementById('mySidebar').style.display="none";
          document.getElementById('AdminSidebar').style.display="none";
          header.classList.remove("d-flex");
          header.classList.add("hide");
          document.getElementsByClassName("footer")[0].style.display = "none";
       
      }, []);
    
      return (
        <Container maxW="xl" centerContent>
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize="5xl" fontFamily="Work sans" fontWeight="bold" color="White" >
              Travelbooth
            </Text>        
          </Box>
          <Image src={logo} alt="logo" w="200px" h="200px" />
          <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
            <Tabs isFitted variant="soft-rounded">
              <TabList mb="1em">
                <Tab>Email Verify</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <EmailVerifyComponent />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      );
}

export default EmailVerify