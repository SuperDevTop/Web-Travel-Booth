import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import Loader from '../Loader';

const FaqPage = () => {
    const [question, setQuestion] = useState('');
    const [faqs, setFaqs] = useState([]);
    const toast = useToast();
    const user = JSON.parse(localStorage.getItem("userInfo"));
    useEffect(() => {
        if (user) {
            if (user.isAdmin === true) {
                document.getElementById('mySidebar').style.display = "none";
                document.getElementById('AdminSidebar').style.display = "block";
            }
            else {
                document.getElementById('mySidebar').style.display = "block";
                document.getElementById('AdminSidebar').style.display = "none";
            }
        }
        const getFaqs = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const { data } = await axios.get("/api/admin/faqs", config);
                setFaqs(data.message);
            } catch (error) { }
        };
        getFaqs();
    }, [])
    const questionSubmitHandler = async () => {
        if (question === "") {
            toast({
                title: "Error Ocurred!",
                description: "Input the question exactly",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post("/api/admin/submitquestion", { question }, config);
            console.log("data", data.message)
            toast({
                title: "Success!",
                description: "You have sent the question successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            toast({
                title: "Error Ocurred!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-right",
            });
        }
    }
    return (
        <div className="container-fluid pt-1 pb-3" id="blog" style={{ backgroundColor: "#f6f6fe", minHeight: "100vh" }}>
            <div className="container" style={{ marginTop: "75px" }}>
                <div className="position-relative d-flex align-items-center justify-content-center pb-2">
                    <h1 className="display-1 text-uppercase text-white"
                        style={{ WebkitTextStroke: '1px #dee2e6', fontSize: "9rem" }}>FAQ</h1>
                    <h1 className="position-absolute text-uppercase text-primary" style={{ fontSize: "3rem" }}>You ask?</h1>
                </div>
                <div className="container border border-primary bg-white p-5 rounded-4">
                    <div className="mt-5">
                        <h3 className="mb-3">Ask a Question</h3>
                        <form>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter your question'
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button
                                    type="button"
                                    className="btn btn-primary w-50 fw-bold text-white"
                                    onClick={questionSubmitHandler}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <h1 className="text-center py-5 text-secondary">Frequently Asked Questions</h1>

                    {
                        faqs ? (
                            faqs.filter(faq => faq.status === 1).map((faq, index) => (
                                <div className="accordion">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="heading1">
                                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`}
                                                aria-expanded="false" aria-controls={index}>
                                                Question {index + 1}: {faq.question}
                                            </button>
                                        </h2>
                                        <div id={index} className="accordion-collapse collapse" aria-labelledby="heading1"
                                            data-bs-parent="#faqAccordion">
                                            <div className="accordion-body bg-info text-white">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ):(
                            <Loader />
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default FaqPage