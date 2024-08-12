import ENDPOINT from './endpoint';

const REPORTSDEFAULT = `${ENDPOINT}/reports`; // 검사 분석 API 기본

export const READREPORTSLIST = (userId: number) => `${REPORTSDEFAULT}?userId=${userId}`; // 분석 목록 조회
export const READREPORTS = (readId: number) => `${REPORTSDEFAULT}/${readId}`; //검사 분석 조회