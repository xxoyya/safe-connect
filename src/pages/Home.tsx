import "./Home.css";
import chat_bubble from "../assets/chat_bubble.png";
import link from "../assets/link.png";
import arrow from "../assets/arrow.png";
import arrow2 from "../assets/arrow2.png";

export default function Home() {
  return (
    <div>
      <section className="banner">
        <div className="banner-row">
          <div>
            <img src={chat_bubble} alt="말풍선" className="img-bubble" />
          </div>
          <div className="banner-right">
            <p className="banner-eyebrow">
              당신과 <strong>함께</strong>하는 <br />든든한 연결
            </p>
          </div>
        </div>
      </section>

      <section className="hero">
        <div className="hero-grid">
          <div className="string">
            <h1 className="title">SafeNet</h1>
            <p className="subtitle">
              가정폭력 없는 사회, 당신의 작은 참여로 시작됩니다. <br />
              지금 함께해 주세요!
            </p>
          </div>

          <div>
            <img src={link} alt="연결 체인" className="chain-img" />
          </div>
        </div>
      </section>



    <section id="background" className="site-container background">
    <div className="section-pill">개발 배경</div>

    <div className="bg-row">
        <div className="bg-label"><span>문제 상황</span></div>
        <div className="bg-leader" aria-hidden />
        <div className="bg-content">
        <ul className="dot-list">
            <li>매년 가정폭력 신고 건수 증가 / 피해자 지원시설 지역별 편차 심화</li>
            <li>내 상황이 위험한지, 어디서 도움을 받을 수 있는지 즉시 알기 어려움</li>
            <li>사회 전반적으로 가정폭력에 대한 인식이 부족해 은폐된 피해가 존재</li>
        </ul>
        </div>
    </div>


    <div className="bg-row">
    <div className="bg-label"><span>문제 정의</span></div>
    <div className="bg-leader" aria-hidden />
      <div className="bg-content">
          <p className="definition">
          ” 가정폭력 문제는 데이터로 드러나는 
          <span className="highlight-blue"> 신고 · 시설 격차 </span>
          뿐만 아니라,<br/>
          <span className="highlight-red"> 인지 부족 → 도움 미흡 → 법률적 공백 </span>
          이 연결된 복합적 문제 ”
          </p>
      </div>
    </div>

    <div className="bg-bottom">
        <img src={arrow} alt="" className="arrow-img" />
        <p className="bg-summary">
            따라서 데이터 기반 정책 지원 + 시민 자가진단 + 상담/법률 연결 + 인식 개선 교육을 <br />
            모두 아우르는 통합 플랫폼이 필요
        </p>
    </div>
    </section>

    <section id="effect" className="site-container effect">
      <div className="section-pill">기대효과</div>

      <div className="effect-grid">
        <div className="effect-col">
          <h3 className="effect-title">정책적 효과</h3>
          <div className="effect-dots" />
          <div className="effect-box">
            지역별 격차 시각화 <br /> + <br /> 시설 수요 예측
          </div>
          <img src={arrow2} alt="아래 화살표" className="arrow2-img" />
          <p className="effect-desc">지자체 의사결정 근거</p>
        </div>

        <div className="effect-col">
          <h3 className="effect-title">개인적 효과</h3>
          <div className="effect-dots" />
          <div className="effect-box">자가진단·AI 분석</div>
          <img src={arrow2} alt="아래 화살표" className="arrow2-img" />
          <p className="effect-desc">
            피해자 및 가족이 위험을 인식하고 <br />
            즉시 상담/법률 지원 연결
          </p>
        </div>

        <div className="effect-col">
          <h3 className="effect-title">사회적 효과</h3>
          <div className="effect-dots" />
          <div className="effect-box">교육 콘텐츠·캠페인</div>
          <img src={arrow2} alt="아래 화살표" className="arrow2-img" />
          <p className="effect-desc">시민 인식 제고 및 예방 효과</p>
        </div>

        <div className="effect-col">
          <h3 className="effect-title">사회적 효과</h3>
          <div className="effect-dots" />
          <div className="effect-box">단순 데이터 제공을 뛰어넘음</div>
          <img src={arrow2} alt="아래 화살표" className="arrow2-img" />
          <p className="effect-desc">
            예방·발견·지원·법률 연결까지 <br />
            이어지는 종합 플랫폼
          </p>
        </div>
      </div>
    </section>

    </div>
  );
}
