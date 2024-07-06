import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { fetchMainDashboardData } from '../../slices/thunks';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { createSelector } from 'reselect';
import 'font-awesome/css/font-awesome.min.css';
import CountUp from 'react-countup';

const Widgets = () => {
    const dispatch = useDispatch();

    const selectLayoutState = (state) => state.MainDashboard;

    const userprofileData = createSelector(
        selectLayoutState,
        (state) => ({ user: state.user, success: state.success, error: state.error })
    );

    const { user, success, error } = useSelector(userprofileData);

    useEffect(() => {
        dispatch(fetchMainDashboardData());
    }, [dispatch]);

    const upperSwiperRef = useRef(null);
    const lowerSwiperRef = useRef(null);

    const handleUpperPrevClick = () => {
        if (upperSwiperRef.current && upperSwiperRef.current.swiper) {
            upperSwiperRef.current.swiper.slidePrev();
        }
    };

    const handleUpperNextClick = () => {
        if (upperSwiperRef.current && upperSwiperRef.current.swiper) {
            upperSwiperRef.current.swiper.slideNext();
        }
    };

    const handleLowerPrevClick = () => {
        if (lowerSwiperRef.current && lowerSwiperRef.current.swiper) {
            lowerSwiperRef.current.swiper.slidePrev();
        }
    };

    const handleLowerNextClick = () => {
        if (lowerSwiperRef.current && lowerSwiperRef.current.swiper) {
            lowerSwiperRef.current.swiper.slideNext();
        }
    };

    const getIconAndColor = (voucherType) => {
        switch (voucherType) {
            case 'Security Gate':
                return { icon: 'fa fa-lock', bgColor: 'green' };
            case 'Weigh Bridge':
                return { icon: 'fa fa-balance-scale', bgColor: 'blue' };
            case 'ICFAI HYD':
                return { icon: 'fa fa-university', bgColor: 'red' };
            default:
                return { icon: 'fa fa-question', bgColor: 'gray' };
        }
    };

    return (
        <React.Fragment>
            {/* <div className="fc-toolbar-chunk mb-3">
                <div className="btn-group">
                    <button
                        type="button"
                        title="Previous Card"
                        aria-pressed="false"
                        className="fc-prev-button btn btn-primary"
                        onClick={handleUpperPrevClick}
                    >
                        <span className="fa fa-chevron-left" role="img"></span>
                    </button>
                    <button
                        type="button"
                        title="Next Card"
                        aria-pressed="false"
                        className="fc-next-button btn btn-primary"
                        onClick={handleUpperNextClick}
                    >
                        <span className="fa fa-chevron-right" role="img"></span>
                    </button>
                </div>
                <button
                    type="button"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary ms-3 d-none d-md-inline"
                >
                    INWARD
                </button>
                <button
                    type="button"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary d-inline d-md-none ms-3"
                >
                    INWARD
                </button>
            </div> */}
            <Swiper
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1300: { slidesPerView: 3 },
                    2560: { slidesPerView: 6 },
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                loop={true}
                ref={upperSwiperRef}
            >
                {user.map((item, index) => {
                    const { icon, bgColor } = getIconAndColor(item.voucherType);
                    return (
                        <SwiperSlide key={index}>
                            <Col xl={12} md={12} style={{ maxWidth: '100%', flex: '0 0 auto' }}>
                                <Card className="card-animate">
                                    <CardBody>
                                        {item.argumentValue.map((arg, idx) => (
                                            <div key={idx} className="d-flex align-items-center mb-2">
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-2">{arg.argument}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <h5 className="fs-14 mb-0">
                                                        <CountUp
                                                            start={0}
                                                            end={parseFloat(arg.value)}
                                                            duration={4}
                                                        />
                                                        {' '}
                                                    </h5>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                                    <span className="counter-value"></span>{item.voucherType}
                                                </h4>
                                                <Link to="#" className="text-decoration-underline">Click to view More Details</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className={`avatar-title rounded fs-3 bg-${bgColor}`}>
                                                    <i className={icon}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {/* <div className="fc-toolbar-chunk mb-3">
                <div className="btn-group">
                    <button
                        type="button"
                        title="Previous Card"
                        aria-pressed="false"
                        className="fc-prev-button btn btn-primary"
                        onClick={handleLowerPrevClick}
                    >
                        <span className="fa fa-chevron-left" role="img"></span>
                    </button>
                    <button
                        type="button"
                        title="Next Card"
                        aria-pressed="false"
                        className="fc-next-button btn btn-primary"
                        onClick={handleLowerNextClick}
                    >
                        <span className="fa fa-chevron-right" role="img"></span>
                    </button>
                </div>
                <button
                    type="button"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary ms-3 d-none d-md-inline"
                >
                    OUTWARD
                </button>
                <button
                    type="button"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary d-inline d-md-none ms-3"
                >
                    OUTWARD
                </button>
            </div> */}
            {/* <Swiper
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1300: { slidesPerView: 3 },
                    2560: { slidesPerView: 6 },
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                loop={true}
                ref={lowerSwiperRef}
            >
                {user.map((item, index) => {
                    const { icon, bgColor } = getIconAndColor(item.voucherType);
                    return (
                        <SwiperSlide key={index}>
                            <Col xl={12} md={12} style={{ maxWidth: '100%', flex: '0 0 auto' }}>
                                <Card className="card-animate">
                                    <CardBody>
                                        {item.argumentValue.map((arg, idx) => (
                                            <div key={idx} className="d-flex align-items-center mb-2">
                                                <div className="flex-grow-1 overflow-hidden">
                                                    <p className="text-uppercase fw-medium text-muted text-truncate mb-2">{arg.argument}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <h5 className="fs-14 mb-0">
                                                        <CountUp
                                                            start={0}
                                                            end={parseFloat(arg.value)}
                                                            duration={4}
                                                        />
                                                        {' '}
                                                    </h5>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                                    <span className="counter-value"></span>{item.voucherType}
                                                </h4>
                                                <Link to="#" className="text-decoration-underline">Click to view More Details</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className={`avatar-title rounded fs-3 bg-${bgColor}`}>
                                                    <i className={icon}></i>
                                                </span>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </SwiperSlide>
                    );
                })}
            </Swiper> */}
        </React.Fragment>
    );
};

export default Widgets;
