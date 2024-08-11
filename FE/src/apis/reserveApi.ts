import ENDPOINT from './endpoint';

const RESERVEDEFAULT = `${ENDPOINT}/reserve`; // 예약 API 기본

export const READRESERVE = (userId: number) =>
  `${RESERVEDEFAULT}?userId=${userId}`; //예약 조회
export const RUDRESERVE = `${RESERVEDEFAULT}`; //예약 등록, 수정, 삭제
export const COREADRESERVE = (userId: any) =>
  `${RESERVEDEFAULT}/all?counselorId=${userId}`;
