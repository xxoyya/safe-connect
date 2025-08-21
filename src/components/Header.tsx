import { NavLink, Link } from "react-router-dom";
import "./Header.css";
import logo_title from "../assets/logo_title.png";

export default function Header() {
  return (
    <header className="sc-header">
      <div>
        <Link to="/">
          <img src={logo_title} alt="Safe Connect" className="sc-logo" />
        </Link>
      </div>

      <nav className="sc-gnb">
        <div className="site-container sc-gnb-row">
          <NavLink to="/" end className="sc-link">
            HOME
          </NavLink>
          <NavLink to="/edu" className="sc-link">
            교육 콘텐츠
          </NavLink>
          <NavLink to="/data" className="sc-link">
            데이터 보기
          </NavLink>
          <NavLink to="/self" className="sc-link">
            자가진단
          </NavLink>
          <NavLink to="/chat" className="sc-link">
            챗봇 상담
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
