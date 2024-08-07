import ENDPOINT from './endpoint';

const USERDEFAULT = `${ENDPOINT}/users`; // 유저 api 기본

export const LOGIN = `${USERDEFAULT}`; // 로그인
export const SEARCHCOUNSELOR = (name: string) => `${USERDEFAULT}?name=${name}`; // 상담사목록조회
export const JOINUSER = `${USERDEFAULT}/user`; //유저 회원가입
export const JOINCOUNSELOR = `${USERDEFAULT}/counselor`; // 상담사 회원가입
export const USERINFO = (userID: string) => `${USERDEFAULT}/${userID}`; // 회원정보 조회, 수정
export const CHILDINFO = (userID: string) => `${USERDEFAULT}/${userID}/child`; // 회원정보 조회, 수정
export const CHECKPW = `${USERDEFAULT}/check-pw`; // 비밀번호 확인
export const CHECKEMAIL = (email: string) => `${USERDEFAULT}/email-check?email=${email}`; // 비밀번호 확인