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
// import { useHistory } from "react-router";
import ResetPasswordComponent from '../components/Authentication/ResetPasswordComponent'
import logo from '../assets/logo.png';
  
  function ResetPassword() {
    // const history = useHistory();
    console.log(document.getElementsByClassName("footer"))
    useEffect(() => {
      // const user = JSON.parse(localStorage.getItem("userInfo"));
      const header = document.getElementById('header');
      // if (user){
      //   if(user.isAdmin === true){
      //     document.getElementById('AdminSidebar').style.display="none";
      //     document.getElementById('mySidebar').style.display="none";
      //     header.classList.remove("d-flex");
      //     header.classList.add("hide");
      //     document.getElementsByClassName("footer")[0].style.display = "none";
      //   }
      //   else{
      //     document.getElementById('mySidebar').style.display="none";
      //     document.getElementById('AdminSidebar').style.display="none";
      //     header.classList.remove("d-flex");
      //     header.classList.add("hide");
      //     document.getElementsByClassName("footer")[0].style.display = "none";
      //   }
      // }
      // else{
        document.getElementById('mySidebar').style.display="none";
        document.getElementById('AdminSidebar').style.display="none";
        header.classList.remove("d-flex");
        header.classList.add("hide");
        document.getElementsByClassName("footer")[0].style.display = "none";
      // }
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
              <Tab>Reset Password</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ResetPasswordComponent />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    );
  }
  
  export default ResetPassword;
  