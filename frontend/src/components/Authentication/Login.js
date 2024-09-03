import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast, Link } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [emailer, setEmailer] = useState("");
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      if (data.isAdmin === true) history.push("/admin/dashboard");
      else history.push("/capture");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
 console.log(emailer);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        setMessage("");
        setError("");
        const res = await axios.post("api/user/forgotPassword", {email: emailer})
        console.log("res",res);
        setMessage(res.data.message);
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
        setError(error.response.data.error)
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
      {status === false ? (
        <>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              value={email}
              type="email"
              placeholder="Enter Your Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
          >
            Login
          </Button>
          <Link onClick={() => setStatus(!status)}>Forget Password</Link>
          {/* <Link href='resetPassword/536aa0c624ea4c2d0b998b8049b05ab32d97038d'>reset</Link> */}
        </>
      ) : (
        <>
          <FormControl id="emailer" isRequired>
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
          <Link onClick={() => setStatus(!status)} >Back To Login</Link>
        </>
      )}
    </VStack>
  );
};

export default Login;
