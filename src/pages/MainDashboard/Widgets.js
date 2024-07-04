import React, { useRef } from 'react';
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { ecomWidgets } from "../../common/data";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import required modules
import { Navigation, Pagination } from 'swiper/modules';

const Widgets = () => {
    const upperSwiperRef = useRef(null); // useRef for upper Swiper
    const lowerSwiperRef = useRef(null); // useRef for lower Swiper

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

    return (
        <React.Fragment>
            {/* Upper Swiper */}
            <div className="fc-toolbar-chunk mb-3">
                <div className="btn-group">
                    <button
                        type="button"
                        title="Previous month"
                        aria-pressed="false"
                        className="fc-prev-button btn btn-primary"
                        onClick={handleUpperPrevClick}
                    >
                        <span className="fa fa-chevron-left" role="img"></span>
                    </button>
                    <button
                        type="button"
                        title="Next month"
                        aria-pressed="false"
                        className="fc-next-button btn btn-primary"
                        onClick={handleUpperNextClick}
                    >
                        <span className="fa fa-chevron-right" role="img"></span>
                    </button>
                </div>
                <button
                    type="button"
                    title="This month"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary ms-3 d-none d-md-inline"
                >
                    INWARD
                </button>
                <button
                    type="button"
                    title="This month"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary d-inline d-md-none ms-3"
                >
                    INWARD
                </button>
            </div>
            <Swiper
                spaceBetween={16}
                slidesPerView={3} // Default number of slides per view
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1300: { slidesPerView: 3 },
                    2560: { slidesPerView: 6 },
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                loop={true}
                ref={upperSwiperRef} // Attach upperSwiperRef to upper Swiper
            >
                {ecomWidgets.map((item, key) => (
                    <SwiperSlide key={key}>
                        <Col xl={12} md={12} style={{ maxWidth: '100%', flex: '0 0 auto' }}>
                            <Card className="card-animate">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                                {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} %
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                                <CountUp
                                                    start={0}
                                                    prefix={item.prefix}
                                                    suffix={item.suffix}
                                                    separator={item.separator}
                                                    end={item.counter}
                                                    decimals={item.decimals}
                                                    duration={4}
                                                />
                                            </span></h4>
                                            <Link to="#" className="text-decoration-underline">{item.link}</Link>
                                        </div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor}>
                                                <i className={`${item.icon}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Lower Swiper */}
            <div className="fc-toolbar-chunk mb-3">
                <div className="btn-group">
                    <button
                        type="button"
                        title="Previous month"
                        aria-pressed="false"
                        className="fc-prev-button btn btn-primary"
                        onClick={handleLowerPrevClick}
                    >
                        <span className="fa fa-chevron-left" role="img"></span>
                    </button>
                    <button
                        type="button"
                        title="Next month"
                        aria-pressed="false"
                        className="fc-next-button btn btn-primary"
                        onClick={handleLowerNextClick}
                    >
                        <span className="fa fa-chevron-right" role="img"></span>
                    </button>
                </div>
                <button
                    type="button"
                    title="This month"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary ms-3 d-none d-md-inline"
                >
                    OUTWARD
                </button>
                <button
                    type="button"
                    title="This month"
                    aria-pressed="false"
                    className="fc-today-button btn btn-primary d-inline d-md-none ms-3"
                >
                    OUTWARD
                </button>
            </div>
            <Swiper
                spaceBetween={16}
                slidesPerView={3} // Default number of slides per view
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1300: { slidesPerView: 3 },
                    2560: { slidesPerView: 6 },
                }}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                loop={true}
                ref={lowerSwiperRef} // Attach lowerSwiperRef to lower Swiper
            >
                {ecomWidgets.map((item, key) => (
                    <SwiperSlide key={key}>
                        <Col xl={12} md={12} style={{ maxWidth: '100%', flex: '0 0 auto' }}>
                            <Card className="card-animate">
                                <CardBody>
                                    <div className="d-flex align-items-center">
                                        <div className="flex-grow-1 overflow-hidden">
                                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                                {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} %
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-end justify-content-between mt-4">
                                        <div>
                                            <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                                <CountUp
                                                    start={0}
                                                    prefix={item.prefix}
                                                    suffix={item.suffix}
                                                    separator={item.separator}
                                                    end={item.counter}
                                                    decimals={item.decimals}
                                                    duration={4}
                                                />
                                            </span></h4>
                                            <Link to="#" className="text-decoration-underline">{item.link}</Link>
                                        </div>
                                        <div className="avatar-sm flex-shrink-0">
                                            <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor}>
                                                <i className={`${item.icon}`}></i>
                                            </span>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </SwiperSlide>
                ))}
            </Swiper>
        </React.Fragment>
    );
};

export default Widgets;
