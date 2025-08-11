# 7-docthru-team2-BE

# 초기 세팅 방법

1. psql에서 db 생성

- (cmd) psql -U postgres
- 비밀번호 입력하고 접속

- (cmd) CREATE DATABASE docthru
- /l 로 있는지 확인

2. be폴더 세팅, 초기 데이터 시딩

- (cmd) npm install
- .env 파일 수정.
- "postgres:super123%21%40%23" 으로 되어 있는 부분을 "postgres:본인 비밀번호"로 수정
- (cmd) npx prisma generate
- 이후 초기 데이터 시딩
- (cmd) npx prisma db seed

3. 실행

- (cmd) npm run dev
- 정상적으로 실행되면 성공
- 만약 scehema.prisma 파일을 건드는 경우에는 추가 세팅이 필요합니다. 변경 필요하면 말씀하세요.

4. 마이그레이션

- 스키마 변경한 경우 실행해야 함.
- (cmd) npx prisma migrate dev --name db

# 파일 실행 순서

- app.js -> routes -> controllers -> services -> repositories
- 헷갈리면 제 판다마켓 코드 참고하세요.
- https://github.com/yewonlee1211/7-sprint-mission-be/tree/express

# DB 스키마

- User
  - id(PK)
  - email
  - password
  - nickname
  - createdAt
  - updatedAt
  - 내가 생성한 챌린지
  - 참여 중인 챌린지
  - 챌린지 참여 횟수 (translation에서 userId로 검색해서 나오는 count)
  - 최다 추천 선정 횟수
  - userLevel(일반, 전문가)
  - isAdmin(Boolean)
- Challenge
  - id(PK)
  - title
  - description
  - url
  - category
  - type
  - dueDate
  - maximum
  - state
  - createdAt
  - updatedAt
  - userId(만든 사람, 소유자)
  - userId(참여자, 다중값이라 테이블을 따로 빼게 될 것)
  - isAdmitted (승인 대기, 승인 거절, 삭제, 승인)
- Translation

  - id(PK)
  - challengeId
  - userId(참가자)
  - content
  - canceled (boolean)
  - createdAt
  - updatedAt
  - 피드백

- Feedback

  - id(PK)
  - translationId
  - userId(피드백 작성자)
  - content
  - createdAt
  - updatedAt

- Hearts
  - id(PK)
  - translationId
  - userId(하트 누른 사람)
  - createdAt
