import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";


export const EmailVerifyComponent = () => {
    const toast = useToast();
    const history = useHistory();
    const {id: _id} = useParams();

   
    const submitHandler = async () => {
        try {
            const config = {
              headers: {
                "Content-type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/user/emailverify",
              {
                emailVerify:1,
                _id,
              },
              config
            );
            console.log(data);
            toast({
              title: "Registration Successfully.",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            
            history.push("/");
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: error.response.data.message,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
    }
  return (
    <VStack spacing="10px">
        
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={loading}
      >
        Ok
      </Button>
      {/* <Link href="/">Forget Password</Link> */}
    </VStack>
  )
}
