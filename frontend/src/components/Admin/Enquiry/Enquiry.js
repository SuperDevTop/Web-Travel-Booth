import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import './Enquiry.css';

const EnquiryPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [userAnswer, setUserAnswer] = useState('');
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState('');
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  const submitHandler = async () => {
    if (question === '' || answer === "") {
      toast({
        title: "Error Occured!",
        description: "All Field Value must input correctly.",
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

      const reqData = { question, answer };
      // const { data } = await axios.post("/api/admin/update_faqs", reqData, config);
      const { data } = await axios.post("/api/admin/submitfaq", reqData, config);
      if (data.state === "OK") {
        toast({
          title: "Success!",
          description: "FAQs are updated successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    catch (error) { }
  }
  const answerHandler = async () => {
    if (userAnswer === "") {
      toast({
        title: "Error Occured!",
        description: "All Field Value must input correctly.",
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

      const reqData = { answer: userAnswer, id };
      const { data } = await axios.post("/api/admin/update_faqs", reqData, config);

      toast({
        title: "Success!",
        description: "FAQs are updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

    }
    catch (error) { }
  }

  const resetHandler = async () => {
    setQuestion("");
    setAnswer("");
  }

  useEffect(() => {
    const fetchFaqs = async () => {
      const user = JSON.parse(localStorage.getItem("userInfo"));
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

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.get("/api/admin/faqs", config);
        setQuestions(data.message);
        console.log("questions", questions)
      } catch (error) { }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="dashboard-container w-100">
      <div className="dashboard-content-container" style={{ paddingTop: "100px" }}>
        <div className="pagetitle mb-3">
          <h1>Enquiry - Frequently Asked Questions</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-12 border bg-white px-5 py-3 rounded-4 mb-4">
              <div className="card-title text-center fs-5 fw-bold text-primary mb-2">FAQ </div>
              <div className="col-md-12">
                <div className="form-floating">
                  <input type="text" className="form-control" id="floatingName" placeholder="Your Name" onChange={(e) => setQuestion(e.target.value)} value={question} />
                  <label htmlFor="floatingName">Enter any questions</label>
                </div>
              </div>
              <div className="col-12 py-2">
                <div className="form-floating">
                  <textarea className="faq-textarea form-control" placeholder="Address" id="floatingTextarea" style={{ height: "100px" }} onChange={(e) => setAnswer(e.target.value)} value={answer}></textarea>
                  <label htmlFor="floatingTextarea">Write the answer</label>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-5 py-2">
                <button type="submit" className="btn btn-primary w-25 fw-bold fs-6 text-white" onClick={submitHandler}>Submit</button>
                <button type="reset" className="btn btn-danger w-25 fw-bold fs-6" onClick={resetHandler}>Reset</button>
              </div>
            </div>
            <div className="col-12 border bg-white px-5 py-3 rounded-4">
              <h5 className="card-title text-center fs-5 fw-bold text-primary mb-2"> Questions from users </h5>
              <div className="col-md-12">
                <div className="form-floating">
                  <select className="form-select" aria-label="Default" value={id} onChange={(e) => setId(e.target.value)}>
                    <option>Select the question</option>
                    {
                      questions.filter(question => question.status === 0).map((question, index) => (
                        <option value={question._id} key={index}>{question.question}</option>
                      ))
                    }
                  </select>
                </div>
              </div>
              <div className="col-12 py-2">
                <div className="form-floating">
                  <textarea className="faq-textarea form-control" placeholder="Address" id="floatingTextarea" style={{ height: "100px" }} onChange={(e) => setUserAnswer(e.target.value)} value={userAnswer}></textarea>
                  <label htmlFor="floatingTextarea">Write the answer</label>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-5 py-2">
                <button type="submit" className="btn btn-primary w-25 fw-bold fs-6 text-white" onClick={answerHandler}>Submit</button>
                <button type="reset" className="btn btn-danger w-25 fw-bold fs-6" onClick={resetHandler}>Reset</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnquiryPage;