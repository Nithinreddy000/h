import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import { fetchCompanySelectionData } from '../../slices/thunks';
import { createSelector } from "reselect";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const CompanySelection = () => {
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state.CompanySelection;
  
    const userprofileData = createSelector(
        selectLayoutState,
        (state) => ({ user: state.user, success: state.success, error: state.error })
    );
  
    const { user, success, error } = useSelector(userprofileData);
  
    useEffect(() => {
        dispatch(fetchCompanySelectionData());
    }, [dispatch]);

    return (
        <React.Fragment>
            <div className="navbar-header">
                {/* Navbar content can go here */}
            </div>
            {user?.map((item, index) => (
                <Row key={index}>
                    <Col xl={12}>
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Card>
                                <CardHeader className="border-0 align-items-center d-flex">
                                    <h4 className="card-title mb-0 flex-grow-1">{item.companyName}</h4>
                                </CardHeader>
                                <CardHeader className="p-0 border-0 bg-light-subtle">
                                    <Row className="g-0 text-center">
                                        <Col xs={6} sm={3}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1">{item.companyCode}</h5>
                                                <p className="text-muted mb-0">{item.companyPeriod}</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </CardHeader>
                            </Card>
                        </Link>
                    </Col>
                </Row>
            ))}
        </React.Fragment>
    );
};

export default CompanySelection;
