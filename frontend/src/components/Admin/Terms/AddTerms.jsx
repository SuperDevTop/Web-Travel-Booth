import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import Loader from "../../Loader";

const AddTerms = () => {
  const toast = useToast();
  const [term, setTerm] = useState("");
  const [termDes, setTermDes] = useState("");
  const [policy, setPolicy] = useState("");
  const [policyDes, setPolicyDes] = useState("");
  const [terms, setTerms] = useState([]);
  const [policys, setPolicys] = useState([]);
  const [status, setStatus] = useState(false)
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

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const fetchTerms = async () => {
      const { data } = await axios.get("/api/admin/terms", config);
      setTerms(data.message);
    }

    const fetchPolicy = async () => {
      const { data } = await axios.get("/api/admin/policy", config);
      setPolicys(data.message);
    }

    fetchPolicy();
    fetchTerms();
  }, [status]);
  const termResetHandler = () => {
    setTerm("");
    setTermDes("");
  }
  const policyResetHandler = () => {
    setPolicy("");
    setPolicyDes("");
  }

  const termSubmitHandler = async () => {
    if(!term || !termDes) {
      toast({
        title: "Input the field all!",
        status: "info",
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

      const reqData = { term, description: termDes };
      const { data } = await axios.post("/api/admin/submitterms", reqData, config);
      if (data.state === "OK") {
        toast({
          title: "Submitted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setStatus(!status);
      }
    }
    catch (error) { }
  }

  const policySubmitHandler = async () => {
    if(!policy || !policyDes) {
      toast({
        title: "Input the field all!",
        status: "info",
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

      const reqData = { policy, description: policyDes };
      const { data } = await axios.post("/api/admin/submitpolicy", reqData, config);
      if (data.state === "OK") {
        toast({
          title: "Submitted Successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        setStatus(!status);
      }
    }
    catch (error) { }
  }

  const deleteTermHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete("/api/admin/deleteterms", { data: { id: id }, ...config }).then(response => {
      toast({
        title: "Success!",
        description: "Deleted Successfully!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setStatus(!status);
    })
  }
  const deletePolicyHandler = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete("/api/admin/deletepolicy", { data: { id: id }, ...config }).then(response => {
      toast({
        title: "Success!",
        description: "Deleted Successfully!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setStatus(!status);
    })
  }
  return (
    <div className="dashboard-container w-100">
      <div className="dashboard-content-container" style={{ paddingTop: "100px" }}>
        <div className="pagetitle mb-3">
          <h1>Terms</h1>
        </div>

        <section className="section">
          <div className="row">
            <div className="col-lg-6 border bg-white px-5 py-3 rounded-4 ">
              <div className="col-12 border bg-white px-5 py-3 rounded-4 mb-4">
                <div className="card-title text-center fs-5 fw-bold text-primary mb-2"> Submit Terms and Conditions </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="floatingName" placeholder="Your Name" onChange={(e) => setTerm(e.target.value)} value={term} />
                    <label htmlFor="floatingName">Enter terms</label>
                  </div>
                </div>
                <div className="col-12 py-2">
                  <div className="form-floating">
                    <textarea className="faq-textarea form-control" placeholder="Address" id="floatingTextarea" style={{ height: "100px" }} onChange={(e) => setTermDes(e.target.value)} value={termDes}></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-5 py-2">
                  <button type="submit" className="btn btn-primary w-25 fw-bold fs-6 text-white" onClick={termSubmitHandler}>Submit</button>
                  <button type="reset" className="btn btn-danger w-25 fw-bold fs-6" onClick={termResetHandler}>Reset</button>
                </div>
              </div>
              {
                terms.length > 0 ? (
                  terms.map((t, index) => (
                    <div className="d-flex justify-content-between mt-2" key={index}>
                      <div className="w-75">
                        <div className="accordion">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="heading1">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`}
                                aria-expanded="false" aria-controls={index}>
                                Question {index + 1}: {t.title}
                              </button>
                            </h2>
                            <div id={index} className="accordion-collapse collapse" aria-labelledby="heading1"
                              data-bs-parent="#faqAccordion">
                              <div className="accordion-body bg-info text-white">
                                {t.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => deleteTermHandler(t._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center">There is no any Term</h1>
                )
              }
            </div>
            <div className="col-lg-6 border bg-white px-5 py-3 rounded-4">

              <div className="col-12 border bg-white px-5 py-3 rounded-4 mb-4">
                <div className="card-title text-center fs-5 fw-bold text-primary mb-2"> Submit Privacy and Policy </div>
                <div className="col-md-12">
                  <div className="form-floating">
                    <input type="text" className="form-control" id="floatingName" placeholder="Your Name" onChange={(e) => setPolicy(e.target.value)} value={policy} />
                    <label htmlFor="floatingName">Enter Policy</label>
                  </div>
                </div>
                <div className="col-12 py-2">
                  <div className="form-floating">
                    <textarea className="faq-textarea form-control" placeholder="Address" id="floatingTextarea" style={{ height: "100px" }} onChange={(e) => setPolicyDes(e.target.value)} value={policyDes}></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-5 py-2">
                  <button type="submit" className="btn btn-primary w-25 fw-bold fs-6 text-white" onClick={policySubmitHandler}>Submit</button>
                  <button type="reset" className="btn btn-danger w-25 fw-bold fs-6" onClick={policyResetHandler}>Reset</button>
                </div>
              </div>

              {
                policys.length > 0 ? (
                  policys.map((p, index) => (
                    <div className="d-flex justify-content-between mt-2" key={index}>
                      <div className="w-75">
                        <div className="accordion">
                          <div className="accordion-item">
                            <h2 className="accordion-header" id="heading1">
                              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${index}`}
                                aria-expanded="false" aria-controls={index}>
                                Question {index + 1}: {p.title}
                              </button>
                            </h2>
                            <div id={index} className="accordion-collapse collapse" aria-labelledby="heading1"
                              data-bs-parent="#faqAccordion">
                              <div className="accordion-body bg-info text-white">
                                {p.description}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={(e) => deletePolicyHandler(p._id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1 className="text-center">There is no any Policy</h1>
                )
              }
            </div>

          </div>
        </section>
      </div>
    </div>
  )
}

export default AddTerms