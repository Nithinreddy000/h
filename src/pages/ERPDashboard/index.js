import React from 'react';
import { Container } from 'reactstrap';
import DataOverview from './DataOverview';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

const ERPDashboard = () => {


    document.title="Infinit X | ERP";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="ERP Dashboard" pageTitle="Infinit X" />
                        <DataOverview />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ERPDashboard;