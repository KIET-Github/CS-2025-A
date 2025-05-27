import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import NavbarComponent from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import React, { useState } from "react";
import "./App.css";
import img1 from "./assests/homepage_1.ec0693c713f588539e742ad9ca0b7794.svg";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/actionCreators/authActionCreators";

const tabs = [
  {
    label: "Primary",
    content: "Keep the list of all the mails you received from the office.",
    icon: "📥",
  },
  { label: "Sent", content: "Stores all the mails that got sent.", icon: "✉️" },
  {
    label: "Approved",
    content: "Contains approved mails ready for dispatch.",
    icon: "✅",
  },
  {
    label: "Rejected",
    content: "Contains rejected mails with reasons.",
    icon: "❌",
  },
  {
    label: "Pending",
    content:
      "Stores all the mails that got sent and are in process in the the office.",
    icon: "⏳",
  },
];

const benefits = [
  {
    title: "10000",
    subtitle: "Papers",
    icon: "📄",
    description:
      "Roughly 70% of office waste is paper waste. In total an average office worker uses 10000 pages per year.",
  },
  {
    title: "Unlimited",
    subtitle: "Storage",
    icon: "💾",
    description:
      "Feel free to share even large files with unlimited storage. Never stop yourself because of space to store.",
  },
  {
    title: "5 - 10",
    subtitle: "Days",
    icon: "✅",
    description:
      "Fastest speed to sign digitally a document using Technology, Machine learning and a lot of research on office problems.",
  },
  {
    title: "528",
    subtitle: "Hours",
    icon: "⏳",
    description:
      "A study by Xerox found that businesses can save 528 hours per employee per year by digitizing things.",
  },
];

const App = () => {
  const [activeTab, setActiveTab] = useState("Primary");
  const currentTab = tabs.find((tab) => tab.label === activeTab);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <div className="App">
      <ToastContainer position="bottom-right" />

      <Switch>
        <Route exact path={"/"}>
          <NavbarComponent />

          {/* <h1>Welcome to file management system</h1> */}

          <div className="landing-container">
            <div className="text-section">
              <h1>A digital way of managing documents</h1>
              <p>
                Get things done faster with a new Document Manager. <br />
                Inbuilt file tracker for transparency. Do more with email
                templates and a fresh UI.
              </p>
              <button className="cta-button">Let's Go !!!</button>
            </div>
            <div className="image-section">
              <img src={img1} alt="Document Manager Illustration" />
            </div>
          </div>

          <div className="landing-page">
            <div className="tabs-section">
              <div className="tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    className={`tab ${activeTab === tab.label ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.label)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                <p>{currentTab.content}</p>
                <div className="tab-icon">{currentTab.icon}</div>
              </div>
            </div>

            <div className="bottom-message">
              <em>
                <strong>
                  We help reduce time delay and scale up productivity in
                  government offices.
                </strong>
              </em>
            </div>
          </div>

          <div className="benefits-section">
            <h2>Why Document Manager ?</h2>
            <div className="benefit-cards">
              {benefits.map((item, index) => (
                <div className="benefit-card" key={index}>
                  <div className="benefit-icon">{item.icon}</div>
                  <h3 className="benefit-title">
                    <span className="highlight">{item.title}</span>{" "}
                    {item.subtitle}
                  </h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard">
            <div className="left-panel">
              <h1 className="headline">One place for all your work.</h1>
            </div>

            <div className="right-panel">
              <div className="app-container">
                <div className="sidebar">
                  <button className="new-message">+ New Message</button>
                  <nav>
                    <ul>
                      <li className="active">📥 Primary</li>
                      <li>📤 Sent</li>
                      <li>
                        ✅ Approved <span>3</span>
                      </li>
                      <li>❌ Rejected</li>
                      <li>
                        🕓 Pending <span>2</span>
                      </li>
                      <li>
                        🔔 Notifications <span>5</span>
                      </li>
                      <li>📝 Drafts</li>
                      <li>👤 Profile</li>
                    </ul>
                  </nav>
                  <button className="logout">🔗 Logout</button>
                </div>

                <div className="message-list">
                  <input
                    type="text"
                    placeholder="Search Here"
                    className="search-bar"
                  />
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="message-item">
                      <h4>Leave Application</h4>
                      <span>John Doe</span>
                      <p>Lorem ipsum dolor sit amet, consectetur...</p>
                      <small>
                        {i === 0
                          ? "Just Now"
                          : i === 1
                          ? "1 hr"
                          : i === 2
                          ? "3 hr"
                          : "Yesterday"}
                      </small>
                    </div>
                  ))}
                </div>

                <div className="message-view">
                  <div className="message-header">
                    <span>⭐</span>
                    <span>↩️</span>
                    <span>🗑️</span>
                    <span>1 of 50</span>
                    <span>◀️ ▶️</span>
                  </div>
                  <div className="message-body">
                    <h3>John Doe</h3>
                    <h2>Leave Application</h2>
                    <p>
                      To
                      <br />
                      The Manager
                      <br />
                      Hero Moto Corp.
                    </p>
                    <p>
                      <strong>Subject:</strong> One day leave application
                    </p>
                    <p>
                      I am writing this to inform you that I will be taking
                      leave on ___ (date) as I have to ___ (mention reason...).
                      I have completed all my tasks...
                    </p>
                    <p>
                      Thank you.
                      <br />
                      Yours Sincerely,
                      <br />
                      John Doe
                    </p>
                    <div className="attachments">
                      <img
                        src="https://via.placeholder.com/100"
                        alt="attachment"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="attachment"
                      />
                      <img
                        src="https://via.placeholder.com/100"
                        alt="attachment"
                      />
                    </div>
                    <div className="reply-box">
                      <input type="text" placeholder="Message Here" />
                      <button>Send 🚀</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-wrapper">
            <div className="hero-section">
              <h1>Experience The Speed</h1>
              <h2>Paperless. Fast. Smooth.</h2>
              <p>
                Companion App now available to track the status of your files on
                the go.
              </p>
            </div>

            <div className="discussion-cta">
              <h2>Wanna Have A Discussion ?</h2>
              <button>Chat With Us</button>
            </div>

            <footer className="footer">
              <p>
                Faster, Better, and Smoother. Made with ♥ by the team Coders
                Royale
              </p>
            </footer>
          </div>
        </Route>
        <Route exact path="/login" component={() => <Login />}></Route>
        <Route exact path="/signup" component={() => <Register />}></Route>
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
