import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Collapse, Col, Container, Row, Card, CardBody, Button } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { fetchFinishedProductsData } from "../../slices/thunks";

const FinishedProducts = () => {
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState([]);

  // Fetching data and handling loading and error states
  useEffect(() => {
    dispatch(fetchFinishedProductsData());
  }, [dispatch]);

  // Selecting data from Redux state using selectors
  const selectFinishedProductsState = (state) => state.FinishedProducts;
  const selectFinishedProductsData = createSelector(
    selectFinishedProductsState,
    (state) => ({
      user: state.user,
      loading: state.loading,
      error: state.error,
    })
  );

  const { user, loading, error } = useSelector(selectFinishedProductsData);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user || !user.item || user.item.length === 0) {
    return <p>No data available</p>;
  }

  const handleExpandItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Finished Products" pageTitle="Infinity X" />
        <Row className="mb-3">
          <Col xl={8}>
            {user.item.map((item, index) => (
              <Card key={index} className="product">
                <CardBody>
                  <Row className="gy-3">
                    <Col sm={8}>
                      <h5 className="fs-14 text-truncate text-wrap w-100">
                        <span className="text-body">{item.voucherNum.Account.Account}</span>
                      </h5>
                      <ul className="list-inline text-muted mb-1 mb-md-3">
                        <li className="list-inline-item">
                          <span className="fw-medium">{item.voucherNum.Transport.VehicleNumber}</span>
                        </li>
                      </ul>
                    </Col>
                    <Col sm={4} className="text-lg-end mb-1.5 mt-0">
                      <p className="text-muted mb-1"></p>
                      <h5 className="fs-14">
                        <span className="product-price">
                          {item.voucherNum.VoucherNumber} | {item.voucherNum.VoucherDate}
                        </span>
                      </h5>
                    </Col>
                  </Row>

                  <Row className="gy-3">
                    <Col sm={8}>
                      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start">
                        <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
                          <span className="text-body">{item.item.Item}</span>
                        </h5>
                        <ul className="list-inline text-muted ms-0 ms-sm-2 mb-0 mb-sm-0 me-2">
                          <li className="list-inline-item">
                            <span className="fw-medium">{item.quantity}</span>
                          </li>
                        </ul>
                        <div className="d-flex align-items-center ms-0 ms-sm-2 mt-2">
                          <p className="text-body mb-0 me-1 me-sm-2"></p>
                          <h5 className="fs-14 mb-0">
                            <span className="product-price">{item.exclusiveRate}</span>
                          </h5>
                        </div>
                        <div className="position-relative ms-auto">
                          <Button
                            type="button"
                            className="btn btn-link p-0 position-absolute"
                            onClick={() => handleExpandItem(index)}
                            style={{
                              fontSize: "1.5rem",
                              lineHeight: "1",
                              top: "35%",
                              right: "15%",
                              transform: "translateY(-25%)",
                              textShadow: "none",
                            }}
                          >
                            {expandedItems.includes(index) ? "-" : "+"}
                          </Button>
                          {!expandedItems.includes(index) && (
                            <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle p-1 rounded-pill">
                              +{user.item.length - 1}
                            </span>
                          )}
                        </div>
                      </div>
                      {!expandedItems.includes(index) && (
                        <div className="text-danger" style={{ marginLeft: "1rem" }}>
                          +{user.item.length - 1} more items
                        </div>
                      )}
                      <Collapse isOpen={expandedItems.includes(index)}>
                        {/* Display additional details here */}
                        <div className="ms-4 mt-1 mb-0">
                          <p className="mb-1">{item.voucherNum.GateVoucher.VehicleGateWeightDetails.GateInDateTime}</p>
                          <p className="mb-0">{item.voucherNum.GateVoucher.VehicleGateWeightDetails.GateOutDateTime}</p>
                          {/* Add more details as needed */}
                        </div>
                      </Collapse>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FinishedProducts;

