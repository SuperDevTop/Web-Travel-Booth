import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { useParams } from 'react-router-dom';
import Loader from "../../Loader";
import { Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserEdit = () => {
    const { id } = useParams();
    console.log("id",id)
    const [profile, setProfile] = useState([]);
    const [name, setName] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastname] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [pic, setPic] = useState();
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (user) {
            if (user.isAdmin === true) {
                document.getElementById("mySidebar").style.display = "none";
                document.getElementById("AdminSidebar").style.display = "block";
            } else {
                document.getElementById("mySidebar").style.display = "block";
                document.getElementById("AdminSidebar").style.display = "none";
            }
        }
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const getUserById = async () => {
            const { data } = await axios.get(`/api/user/${id}`, config);
            setProfile(data);
            setName(data.name);
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setEmail(data.email);
            setPhone(data.phone);
            console.log(profile)
        };
        getUserById();

        if (profile) {
            setName(profile.name);
            setFirstname(profile.firstname);
            setLastname(profile.lastname);
            setEmail(profile.email);
            setPhone(profile.phone);
        } else {
            return;
        }
    }, [id]);
    const updateHandler = async () => {

        setPicLoading(true);
        if (!name || !email || !firstname || !lastname || !phone) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }

        console.log(name, firstname, lastname, email, pic, phone);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const { data } = await axios.put(
                `/api/user/update/${id}`,
                {
                    name,
                    firstname,
                    lastname,
                    email,
                    phone,
                    pic,
                },
                config
            );
            console.log(data);
            toast({
                title: "Success",
                description: "Profile Updated Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            setPicLoading(false);
            history.push('/admin/users')
        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };
    const postDetails = async (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log("pics", pics);

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("image", pics);

            const response = await axios({
                method: "post",
                url: "/api/upload",
                data: data,
                headers: { "Content-Type": "multipart/form-data" },
            });
            setPic(response.data.image);
            setPicLoading(false);

            console.log("sucessPic", pic);
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };
    return (
        <div
            className="container-fluid pt-3"
            id="contact"
            style={{ backgroundColor: "#f6f6fe", minHeight: "100vh" }}
        >
            <div className="container" style={{ marginTop: "75px" }}>
                <div className="position-relative d-flex align-items-center justify-content-center pb-3">
                    <h1
                        className="display-1 text-uppercase text-white"
                        style={{ WebkitTextStroke: "1px #dee2e6", fontSize: "7rem" }}
                    >
                        User
                    </h1>
                    <h1
                        className="position-absolute text-uppercase text-primary"
                        style={{ fontSize: "2.5rem" }}
                    >
                        Edit user
                    </h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="contact-form text-center">
                            <div id="success"></div>
                            {profile === undefined ? (
                                <Loader />
                            ) : (
                                <>
                                    <FormControl id="first-name" isRequired>
                                        <FormLabel>Name</FormLabel>
                                        <Input
                                            value={name}
                                            placeholder="Enter Your Name"
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="firstname" isRequired>
                                        <FormLabel>FirstName</FormLabel>
                                        <Input
                                            value={firstname}
                                            placeholder="Enter Your First Name"
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="lastname" isRequired>
                                        <FormLabel>LastName</FormLabel>
                                        <Input
                                            value={lastname}
                                            placeholder="Enter Your Name"
                                            onChange={(e) => setLastname(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email Address</FormLabel>
                                        <Input
                                            value={email}
                                            type="email"
                                            placeholder="Enter Your Email Address"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="phone" isRequired>
                                        <FormLabel>PhoneNumber</FormLabel>
                                        <Input
                                            value={phone}
                                            type="text"
                                            placeholder="Enter Your PhoneNumber"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl id="pic">
                                        <FormLabel>Upload your Picture</FormLabel>
                                        <Input
                                            type="file"
                                            p={1.5}
                                            onChange={(e) => postDetails(e.target.files[0])}
                                        />
                                    </FormControl>
                                    <Flex justifyContent="space-between">
                                        <Button
                                            colorScheme="blue"
                                            width="40%"
                                            style={{ marginTop: 15 }}
                                            onClick={updateHandler}
                                            isLoading={picLoading}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            colorScheme="blue"
                                            width="40%"
                                            style={{ marginTop: 15 }}
                                            onClick={(e) => history.push('/admin/users')}
                                        >
                                            Back
                                        </Button>
                                    </Flex>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserEdit