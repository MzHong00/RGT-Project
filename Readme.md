
배포 URL: https://rgt-three.vercel.app/

### 아키텍처

<img width="601" alt="Image" src="https://github.com/user-attachments/assets/bd91140b-e37c-4f4a-89b9-de28271e0298" />

### 기능 구현

- Book 검색 필터
- BOOK 페이지 네이션
- Book CRUD 페이지 및 컴포넌트
- Book CRUD REST API

## 프론트엔드

### 실행 방법

설치:

```
npm install
```

실행:

```
npm run dev 또는 npm run build 후 npm run start
```

### Skills

- NextJs (typescript)
- tantack-query
- react-hook-form

### 폴더 구조

**app**: NextJS의 App Router를 사용하여 라우팅을 제공하는 폴더입니다.

**components**: 하위 폴더 `/common`은 재사용 가능한 컴포넌트, `/features`은 기능과 관련된 컴포넌트 (ex: book의 create 등), `/layout`은 헤더나 사이드바 등을 포함하는 폴더입니다.

**containers**: 컴포넌트들이 여러 개 포함될 수 있는 컴포넌트입니다.

**lib**: 라이브러리의 설정들이 있습니다. (ex: axios 인스턴스 생성 또는 인터셉터 설정)

**services**: 각 도메인의 API 요청 로직들이 있으며, `/queries` 폴더에는 tanstack-query의 `queryOptions`가 있고, `/mutations`폴더에는 `useMutation` 훅스를 반환하는 함수들이 있습니다.

**styles**: `global.css`, `minxin.scss`등 전역적인 스타일 파일들이 있습니다.

**types**: 타입을 정의해놓은 폴더입니다.

### 성능

#### 검색 기능 디바운스

검색 기능에서 타이핑을 할때마다 네트워크 요청을 보내면 상당히 많은 불필요한 네트워크 요청이 발생하기 때문에, 0.5초 간격을 두고 디바운스 기법을 적용하여 네트워크 요청을 줄였습니다.

#### 캐싱

Tanstack query를 사용하여 데이터를 캐싱하였습니다. 문제의 요구사항은 NextJS의 fetch함수를 통한 데이터 캐싱을 사용해도 되었지만, 데이터 동기화 및 관리나 signal을 제공하는 편리한 API등을 사용하기 위해 Tanstack query를 사용하였습니다.

### 에러 처리

NextJS의 폴더 기반 라우팅을 통해 `error.tsx`, `not-found.tsx`파일을 통해 에러와 notFound 페이지를 관리 했으며, `<ErrorBoundary />`를 사용하여 네트워크 요청에 대한 에러를 부분적으로 처리하였습니다.

## 백엔드

### 실행방법

설치:

```
npm install
```

실행:
```
npm start
```

### Skills

- express (typescript)
- mongoose
- joi/celebrate

### 폴더구조

**api**: controller들이 위치한 폴더입니다.

**config**: 환경 변수들을 관리하는 파일들이 담겨져 있습니다.

**interface**: 인터페이스 타입들이 정의되어 있습니다.
**loaders**: express, mongoose 등 라이브러리들이 초기화되는 로더들이 있는 폴더입니다.

**models**: 몽고디비 스키마들이 있는 폴더입니다.

**services**: 기능을 수행하는 서비스 로직들이 존재하는 폴더입니다.

### 검증 및 예외 처리

`celebrate/joi`를 통해 요청 값들을 검증하며, try catch를 통해 오류가 발생하면 상태코드 500번 또는 404를 반환합니다.