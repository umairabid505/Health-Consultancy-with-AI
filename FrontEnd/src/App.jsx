import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import ChatBotRender from "./components/ChatBotRender";

const App = () => {
  const [loading, setLoading] = useState(true); // 3-second enforced loading
  const navigation = useNavigation(); // Track navigation state
  const { pathname } = useLocation();

  useEffect(() => {
    // Simulate a strict 3-second loading
    const timer = setTimeout(() => {
      setLoading(false); // Allow loading to complete after 3 seconds
    }, 2300);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  // when user in bottom click other tab its move to top
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, [pathname]);

  // If navigation is still loading or 3-second enforced loading is active
  if (loading || navigation.state === "loading") {
    return (
      <div className="container loader-section">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
      <ChatBotRender />
      <Footer />
    </>
  );
};

export default App;
