import { Button } from "@chakra-ui/button";
import { VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const EmailReverifyComponent = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    // console.log("test")
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post("/api/user/emailreverify", {email})
        console.log("res",res);
        console.log(res.data.message);
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
    } catch (error) {
        console.log("err",error);
        console.log(error.response.data.message);
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          isClosable: true,
          position: "bottom",
        });
    }finally{
      setLoading(false);
    }
}
    return (
        <VStack spacing="10px">

            <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
                isLoading={loading}
            >
                Email Verify
            </Button>

        </VStack>
    )
}

export default EmailReverifyComponent