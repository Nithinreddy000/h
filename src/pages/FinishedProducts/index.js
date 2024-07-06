import React, { useState, useEffect } from "react";
import { shoppingCart } from "../../common/data/ecommerce";

//Import Breadcrumb
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Link } from "react-router-dom";
import { Collapse } from "reactstrap";

import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  CardHeader,
  UncontrolledAlert,
} from "reactstrap";

const EcommerceCart = (cartItem, countUP ) => {

  const [productList, setproductList] = useState(shoppingCart);
  const [charge, setCharge] = useState(0);
  const [tax, setTax] = useState(0);
  const [dis, setDis] = useState(0);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isWeighmentOpen, setIsWeighmentOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);

  const assigned = productList.map((item) => item.total);
  let subTotal = 0;
  for (let i = 0; i < assigned.length; i++) {
    subTotal += Math.round(assigned[i]);
  }

  useEffect(() => {
    let dis = (0.15 * subTotal);
    let tax = (0.125 * subTotal);

    if (subTotal !== 0) {
      setCharge(65);
    } else {
      setCharge(0);
    }
    setTax(dis);
    setDis(tax);
  }, [subTotal]);

  function removeCartItem(id) {
    var filtered = productList.filter(function (item) {
      return item.id !== id;
    });

    setproductList(filtered);
  }

  function countUP(id, prev_data_attr, itemPrice) {
    setproductList(
      productList.map((p) =>
        p.id === id ? { ...p, data_attr: prev_data_attr + 1, total: (prev_data_attr + 1) * itemPrice } : p
      )
    );
  }

  function countDown(id, prev_data_attr, itemPrice) {
    setproductList(
      productList.map((p) =>
        (p.id === id && p.data_attr > 0) ? { ...p, data_attr: prev_data_attr - 1, total: (prev_data_attr - 1) * itemPrice } : p
      )
    );
  }

  const extraItems = [
    {
      name: "Billets",
      quantity: "500 Bars",
      rate: "14000",
    },
    {
      name: "Structures",
      quantity: "700 Bars",
      rate: "12000",
    },
  ];


  document.title = "Shopping Cart | Velzon - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Shopping Cart" pageTitle="Ecommerce" />

          <Row className="mb-3">
            <Col xl={8}>
              <Row className="align-items-center gy-3 mb-3">
                <div className="col-sm">
                  <div>
                    <h5 className="fs-14 mb-0">Your Cart ({productList.length} items)</h5>
                  </div>
                </div>
                <div className="col-sm-auto">
                  <Link
                    to="/apps-ecommerce-products"
                    className="link-primary text-decoration-underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </Row>
              {productList.map((cartItem, key) => (
                <React.Fragment key={cartItem.id}>
                  <Card className="product">
                    <CardBody>
                    <Row className="gy-3">
  <div className="col-sm-auto "></div>
  <div className="col-sm">
    <h5 className="fs-14 text-truncate text-wrap w-100">
      <span to="/ecommerce-product-detail" className="text-body">
        SUNIL SPONGE AND POWER PRIVATE LIMITED
      </span>
    </h5>
    <ul className="list-inline text-muted mb-1 mb-md-3">
      <li className="list-inline-item">
        Vehicle Number : <span className="fw-medium">TS01 0001</span>
      </li>
    </ul>
  </div>
  <div className="col-sm-auto mt-0">
    <div className="text-lg-end mb-1.5 mt-0"> {/* Adjusted margin bottom for mobile view */}
      <p className="text-muted mb-1">Voucher</p>
      <h5 className="fs-14">
        $
        <span id="ticket_price" className="product-price">
          2047/SC1988
        </span>
      </h5>
    </div>
  </div>
</Row>

                      <Row className="gy-3">
  <div className="col-sm-auto"></div>
  <div className="col-sm mt-0">
    <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start">
      <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
        <span className="text-body">Item: Tmt Bars</span>
      </h5>
      <ul className="list-inline text-muted ms-0 ms-sm-2 mb-0 mb-sm-0 me-2">
        <li className="list-inline-item">
          Quantity: <span className="fw-medium">1000 Bars</span>
        </li>
      </ul>
      <div className="d-flex align-items-center ms-0 ms-sm-2 mt-2">
        <p className="text-body mb-0 mb-sm-2 me-1 me-sm-2">Rate:</p>
        <h5 className="fs-14 mb-0 mb-sm-2">
          $<span id="ticket_price" className="product-price">24000</span>
        </h5>
      </div>
      <div className="position-relative ms-auto">
    <button
      type="button"
      className="btn btn-link p-0 position-absolute"
      onClick={() => setIsVoucherOpen(!isVoucherOpen)}
      style={{ fontSize: '1.5rem', lineHeight: '1', top: '35%',right:'15%', transform: 'translateY(-25%)' }} // Adjust these values as needed
    >
              {isVoucherOpen ? '-' : '+'}
            </button>
            {!isVoucherOpen && extraItems.length === 2 && (
              <span className="badge bg-secondary position-absolute top-0 start-100 translate-middle p-1 rounded-pill">
                +2
              </span>
            )}
          </div>
        </div>
        <Collapse isOpen={isVoucherOpen}>
  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start ms-4 mt-0 mb-0">
    <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
      <span className="text-body">Item: Billets</span>
    </h5>
    <ul className="list-inline text-muted ms-0 ms-sm-2 mb-2 mb-sm-0 me-2">
      <li className="list-inline-item">
        Quantity: <span className="fw-medium">500 Bars</span>
      </li>
    </ul>
    <div className="d-flex align-items-center ms-0 ms-sm-2 ">
      <p className="text-body mb-2 mb-sm-0 me-1 me-sm-2">Rate:</p>
      <h5 className="fs-14 mb-lg-0 mb-sm-2">
        $<span id="ticket_price" className="product-price">12000</span>
      </h5>
    </div>
  </div>

  <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-start ms-4 mt-1 mb-0">
    <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mb-sm-0">
      <span className="text-body">Item: Structures</span>
    </h5>
    <ul className="list-inline text-muted ms-0 ms-sm-2 mb-2 mb-sm-0 me-2">
      <li className="list-inline-item">
        Quantity: <span className="fw-medium">700 Bars</span>
      </li>
    </ul>
    <div className="d-flex align-items-center ms-0 ms-sm-2 ">
      <p className="text-body mb-2 mb-sm-0 me-1 me-sm-2">Rate:</p>
      <h5 className="fs-14 mb-lg-0 mb-sm-2">
        $<span id="ticket_price" className="product-price">12000</span>
      </h5>
    </div>
  </div>
</Collapse>


        <div className="d-flex align-items-center mt-0">
          <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-1 mt-1  mb-sm-0">
            <span className="text-body">Gate</span>
          </h5>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => setIsGateOpen(!isGateOpen)}
          >
            {isGateOpen ? '-' : '+'}
          </button>
        </div>
        <Collapse isOpen={isGateOpen}>
          <div className="ms-4 mt-1 mb-0">
            <p className="mb-1">In- 01/02/2024 | 12:30 | user</p>
            <p className="mb-0">Out- 01/02/2024 | 1:30 | user</p>
          </div>
        </Collapse>

        <div className="d-flex align-items-center mt-1">
          <h5 className="fs-14 text-truncate me-4 me-sm-3 mb-0 mt-2 mb-sm-0">
            <span className="text-body">Weighment</span>
          </h5>
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => setIsWeighmentOpen(!isWeighmentOpen)}
          >
            {isWeighmentOpen ? '-' : '+'}
          </button>
        </div>
        <Collapse isOpen={isWeighmentOpen}>
          <div className="ms-4 mt-1 mb-0">
            <p className="mb-1">In- 01/02/2024 | 12:30 | user</p>
            <p className="mb-0">Out- 01/02/2024 | 1:30 | user</p>
          </div>
        </Collapse>
      </div>
    </Row>

</CardBody>
                    {/* <div className="card-footer">
                      <div className="row align-items-center gy-3">
                        <div className="col-sm">
                          <div className="d-flex flex-wrap my-n1">
                            <div>
                              <Link
                                to="#"
                                className="d-block text-body p-1 px-2"
                                onClick={() => removeCartItem(cartItem.id)}
                              >
                                <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                                Remove
                              </Link>
                            </div>
                            <div>
                              <Link
                                to="#"
                                className="d-block text-body p-1 px-2"
                              >
                                <i className="ri-star-fill text-muted align-bottom me-1"></i>{" "}
                                Add Wishlist
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-auto">
                          <div className="d-flex align-items-center gap-2 text-muted">
                            <div>Total :</div>
                            <h5 className="fs-14 mb-0">
                              $
                              <span className="product-line-price">
                                {" "}
                                {(cartItem.total).toFixed(2)}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </Card>
                </React.Fragment>
              ))}

              <div className="text-end mb-4">
                <Link
                  to="/apps-ecommerce-checkout"
                  className="btn btn-success btn-label right ms-auto"
                >
                  <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                  Checkout
                </Link>
              </div>
            </Col>

            <Col xl={4}>
              <div className="sticky-side-div">
                <Card>
                  <CardHeader className="border-bottom-dashed">
                    <h5 className="card-title mb-0">Order Summary</h5>
                  </CardHeader>
                  <CardHeader className="bg-light-subtle border-bottom-dashed">
                    <div className="text-center">
                      <h6 className="mb-2">
                        Have a <span className="fw-semibold">promo</span> code ?
                      </h6>
                    </div>
                    <div className="hstack gap-3 px-3 mx-n3">
                      <input
                        className="form-control me-auto"
                        type="text"
                        placeholder="Enter coupon code"
                        aria-label="Add Promo Code here..."
                      />
                      <button type="button" className="btn btn-success w-xs">
                        Apply
                      </button>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-2">
                    <div className="table-responsive">
                      <table className="table table-borderless mb-0">
                        <tbody>
                          <tr>
                            <td>Sub Total :</td>
                            <td className="text-end" id="cart-subtotal">
                              $ {subTotal}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Discount{" "}
                              <span className="text-muted">(VELZON15)</span> :{" "}
                            </td>
                            <td className="text-end" id="cart-discount">
                              - $ {dis}
                            </td>
                          </tr>
                          <tr>
                            <td>Shipping Charge :</td>
                            <td className="text-end" id="cart-shipping">
                              $ {charge}
                            </td>
                          </tr>
                          <tr>
                            <td>Estimated Tax (12.5%) : </td>
                            <td className="text-end" id="cart-tax">
                              $ {tax}
                            </td>
                          </tr>
                          <tr className="table-active">
                            <th>Total (USD) :</th>
                            <td className="text-end">
                              <span className="fw-semibold" id="cart-total">
                                ${subTotal + charge + tax - dis}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardBody>
                </Card>

                <UncontrolledAlert color="danger" className="border-dashed">
                  <div className="d-flex align-items-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/nkmsrxys.json"
                      trigger="loop"
                      colors="primary:#121331,secondary:#f06548"
                      style={{ width: "80px", height: "80px" }}
                    ></lord-icon>
                    <div className="ms-2">
                      <h5 className="fs-14 text-danger fw-semibold">
                        {" "}
                        Buying for a loved one?
                      </h5>
                      <p className="text-body mb-1">
                        Gift wrap and personalized message on card, <br />
                        Only for <span className="fw-semibold">$9.99</span> USD
                      </p>
                      <button
                        type="button"
                        className="btn ps-0 btn-sm btn-link text-danger text-uppercase"
                      >
                        Add Gift Wrap
                      </button>
                    </div>
                  </div>
                </UncontrolledAlert>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCart;
