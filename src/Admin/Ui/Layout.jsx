import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import img from "../../images/icons/logo-02.png";
import avatar from "../velzon/assets/images/users/avatar-1.jpg";
import UseDetailUser from "../../Hook/useDetailUser";
import { Spin } from "antd";
import FullScreenButton from "./FullScreen";
const Layout = () => {
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const dropdownRef = useRef(null);
  const handleClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setProfile(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const {pathname}=useLocation();
  const capitalizeFirstLetter = (str) =>str? str.charAt(0).toUpperCase() + str.slice(1):"Dashboards";

  const thirdPathSegment = capitalizeFirstLetter(pathname.split("/")[2]);
  const { data, isLoading } = UseDetailUser();
  if (isLoading) {
    return (
      <Spin
        size="large"
        className="h-[50vh] mt-[100px] flex items-center justify-center w-full "
      />
    );
  }
  return (
    <div>
      <>
        <div id="layout-wrapper">
          <header id="page-topbar">
            <div className="layout-width">
              <div className="navbar-header">
                <div className="d-flex">
                  {/* LOGO */}

                  <button
                    type="button"
                    className="btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                    id="topnav-hamburger-icon"
                  >
                    <span className="hamburger-icon">
                      <span />
                      <span />
                      <span />
                    </span>
                  </button>
                  {/* App Search*/}
                  <form className="app-search d-none d-md-block">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control focus:bg-[#f3f3f9]"
                        placeholder="Search..."
                        autoComplete="off"
                        id="search-options"
                      />
                      <span className="mdi mdi-magnify search-widget-icon" />
                      <span
                        className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                        id="search-close-options"
                      />
                    </div>
                    <div
                      className="dropdown-menu dropdown-menu-lg"
                      id="search-dropdown"
                    >
                      <div data-simplebar="" style={{ maxHeight: 320 }}>
                        {/* item*/}
                        <div className="dropdown-header">
                          <h6 className="text-overflow text-muted mb-0 text-uppercase">
                            Recent Searches
                          </h6>
                        </div>
                        <div className="dropdown-item bg-transparent text-wrap">
                          <a
                            href="index.html"
                            className="btn btn-soft-secondary btn-sm rounded-pill"
                          >
                            how to setup <i className="mdi mdi-magnify ms-1" />
                          </a>
                          <a
                            href="index.html"
                            className="btn btn-soft-secondary btn-sm rounded-pill"
                          >
                            buttons <i className="mdi mdi-magnify ms-1" />
                          </a>
                        </div>
                        {/* item*/}
                        <div className="dropdown-header mt-2">
                          <h6 className="text-overflow text-muted mb-1 text-uppercase">
                            Pages
                          </h6>
                        </div>
                        {/* item*/}
                        <Link className="dropdown-item notify-item">
                          <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                          <span>Analytics Dashboard</span>
                        </Link>
                        {/* item*/}
                        <Link className="dropdown-item notify-item">
                          <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                          <span>Help Center</span>
                        </Link>
                        {/* item*/}
                        <Link className="dropdown-item notify-item">
                          <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                          <span>My account settings</span>
                        </Link>
                        {/* item*/}
                        <div className="dropdown-header mt-2">
                          <h6 className="text-overflow text-muted mb-2 text-uppercase">
                            Members
                          </h6>
                        </div>
                        <div className="notification-list">
                          {/* item */}
                          <Link className="dropdown-item notify-item py-2">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-2.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <h6 className="m-0">Angela Bernier</h6>
                                <span className="fs-11 mb-0 text-muted">
                                  Manager
                                </span>
                              </div>
                            </div>
                          </Link>
                          {/* item */}
                          <Link className="dropdown-item notify-item py-2">
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-3.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <h6 className="m-0">David Grasso</h6>
                                <span className="fs-11 mb-0 text-muted">
                                  Web Designer
                                </span>
                              </div>
                            </div>
                          </Link>
                          {/* item */}
                          <Link
                            to="#"
                            className="dropdown-item notify-item py-2"
                          >
                            <div className="d-flex">
                              <img
                                src="assets/images/users/avatar-5.jpg"
                                className="me-3 rounded-circle avatar-xs"
                                alt="user-pic"
                              />
                              <div className="flex-grow-1">
                                <h6 className="m-0">Mike Bunch</h6>
                                <span className="fs-11 mb-0 text-muted">
                                  React Developer
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </div>
                      <div className="text-center pt-3 pb-1">
                        <a
                          href="pages-search-results.html"
                          className="btn btn-primary btn-sm"
                        >
                          View All Results{" "}
                          <i className="ri-arrow-right-line ms-1" />
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="d-flex align-items-center">
                  <div className="dropdown d-md-none topbar-head-dropdown header-item">
                    <button
                      type="button"
                      className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                      id="page-header-search-dropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-search fs-22" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                      aria-labelledby="page-header-search-dropdown"
                    >
                      <form className="p-3">
                        <div className="form-group m-0">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search ..."
                              aria-label="Recipient's username"
                            />
                            <button className="btn btn-primary" type="submit">
                              <i className="mdi mdi-magnify" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="ms-1 header-item d-none d-sm-flex">
                    <FullScreenButton />
                  </div>
                  <div className="ms-1 header-item d-none d-sm-flex">
                    <button
                      type="button"
                      className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle light-dark-mode"
                    >
                      <i className="bx bx-moon fs-22" />
                    </button>
                  </div>
                  <div
                    className="dropdown topbar-head-dropdown ms-1 header-item"
                    id="notificationDropdown"
                  >
                    <button
                      type="button"
                      className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                      id="page-header-notifications-dropdown"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bx bx-bell fs-22" />
                      <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                        3
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                      aria-labelledby="page-header-notifications-dropdown"
                    >
                      <div className="dropdown-head bg-primary bg-pattern rounded-top">
                        <div className="p-3">
                          <div className="row align-items-center">
                            <div className="col">
                              <h6 className="m-0 fs-16 fw-semibold text-white">
                                Notifications
                              </h6>
                            </div>
                            <div className="col-auto dropdown-tabs">
                              <span className="badge bg-light-subtle text-body fs-13">
                                4 New
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="px-2 pt-2">
                          <ul
                            className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                            data-dropdown-tabs="true"
                            id="notificationItemsTab"
                            role="tablist"
                          >
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#all-noti-tab"
                                role="tab"
                                aria-selected="true"
                              >
                                All (4)
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#messages-tab"
                                role="tab"
                                aria-selected="false"
                              >
                                Messages
                              </a>
                            </li>
                            <li className="nav-item waves-effect waves-light">
                              <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#alerts-tab"
                                role="tab"
                                aria-selected="false"
                              >
                                Alerts
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div
                        className="tab-content position-relative"
                        id="notificationItemsTabContent"
                      >
                        <div
                          className="tab-pane fade show active py-2 ps-2"
                          id="all-noti-tab"
                          role="tabpanel"
                        >
                          <div
                            data-simplebar=""
                            style={{ maxHeight: 300 }}
                            className="pe-2"
                          >
                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                              <div className="d-flex">
                                <div className="avatar-xs me-3 flex-shrink-0">
                                  <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                    <i className="bx bx-badge-check" />
                                  </span>
                                </div>
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-2 lh-base">
                                      Your <b>Elite</b> author Graphic
                                      Optimization
                                      <span className="text-secondary">
                                        reward
                                      </span>{" "}
                                      is ready!
                                    </h6>
                                  </a>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" />{" "}
                                      Just 30 sec ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="all-notification-check01"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="all-notification-check01"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-2.jpg"
                                  className="me-3 rounded-circle avatar-xs flex-shrink-0"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      Angela Bernier
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      Answered to your comment on the cash flow
                                      forecast's graph 🔔.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 48
                                      min ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="all-notification-check02"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="all-notification-check02"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                              <div className="d-flex">
                                <div className="avatar-xs me-3 flex-shrink-0">
                                  <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                    <i className="bx bx-message-square-dots" />
                                  </span>
                                </div>
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-2 fs-13 lh-base">
                                      You have received
                                      <b className="text-success">20</b> new
                                      messages in the conversation
                                    </h6>
                                  </a>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 2
                                      hrs ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="all-notification-check03"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="all-notification-check03"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item position-relative">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-8.jpg"
                                  className="me-3 rounded-circle avatar-xs flex-shrink-0"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      Maureen Gibson
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      We talked about a project on linkedin.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 4
                                      hrs ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="all-notification-check04"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="all-notification-check04"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-3 text-center view-all">
                              <button
                                type="button"
                                className="btn btn-soft-success waves-effect waves-light"
                              >
                                View All Notifications
                                <i className="ri-arrow-right-line align-middle" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade py-2 ps-2"
                          id="messages-tab"
                          role="tabpanel"
                          aria-labelledby="messages-tab"
                        >
                          <div
                            data-simplebar=""
                            style={{ maxHeight: 300 }}
                            className="pe-2"
                          >
                            <div className="text-reset notification-item d-block dropdown-item">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-3.jpg"
                                  className="me-3 rounded-circle avatar-xs"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      James Lemire
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      We talked about a project on linkedin.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 30
                                      min ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="messages-notification-check01"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="messages-notification-check01"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-2.jpg"
                                  className="me-3 rounded-circle avatar-xs"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      Angela Bernier
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      Answered to your comment on the cash flow
                                      forecast's graph 🔔.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 2
                                      hrs ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="messages-notification-check02"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="messages-notification-check02"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-6.jpg"
                                  className="me-3 rounded-circle avatar-xs"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      Kenneth Brown
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      Mentionned you in his comment on 📃
                                      invoice #12501.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 10
                                      hrs ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="messages-notification-check03"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="messages-notification-check03"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-reset notification-item d-block dropdown-item">
                              <div className="d-flex">
                                <img
                                  src="assets/images/users/avatar-8.jpg"
                                  className="me-3 rounded-circle avatar-xs"
                                  alt="user-pic"
                                />
                                <div className="flex-grow-1">
                                  <a href="#!" className="stretched-link">
                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                      Maureen Gibson
                                    </h6>
                                  </a>
                                  <div className="fs-13 text-muted">
                                    <p className="mb-1">
                                      We talked about a project on linkedin.
                                    </p>
                                  </div>
                                  <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                    <span>
                                      <i className="mdi mdi-clock-outline" /> 3
                                      days ago
                                    </span>
                                  </p>
                                </div>
                                <div className="px-2 fs-15">
                                  <div className="form-check notification-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="messages-notification-check04"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="messages-notification-check04"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="my-3 text-center view-all">
                              <button
                                type="button"
                                className="btn btn-soft-success waves-effect waves-light"
                              >
                                View All Messages
                                <i className="ri-arrow-right-line align-middle" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade p-4"
                          id="alerts-tab"
                          role="tabpanel"
                          aria-labelledby="alerts-tab"
                        />
                        <div
                          className="notification-actions"
                          id="notification-actions"
                        >
                          <div className="d-flex text-muted justify-content-center">
                            Select
                            <div
                              id="select-content"
                              className="text-body fw-semibold px-1"
                            >
                              0
                            </div>
                            Result
                            <button
                              type="button"
                              className="btn btn-link link-danger p-0 ms-3"
                              data-bs-toggle="modal"
                              data-bs-target="#removeNotificationModal"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown ms-sm-3 header-item topbar-user">
                    <button
                      type="button"
                      className="px-3 rounded-md"
                      onClick={() => setProfile(!profile)}
                    >
                      <span className="d-flex align-items-center">
                        <img
                          className="rounded-circle header-profile-user"
                          src={data.avatar}
                          alt="Header Avatar"
                        />
                        <span className="text-start ms-xl-2">
                          <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                            {data.name}
                          </span>
                          <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                            {data.role === 1 ? "Admin" : "User"}
                          </span>
                        </span>
                      </span>
                    </button>
                    <div
                      className={`dropdown-menu dropdown-menu-end ${profile ? "show" : ""}`}
                      ref={dropdownRef}
                      style={{
                        position: "absolute",
                        inset: "0px 0px auto auto",
                        margin: "0px",
                        transform: "translate3d(0px, 64.8px, 0px)",
                      }}
                    >
                      {/* item*/}
                      <h6 className="dropdown-header">Welcome Anna!</h6>
                      <a className="dropdown-item" href="pages-profile.html">
                        <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Profile</span>
                      </a>
                      <a className="dropdown-item" href="apps-chat.html">
                        <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Messages</span>
                      </a>
                      <a
                        className="dropdown-item"
                        href="apps-tasks-kanban.html"
                      >
                        <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Taskboard</span>
                      </a>
                      <a className="dropdown-item" href="pages-faqs.html">
                        <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Help</span>
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="pages-profile.html">
                        <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">
                          Balance : <b>$5971.67</b>
                        </span>
                      </a>
                      <a
                        className="dropdown-item"
                        href="pages-profile-settings.html"
                      >
                        <span className="badge bg-success-subtle text-success mt-1 float-end">
                          New
                        </span>
                        <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Settings</span>
                      </a>
                      <a
                        className="dropdown-item"
                        href="auth-lockscreen-basic.html"
                      >
                        <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />
                        <span className="align-middle">Lock screen</span>
                      </a>
                      <a
                        className="dropdown-item"
                        href="auth-logout-basic.html"
                      >
                        <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />
                        <span className="align-middle" data-key="t-logout">
                          Logout
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          {/* removeNotificationModal */}
          <div
            id="removeNotificationModal"
            className="modal fade zoomIn"
            tabIndex={-1}
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="NotificationModalbtn-close"
                  />
                </div>
                <div className="modal-body">
                  <div className="mt-2 text-center">
                    <lord-icon
                      src="https://cdn.lordicon.com/gsqxdxog.json"
                      trigger="loop"
                      colors="primary:#f7b84b,secondary:#f06548"
                      style={{ width: 100, height: 100 }}
                    />
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                      <h4>Are you sure ?</h4>
                      <p className="text-muted mx-4 mb-0">
                        Are you sure you want to remove this Notification ?
                      </p>
                    </div>
                  </div>
                  <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button
                      type="button"
                      className="btn w-sm btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn w-sm btn-danger"
                      id="delete-notification"
                    >
                      Yes, Delete It!
                    </button>
                  </div>
                </div>
              </div>
              {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
          </div>
          {/* /.modal */}
          {/* ========== App Menu ========== */}
          <div className="app-menu navbar-menu bg-[#405189]">
            {/* LOGO */}
            <div className="navbar-brand-box w-64 py-4 ml-9">
              {/* Dark Logo*/}

              {/* Light Logo*/}
              <Link to={""} className="logo">
                <span className="logo-lg ">
                  <img src={img} alt="" />
                </span>
              </Link>
            </div>
            <div
              id="scrollbar "
              className="overflow-auto h-full"
              style={{ scrollbarWidth: "none" }}
            >
              <div className="container-fluid">
                <div id="two-column-menu" />
                <ul className="navbar-nav" id="navbar-nav">
                  <li className="menu-title">
                    <span data-key="t-menu">Menu</span>
                  </li>
                  <li className="nav-item">
                    <Link to="Dashboards" className="nav-link menu-link">
                      <i className="ri-dashboard-2-line" />
                      <span data-key="t-dashboards">Dashboards</span>
                    </Link>
                  </li>
                  {/* end Dashboard Menu */}
                  <li className="nav-item">
                    <Link to="products" className="nav-link menu-link ">
                      <i className="ri-apps-2-line" />
                      <span data-key="t-apps">Products</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="order" className="nav-link menu-link">
                      <img
                        src="https://media-public.canva.com/fQMlo/MAF38jfQMlo/1/tl.png"
                        alt=""
                        width={20}
                        style={{ filter: "invert(1) hue-rotate(180deg)" }}
                        className="me-2"
                      />
                      <span data-key="t-layouts">Order</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="order_detail" className="nav-link menu-link">
                      <i className="ri-layout-3-line" />
                      <span data-key="t-layouts">Baner</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="order_detail" className="nav-link menu-link">
                      <img
                        src="https://media-public.canva.com/TbR0s/MADa1xTbR0s/2/tl.png"
                        alt=""
                        width={20}
                        style={{ filter: "invert(1) hue-rotate(180deg)" }}
                        className="me-2"
                      />
                      <span data-key="t-layouts">Blogs</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="categories" className="nav-link menu-link">
                      <i className="ri-layout-3-line" />
                      <span data-key="t-layouts">Categories</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="order_detail" className="nav-link menu-link">
                      <i class="fa fa-comment"></i>
                      <span data-key="t-layouts">Comments</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="customers" className="nav-link menu-link">
                      <i class="fa fa-user"></i>
                      <span data-key="t-layouts">User</span>
                    </Link>
                  </li>
                  {/* end Dashboard Menu */}
                  <li className="menu-title">
                    <i className="ri-more-fill" />
                    <span data-key="t-pages">Pages</span>
                  </li>

                  <li className="nav-item">
                    <div
                      className="nav-link menu-link relative"
                      data-bs-toggle="collapse"
                      role="button"
                      aria-expanded={open ? "true" : "false"}
                      aria-controls="sidebarAuth"
                      onClick={() => setOpen(!open)}
                    >
                      <i className="ri-account-circle-line" />
                      <span data-key="t-authentication">Authentication</span>
                    </div>
                    <div
                      className={`menu-dropdown ${open ? "show" : "collapse"}`}
                    >
                      <ul className="nav nav-sm flex-column">
                        <li className="nav-item">
                          <Link to="signin" className="nav-link">
                            Sign In
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/admin/login" className="nav-link">
                            Sign Up
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/admin/reset" className="nav-link">
                            Password Reset
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="" className="nav-link">
                            Password Create
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="" className="nav-link">
                            Lock Screen
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="" className="nav-link">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="profile"
                      className="nav-link menu-link relative"
                      role="button"
                    >
                      <i className="ri-pages-line" />
                      <span>Profile</span>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Sidebar */}
            </div>
            <div className="sidebar-background" />
          </div>
          {/* Left Sidebar End */}
          {/* Vertical Overlay*/}
          <div className="vertical-overlay" />
          {/* ============================================================== */}
          {/* Start right Content here */}
          {/* ============================================================== */}
          <div className="main-content overflow-hidden">
            <div className="page-content">
              <div className="container-fluid">
                {/* start page title */}
                <div className="row">
                  <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                      <h4 className="mb-sm-0">{thirdPathSegment}</h4>
                      <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                          <li className="breadcrumb-item">
                            <Link>Admin</Link>
                          </li>
                          <li className="breadcrumb-item active">{thirdPathSegment}</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                {/* end row */}
              </div>
              {/* container-fluid */}
            </div>

            <Outlet></Outlet>
            {/* End Page-content */}
          </div>
          {/* end main content*/}
        </div>
      </>
    </div>
  );
};

export default Layout;
