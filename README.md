# 7-docthru-team2-BE

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
  - authority(일반, 어드민)
    
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
