import React, { useEffect ,useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import { fetchCompanySelectionData } from '../../slices/thunks';
import { createSelector } from "reselect";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { ToastContainer } from 'react-toastify';
import { Button,  CardBody,  Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Input, Label, Modal, ModalBody, Offcanvas, OffcanvasBody,  UncontrolledDropdown, FormFeedback } from 'reactstrap';
import BreadCrumb from '../../Components/Common/BreadCrumb';

const CompanySelection = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [sideBar, setSideBar] = useState([]);
    const selectLayoutState = (state) => state.CompanySelection;
    const [viewMode, setViewMode] = useState('grid'); // Default to grid view
    const [userList, setUserList] = useState([]); // State to store filtered user list
    
    const userprofileData = createSelector(
        selectLayoutState,
        (state) => ({ user: state.user, success: state.success, error: state.error })
    );
  
    const { user, success, error } = useSelector(userprofileData);
  
    useEffect(() => {
        dispatch(fetchCompanySelectionData());
    }, [dispatch]);

    useEffect(() => {
        setUserList(user); // Initialize userList with the fetched user data
    }, [user]);

    const searchList = (inputVal) => {
        inputVal = inputVal.toLowerCase();
        const filterItems = (arr, query) => {
            return arr.filter((el) => {
                return el.companyName.toLowerCase().includes(query) || el.companyCode.toLowerCase().includes(query);
            });
        };

        let filterData = filterItems(user, inputVal);
        setUserList(filterData);
        if (filterData.length === 0) {
            document.getElementById("noresult").style.display = "block";
            document.getElementById("userList").style.display = "none";
        } else {
            document.getElementById("noresult").style.display = "none";
            document.getElementById("userList").style.display = "block";
        }
    };

    useEffect(() => {
        const list = document.querySelectorAll(".team-list");
        const buttonGroups = document.querySelectorAll('.filter-button');

        buttonGroups.forEach(buttonGroup => {
            buttonGroup.addEventListener('click', onButtonGroupClick);
        });

        function onButtonGroupClick(event) {
            const isListView = event.target.id === 'list-view-button' || event.target.parentElement.id === 'list-view-button';
            setViewMode(isListView ? 'list' : 'grid');

            if (isListView) {
                document.getElementById("list-view-button").classList.add("active");
                document.getElementById("grid-view-button").classList.remove("active");
                list.forEach(el => {
                    el.classList.add("list-view-filter");
                    el.classList.remove("grid-view-filter");
                });
            } else {
                document.getElementById("grid-view-button").classList.add("active");
                document.getElementById("list-view-button").classList.remove("active");
                list.forEach(el => {
                    el.classList.remove("list-view-filter");
                    el.classList.add("grid-view-filter");
                });
            }
        }

        return () => {
            buttonGroups.forEach(buttonGroup => {
                buttonGroup.removeEventListener('click', onButtonGroupClick);
            });
        };
    }, []);

      
    return (
        <React.Fragment>
        <ToastContainer closeButton={false} />
        <div className="page-content" style={{paddingTop:'1.5rem'}}>
            <Container fluid>
                <BreadCrumb title="Company Selection" pageTitle="Pages" />
                <Card>
                    <CardBody>
                        <Row className="g-2">
                            <Col sm={4}>
                                <div className="search-box">
                                    <Input type="text" className="form-control" placeholder="Search for name or designation..." onChange={(e) => searchList(e.target.value)} />
                                    <i className="ri-search-line search-icon"></i>
                                </div>
                            </Col>
                            <Col className="col-sm-auto ms-auto">
                                <div className="list-grid-nav hstack gap-1">

                                    <Button color="info" id="grid-view-button" className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button shadow-none"><i className="ri-grid-fill"></i></Button>
                                    <Button color="info" id="list-view-button" className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button shadow-none"><i className="ri-list-unordered"></i></Button>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

                <Row>
                    <Col lg={12}>
                        <div>
                        <Row className="team-list grid-view-filter" id="userList">
                        {userList?.map((item, index) => (
                                    <Col key={index}>
                                        <Card className="team-box">
                                            <div className="team-cover">
                                                <img src={item.companyImage} alt="" className="img-fluid" />
                                            </div>
                                            <CardBody className="p-4">
                                                <Row className="align-items-center team-row">
                                                    <Col className="team-settings">
                                                        <Row>
                                                            <Col>
                                                                <div className="flex-shrink-0 me-2">
                                                                <button
                                                                        type="button"
                                                                        className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn"
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            position: 'relative'
                                                                        }}
                                                                    >
                                                                        <span
                                                                            style={{
                                                                                width: '60%',
                                                                                height: '60%',
                                                                                backgroundColor: item.connectionStatus === 'Online' ? 'green' : 'red',
                                                                                borderRadius: '50%',
                                                                            }}
                                                                        ></span>
                                                                    </button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col lg={4} className="col">
                                                        <div className="team-profile-img">

                                                            <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                                                {item.companyImage != null ?
                                                                    <img src={item.companyImage} alt="" className="img-fluid d-block rounded-circle" />

                                                                    :
                                                                    <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                                                        {item.companyName.charAt(0) + item.companyName.split(" ").slice(-1).toString().charAt(0)}
                                                                    </div>}
                                                            </div>
                                                            <div>
                                                            <Link>
                                                                <h5
                                                                    style={{
                                                                        paddingTop: viewMode === 'grid' ? '2%' : '0',
                                                                        paddingLeft: viewMode === 'list' ? '5%' : '0',
                                                                    }}
                                                                    className="fs-16 mb-1"
                                                                >
                                                                    {item.companyName}
                                                                </h5>
                                                            </Link>
                                                                    </div>
                                                            {viewMode === 'grid' && (
                                                                <div className="team-content">
                                                                    <p className="text-muted mb-0">{item.companyCode}</p>
                                                                    <p className="text-muted mb-0">{item.companyPeriod}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </Col>
                                                    <Col lg={4} className="col">
                                                    {viewMode === 'list' && (
                                                            <>
                                                                <Row className="text-muted text-center">
                                                                    <Col xs={7} className="border-end border-end-dashed">
                                                                        <h5 className="mb-1">{item.companyPeriod}</h5>
                                                                    </Col>
                                                                    <Col xs={3}>
                                                                        <h5 className="mb-1">{item.companyCode}</h5>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                            )}
                                                        </Col>
                                                  <Col lg={2} className="col">
                                                        <div className="text-end">
                                                            <Link to="/login" className="btn btn-light view-btn">Login</Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}

                                <Col lg={12}>
                                </Col>
                            </Row>


                            <div className="modal fade" id="addmembers" tabIndex="-1" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <Modal>
                                        <ModalBody>
                                                <Row>
                                                    <Col lg={12}>

                                                        <input type="hidden" id="memberid-input" className="form-control" defaultValue="" />
                                                        <div className="px-1 pt-1">
                                                            <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">

                                                                <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                                                    <div className="flex-grow-1">
                                                                        <h5 className="modal-title text-white" id="createMemberLabel"></h5>
                                                                    </div>
                                                                    <div className="flex-shrink-0">
                                                                        <div className="d-flex gap-3 align-items-center">
                                                                            <div>
                                                                                <label htmlFor="cover-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Select Cover Image">
                                                                                    <div className="avatar-xs">
                                                                                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                            <i className="ri-image-fill"></i>
                                                                                        </div>
                                                                                    </div>
                                                                                </label>
                                                                                <input className="form-control d-none" defaultValue="" id="cover-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                            </div>
                                                                            <button type="button" className="btn-close btn-close-white" id="createMemberBtn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-center mb-4 mt-n5 pt-2">
                                                            <div className="position-relative d-inline-block">
                                                                <div className="position-absolute bottom-0 end-0">
                                                                    <label htmlFor="member-image-input" className="mb-0" data-bs-toggle="tooltip" data-bs-placement="right" title="Select Member Image">
                                                                        <div className="avatar-xs">
                                                                            <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                                                <i className="ri-image-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                    </label>
                                                                    <input className="form-control d-none" defaultValue="" id="member-image-input" type="file" accept="image/png, image/gif, image/jpeg" />
                                                                </div>
                                                                <div className="avatar-lg">
                                                                    <div className="avatar-title bg-light rounded-circle">                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mb-3">
                                                            <Label htmlFor="teammembersName" className="form-label">Name</Label>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="mb-3">
                                                            <Label htmlFor="designation" className="form-label">Designation</Label>
                                                        </div>
                                                    </Col>
                                                    <Col lg={12}>
                                                        <div className="hstack gap-2 justify-content-end">
                                                            <button type="button" className="btn btn-light" onClick={() => setModal(false)}>Close</button>
                                                            <button type="submit" className="btn btn-success" id="addNewMember"></button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                        </ModalBody>
                                    </Modal>
                                </div>
                            </div>


                            <Offcanvas
                                isOpen={isOpen}
                                direction="end"
                                toggle={() => setIsOpen(!isOpen)}
                                className="offcanvas-end border-0"
                                tabIndex="-1"
                            >
                                <OffcanvasBody className="profile-offcanvas p-0">
                                    <div className="team-cover">
                                    </div>
                                    <div className="p-3">
                                        <div className="team-settings">
                                            <Row>
                                                <Col>
                                                <button type="button" class="btn btn-light btn-icon rounded-circle btn-sm favourite-btn "> <i class="ri-star-fill fs-14"></i> </button>
                                                </Col>
                                                <UncontrolledDropdown direction='start' className="col text-end">
                                                    <DropdownToggle tag="a" id="dropdownMenuLink14" role="button">
                                                        <i className="ri-more-fill fs-17"></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <DropdownItem><i className="ri-star-line me-2 align-middle" />Favorites</DropdownItem>
                                                        <DropdownItem><i className="ri-delete-bin-5-line me-2 align-middle" />Delete</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="p-3 text-center">                                        <div className="mt-3">
                                            <h5 className="fs-15"><Link to="#" className="link-primary">{sideBar.name || "Nancy Martino"}</Link></h5>
                                            <p className="text-muted">{sideBar.designation || "Team Leader & HR"}</p>
                                        </div>
                                        <div className="hstack gap-2 justify-content-center mt-4">
                                            <div className="avatar-xs">
                                                <Link to="#" className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                    <i className="ri-facebook-fill"></i>
                                                </Link>
                                            </div>
                                            <div className="avatar-xs">
                                                <Link to="#" className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                    <i className="ri-slack-fill"></i>
                                                </Link>
                                            </div>
                                            <div className="avatar-xs">
                                                <Link to="#" className="avatar-title bg-info-subtle text-info rounded fs-16">
                                                    <i className="ri-linkedin-fill"></i>
                                                </Link>
                                            </div>
                                            <div className="avatar-xs">
                                                <Link to="#" className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                    <i className="ri-dribbble-fill"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Row className="g-0 text-center">
                                        <Col xs={6}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1">{sideBar.projectCount || "124"}</h5>
                                                <p className="text-muted mb-0">Projects</p>
                                            </div>
                                        </Col>
                                        <Col xs={6}>
                                            <div className="p-3 border border-dashed border-start-0">
                                                <h5 className="mb-1">{sideBar.taskCount || "81"}</h5>
                                                <p className="text-muted mb-0">Tasks</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="p-3">
                                        <h5 className="fs-15 mb-3">Personal Details</h5>
                                        <div className="mb-3">
                                            <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Number</p>
                                            <h6>+(256) 2451 8974</h6>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Email</p>
                                            <h6>nancymartino@email.com</h6>
                                        </div>
                                        <div>
                                            <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">Location</p>
                                            <h6 className="mb-0">Carson City - USA</h6>
                                        </div>
                                    </div>
                                    <div className="p-3 border-top">
                                        <h5 className="fs-15 mb-4">File Manager</h5>
                                        <div className="d-flex mb-3">
                                            <div className="flex-shrink-0 avatar-xs">
                                                <div className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                                                    <i className="ri-image-2-line"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1"><Link to="#">Images</Link></h6>
                                                <p className="text-muted mb-0">4469 Files</p>
                                            </div>
                                            <div className="text-muted">
                                                12 GB
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <div className="flex-shrink-0 avatar-xs">
                                                <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-16">
                                                    <i className="ri-file-zip-line"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1"><Link to="#">Documents</Link></h6>
                                                <p className="text-muted mb-0">46 Files</p>
                                            </div>
                                            <div className="text-muted">
                                                3.46 GB
                                            </div>
                                        </div>
                                        <div className="d-flex mb-3">
                                            <div className="flex-shrink-0 avatar-xs">
                                                <div className="avatar-title bg-success-subtle text-success rounded fs-16">
                                                    <i className="ri-live-line"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1"><Link to="#">Media</Link></h6>
                                                <p className="text-muted mb-0">124 Files</p>
                                            </div>
                                            <div className="text-muted">
                                                4.3 GB
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="flex-shrink-0 avatar-xs">
                                                <div className="avatar-title bg-primary-subtle text-primary rounded fs-16">
                                                    <i className="ri-error-warning-line"></i>
                                                </div>
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <h6 className="mb-1"><Link to="#">Others</Link></h6>
                                                <p className="text-muted mb-0">18 Files</p>
                                            </div>
                                            <div className="text-muted">
                                                846 MB
                                            </div>
                                        </div>
                                    </div>
                                </OffcanvasBody>
                                <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                                    <button className="btn btn-light w-100"><i className="ri-question-answer-fill align-bottom ms-1"></i> Send Message</button>
                                    <Link to="/pages-profile" className="btn btn-primary w-100"><i className="ri-user-3-fill align-bottom ms-1"></i> View Profile</Link>
                                </div>
                            </Offcanvas>
                        </div>
                        <div className="py-4 mt-4 text-center" id="noresult" style={{ display: "none" }}>
                            <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#405189,secondary:#0ab39c" style={{ width: "72px", height: "72px" }}></lord-icon>
                            <h5 className="mt-4">Sorry! No Result Found</h5>
                        </div>
                    </Col>
                </Row>

                <svg className="bookmark-hide">
                    <symbol viewBox="0 0 24 24" stroke="currentColor" fill="var(--color-svg)" id="icon-star"><path strokeWidth=".4" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></symbol>
                </svg>

            </Container>
        </div>
    </React.Fragment>
);
};

export default CompanySelection;
