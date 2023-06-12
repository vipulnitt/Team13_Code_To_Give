import React, { Fragment, useEffect, useState } from "react";
import BarGraph from "../Layout/BarGraph";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSubmissions,
  getBarData,
  getPieData,
} from "../../actions/adminAction";
import PieChart from "../Layout/PieChart";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

const Response = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState("0");
  const [currentSelect, setCurrentSelect] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    Promise.all([
      dispatch(getPieData()),
      dispatch(getBarData()),
      dispatch(getAllSubmissions()),
    ]);
  }, []);
  const { loading, all } = useSelector((state) => state.data);

  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [resPerPage, setResPerPage] = useState(0);

  useEffect(() => {
    if (all) {
      setResPerPage(all.resPerPage);
      setCount(all.count);
      setData(all.data);
    }
  }, [all]);
  useEffect(() => {
    dispatch(getAllSubmissions(currentPage));
  }, [dispatch, currentPage]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  const handlePage = (d) => {
    setCurrentData("1");
    setCurrentSelect(d);
  };

  if (currentData === "1") {
    return (
      <Fragment>
        <br />

        <div className="d-flex justify-content-center align-items-center">
          <div className="mt-3 col-md-6">
            <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
              <div className="card bg-dark">
                <div className="card-header cardHead cardbg1">
                  <span className="text-white notification cardHeadText">
                    <i className="fa fa-user"></i>Selected
                  </span>
                </div>

                <div className="card mb-0">
                  <div
                    className="card-header card-header-inner"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#applicant_login"
                  >
                    <div className="linkcorner text-left ml-4">
                      <b>Contact Details:</b>{" "}
                      {currentSelect && currentSelect.email}
                    </div>
                  </div>
                </div>

                <div className="card mb-0">
                  <div
                    className="card-header card-header-inner"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#applicant_login"
                  >
                    <div className="linkcorner text-left ml-4">
                      <b>Addiction Type:</b>{" "}
                      {currentSelect && currentSelect.addictionType}
                    </div>
                  </div>
                </div>
                <div className="card mb-0">
                  <div
                    className="card-header card-header-inner"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#applicant_login"
                  >
                    <div className="linkcorner text-left ml-4">
                      <b>Counseling Needed(System Test):</b>{" "}
                      {currentSelect && (currentSelect ? <>Yes</> : <>No</>)}
                    </div>
                  </div>
                </div>
                {currentSelect && currentSelect.mobileNumber ? (
                  <div className="card mb-0">
                    <div
                      className="card-header card-header-inner"
                      data-toggle="collapse"
                      data-parent="#accordion"
                      href="#applicant_login"
                    >
                      <div className="linkcorner text-left ml-4">
                        <b>Mobile Number:</b>{" "}
                        {currentSelect && currentSelect.mobileNumber}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="card mb-0">
                  <div
                    className="card-header card-header-inner"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#applicant_login"
                  >
                    <div className="linkcorner text-left ml-4">
                      <b>Counselor:</b>{" "}
                      {currentSelect &&
                      currentSelect.counselorDetails.isAssigned ? (
                        <>
                          {" "}
                          <b>Name:</b>{" "}
                          <Link
                            to={
                              "/admin/counselor?id=" +
                              currentSelect.counselorDetails.counselorId
                            }
                          >
                            {currentSelect &&
                              currentSelect.counselorDetails.counselorName}{" "}
                          </Link>
                        </>
                      ) : (
                        <b Style="color:Red;">Not Assigned</b>
                      )}
                    </div>
                  </div>
                </div>

                {currentSelect ? (
                  currentSelect.questions.map((c) => (
                    <div className="card mb-0">
                      <div
                        className="card-header card-header-inner"
                        data-toggle="collapse"
                        data-parent="#accordion"
                        href="#applicant_login"
                      >
                        <div className="linkcorner text-left ml-4">
                          <b>{c.statement}</b> <br />
                          {c.ans}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          className="bg-success text-white ml-3 mt-3"
          onClick={() => setCurrentData("0")}
        >
          <i className="bi bi-arrow-return-left"></i>Back
        </button>
      </Fragment>
    );
  }
  return (
    <div>
      <h1>Admin Panel</h1>
      <div className="d-flex justify-content-center align-items-center">
          <div className="mt-3 col-md-6">
      <div className="mt-3" style={{ display: "flex" }}>
        <div className="col-xl col-lg-3 col-md-6 col-sm-6 mb-3 h-100">
          <div className="card bg-dark">
            <div className="card-header cardHead cardbg1">
              <span className="text-white notification cardHeadText">
                <i className="fa fa-user"></i>All Submissions
              </span>
            </div>
            {data &&
              data.map((c) => (
                <div className="card mb-0">
                  <div
                    className="card-header card-header-inner"
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#applicant_login"
                  >
                    <div className="linkcorner text-left ml-4">
                      <b>Contact Details: </b>
                      {c.email} <b className="ml-2">Addiction Type:</b>{" "}
                      {c.addictionType} <b className="ml-2">Status:</b>
                      {c.counselorDetails.isAssigned ? (
                        <>
                          {c.counselorDetails.status === "underProcess" ? (
                            <b Style="color:MediumSeaGreen;">Assigned</b>
                          ) : (
                            <b Style="color:Tomato;">Closed</b>
                          )}
                        </>
                      ) : (
                        <b Style="color:Red;">Not Assigned</b>
                      )}{" "}
                      <Link className="ml-2" onClick={() => handlePage(c)}>
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            <div className="card mb-0">
              <div
                className="card-header card-header-inner"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#applicant_login"
              >
                <div className="linkcorner text-left ml-4">
                  <div className="d-flex justify-content-center mt-5">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resPerPage}
                      totalItemsCount={count}
                      onChange={setCurrentPageNo}
                      nextPageText={"Next"}
                      prevPageText={"Previous"}
                      firstPageText={"First Page"}
                      lastPageText={"Last Page"}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default Response;
