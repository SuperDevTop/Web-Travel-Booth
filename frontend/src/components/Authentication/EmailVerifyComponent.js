import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";


export const EmailVerifyComponent = () => {
    const toast = useToast();
    const history = useHistory();
    const {id: _id} = useParams();
    const [code, setCode] = useState();

   
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
                emailVerifyCode: code,
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
        <FormControl id="first-name" isRequired>
        <FormLabel>Email Verify Code</FormLabel>
        <Input
          placeholder="Enter Your verify code"
          onChange={(e) => setCode(e.target.value)}
        />
      </FormControl>
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
