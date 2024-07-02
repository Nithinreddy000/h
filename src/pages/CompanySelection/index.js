import React from 'react';
import { Container } from 'reactstrap';
import DataOverview from './DataOverview';

// import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';

const CompanySelection = () => {


    document.title="Infinit X | ERP";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="Company Selection" pageTitle="Infinity X" />
                        <DataOverview />
                </Container>
            </div>
        </React.Fragment>
    );
};

export default CompanySelection;