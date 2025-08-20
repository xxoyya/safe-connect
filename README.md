# safe-connect
워런톤 숭덕숭덕팀 'Safe Connect'

## 🚀 시작하기
먼저 아래 명령어로 개발 서버를 실행합니다:
```bash
npm run dev
# or
yarn dev
```

브라우저에서 [http://localhost:5173](http://localhost:5173)을 열어 실행 결과를 확인하세요.

## 📁 폴더 구조

```
public/              # 정적 파일 (폰트, favicon 등)
src/
├── assets/          # 이미지, 아이콘 등
├── styles/          # 공통 색상 파일
├── components/      # 컴포넌트 관리
├── hooks/           # 커스텀훅 관리
├── pages/           # 각 페이지 파일
├── util/            # 공통 로직 함수
```

## ✨ 컨벤션
- pages, components 폴더의 파일 이름은 대문자로 시작해 주세요 (예: `Header.tsx`)
- 브랜치는 `feat_OOO` 형식으로 만들어주세요. `feat` 이후에 오는 첫 알파벳은 대문자로 해주세요 (예: `feat_Home`)
- 이미지 파일 이름은 소문자로 관리해주세요.
- 각 폴더에 맞게 분리해주세요.
- `App.tsx` 파일이 화면 구성 파일입니다.
- `src/components/`에 각각 페이지 별로 파일을 만들어, 각 파일에 맞는 컴포넌트를 개발해 주시기 바랍니다.
- `src/pages/`에 각각 페이지 별로 폴더를 만들어, 각 폴더 내부에서 맞는 페이지를 개발해 주시기 바랍니다. (컴포넌트 합치는 용)
- `src/styles/variables.css` 폴더에 공통 컬러를 정의해 두었습니다. css 적용 시 참고 바랍니다. 색 추가 가능합니다.

🔗 Commit Convention
---
[타입] 부연 설명 및 이유

[FEAT] 새로운 기능 추가 <br>
[FIX] 기능 수정 (겉으로 동작하는 것이 달라짐) <br>
[REFACTOR] 코드 리펙토링 (겉으로 동작하는 것이 달라지지 않고 코드만 변경할 때) <br>
[BUG] 버그 수정 <br>
[UI] CSS 수정, UI수정 <br>
[STYLE] 코드 포맷팅, 세미 콜론 누락, 코드 변경이 없는 경우 <br>
[CONFIG] 설정, 환경 변수 변경 <br>
[TYPO] 오타 수정 <br>
[DOCS] 문서 수정 <br>
[COMMENT] Todo, Highlight, Question 등 기타 주석 추가/삭제 <br>
[PACKAGE] 새로운 라이브러리 추가 <br>
[REMOVE] 코드나 파일 삭제 <br>
