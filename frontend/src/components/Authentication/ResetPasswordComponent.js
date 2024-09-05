import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";

const ResetPasswordComponent = () => {
  const { id: resetToken } = useParams();
  // console.log("SDfsdf", resetToken)
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");

  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      // setError("Passwords do not match");
      toast({
        title: "Error Occured!",
        description: "Passwords do not match",
        status: "error",
        isClosable: true,
        position: "bottom",
      });
    } else {
      try {
        setLoading(true);
        // setMessage("");
        // setError("");
        const res = await axios.post("/resetpassword/resetpassword", {
          password: newPassword,
          resetToken,
        });
        console.log(res);
        // setMessage(res.data.message);
        // console.log(res.data.message);
        toast({
          title: "Success",
          description: res.data.message,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        // setError(error.response.data.message);
        console.log(error);
        console.log(error.response.data.message);
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          isClosable: true,
          position: "bottom",
        });
      } finally {
        setLoading(false);
        history.push("/");
      }
    }
  };

  return (
    <VStack spacing="10px">
      <FormControl id="newPassword" isRequired>
        <FormLabel>New Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter confirmpassword"
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
        Reset Password
      </Button>
      {/* <Link href="/">Forget Password</Link> */}
    </VStack>
  );
};

export default ResetPasswordComponent;
