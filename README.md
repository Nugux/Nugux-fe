# Nugux-fe

코로나 시대, 안전한 여행을 고민하는 사람들을 위해 주변 관광지의 복잡도를 알려주는 누구X의 프론트엔드 프로젝트입니다.

## 설치 및 실행
### 빌드
```
$ npm install        // dependency 설치
$ npm run start      // localhost:3000
```
dependency를 설치 후 실행하면 3000번 포트에 개발 서버가 오픈됩니다.

### 설정 파일
프로젝트 루트에 .env 파일을 만들고, 다음과 같은 형식으로 입력합니다.
```
<Key>=<Value>
```
| Key | Value |
|---|---|
| REACT_APP_GOOGLE_MAP_KEY | Google Map 및 API 사용을 위한 키입니다. |
| SASS_PATH | SASS 모듈 설정용 키입니다. ```node_modules:src```를 입력해주세요. |
| REACT_APP_SERVER | API 호출을 위한 주소입니다. http와 같은 URL Scheme을 포함하고, 마지막에는 Slash가 없는 서버의 주소를 입력해주세요. |
| REACT_APP_TMAP_KEY | T-Map 길찾기 API 호출을 위한 키입니다. |

## 사용한 라이브러리
* react : https://github.com/facebook/react
* moment : https://github.com/moment/moment
* google-map-react : https://github.com/google-map-react/google-map-react
* ant design : https://ant.design/

상태관리는 외부 라이브러리를 사용하지 않고 Context API + hooks를 활용했습니다.[(참고)](https://kentcdodds.com/blog/how-to-use-react-context-effectively)
