# Nugux-fe

코로나 시대, 어디로 갈지 고민하는 사람들을 위해 주변 관광지의 복잡도를 알려주는 누구X 입니다.

## 설치 및 실행
```
$ npm install
$ npm run start      // localhost:3000
```
dependency를 설치 후 실행하면 3000번 포트에 개발 서버가 오픈됩니다.

> 구글 맵에 사용된 KEY는 `.env` 파일에 있으므로 프로젝트 매니저에게 요청해야 합니다.

## 사용한 라이브러리
* react : https://github.com/facebook/react
* moment : https://github.com/moment/moment
* google-map-react : https://github.com/google-map-react/google-map-react
* ant design : https://ant.design/

상태관리는 외부 라이브러리를 사용하지 않고 Context API + hooks를 활용했습니다.[(참고)](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
