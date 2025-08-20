import "./Header.css";
import logo_title from "../assets/logo_title.png";

export default function Header() {
  return (
    <header className="sc-header">
      <div className="site-container sc-top">
        <img src={logo_title} alt="Safe Connect" className="sc-logo" />
      </div>

      <nav className="sc-gnb">
        <div className="site-container sc-gnb-row">
          <a className="sc-link sc-active" href="#">HOME</a>
          <a className="sc-link" href="#">교육 콘텐츠</a>
          <a className="sc-link" href="#">데이터 보기</a>
          <a className="sc-link" href="#">자가진단</a>
          <a className="sc-link" href="#">챗봇 상담</a>
        </div>
      </nav>
    </header>
  );
}
