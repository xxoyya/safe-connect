import "./Footer.css";
import logo_title from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* 로고 */}
        <div className="footer-logo">
          <h3>숭덕숭덕</h3>
          <img src={logo_title} alt="로고" />
        </div>
        <div className="footer-columns">
          {/* 기획 */}
          <div className="footer-column">
            <h4 className="role">기획</h4>
            <p>숭실대 전자정보공학부</p>
            <h4>이준우</h4>
          </div>
          {/* 프론트엔드 */}
          <div className="footer-column">
            <h4 className="role">프론트엔드</h4>
            <p>숭실대 글로벌미디어학부</p>
            <h4>김소현</h4>

            <p>덕성여대 디지털소프트웨어공학부</p>
            <h4>이서진</h4>
            
            <p>덕성여대 디지털소프트웨어공학부</p>
            <h4>최영진</h4>
          </div>
          {/* 백엔드 */}
          <div className="footer-column">
            <h4 className="role">백엔드</h4>
            <p>숭실대 글로벌미디어학부</p>
            <h4>김세훈</h4>
          </div>
        </div>

      </div>
    </footer>
  );
}