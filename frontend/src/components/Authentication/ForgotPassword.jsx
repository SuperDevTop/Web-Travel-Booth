import { useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  const [emailer, setEmailer] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  useEffect(() => {
    // const header = document.getElementById("header");
    const sidebar = document.getElementById("mySidebar");
    const AdminSidebar = document.getElementById("AdminSidebar");
    const footer = document.getElementsByClassName("footer")[0];
    // if (header) {
    //   header.classList.add("hide");
    //   header.classList.remove("d-flex");
    //   sidebar.classList.add("hide");
    //   AdminSidebar.classList.add("hide");
    //   footer.classList.add("hide");
    // }
  },[]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        // setMessage("");
        // setError("");
        const res = await axios.post("/api/user/forgotPassword", {email: emailer})
        console.log("res",res);
        // setMessage(res.data.message);
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
        // setError(error.response.data.error)
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
          value={emailer}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmailer(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Reset
      </Button>
      <Link to="/" >Back To Login</Link>
      {/* <p onClick={() => setStatus(!status)} >Back To Login</p> */}
    </VStack>
  )
}

export default ForgotPassword