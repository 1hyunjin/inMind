import styled from 'styled-components';
import Container from '../../components/Container';
import Text from '../../components/Text';
import userStore from '../../stores/userStore';
import { useEffect, useState } from 'react';
import { READRESERVEALL } from '../../apis/reserveApi';
import axios from 'axios';
import Btn from '../../components/Btn';
import Glass from '../../components/Glass';
import { useNavigate } from 'react-router-dom';

interface reservationInfo {
    reserveInfoIdx: number;
    coName: string;
    reportIdx: number;
    childName: string;
    reserveInfoDate: string;
    reserveInfoStartTime: string;
    reserveInfoEndTime: string;
    reserveInfoCreateTime: string;
    isEnd: 'Y' | 'N';
}

const ReservationHistoryContainer = styled(Container)`
    width: 100vw;
    justify-content: space-evenly;
`;

const HistoryContainer = styled(Container)`
    margin-top: 20px;
    height: calc(100vh - 120px);
    width: 570px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    flex-direction: column;
    justify-content: flex-start;
    box-sizing: border-box;
    overflow-y: scroll;
    position: relative;
    ${Glass}
`;

const Title = styled(Text)`
    padding: 10px 0;
    width: 570px;
    font-size: 20px;
    font-weight: 700;
    position: fixed;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
`;

const List = styled.ul`
    margin-top: 60px;
`;

const Card = styled.div`
    box-shadow: 0 0 0 1px #e3e5e8, 0 1px 2px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    width: 500px;
    height: 100px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    ${Glass}
`;

const Item = styled.div``;

const CancleBtn = styled(Btn)`
    background-color: tomato;
    color: white;
`;

function ReservationHistory() {
    const navigate = useNavigate();
    const { userInfo, token } = userStore();
    const [reservationHistory, setReservationHistory] = useState<reservationInfo[]>([]); // 타입 명시

    const loadData = () => {
        axios
            .get(READRESERVEALL(userInfo?.userIdx), {
                headers: {
                    Authorization: `Bearer ${token}`,
                    accept: '*/*',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
            })
            .then((response) => setReservationHistory(response.data));
    };

    useEffect(() => {
        loadData();
    }, [userInfo, token]);

    // isEnd가 'Y'인 예약과 'N'인 예약을 분리
    const pastReservations = reservationHistory.filter((e) => e.isEnd === 'Y');
    const upcomingReservations = reservationHistory.filter((e) => e.isEnd === 'N');

    return (
        <ReservationHistoryContainer>
            <HistoryContainer>
                <Title>지난 상담 예약 내역</Title>
                <List>
                    {pastReservations.length > 0 ? (
                        pastReservations.map((e: reservationInfo) => (
                            <Card key={e.reserveInfoIdx}>
                                <Item>
                                    {e.reserveInfoDate} {e.reserveInfoStartTime.substring(0, 5)}~
                                    {e.reserveInfoEndTime.substring(0, 5)}
                                </Item>
                                <Item>{e.coName} 상담가님</Item>
                                <Item>{e.childName} 어린이</Item>
                            </Card>
                        ))
                    ) : (
                        <>예약 없음</>
                    )}
                </List>
            </HistoryContainer>
            <HistoryContainer>
                <Title>다가오는 상담 예약 내역</Title>
                <List>
                    {upcomingReservations.length > 0 ? (
                        upcomingReservations.map((e: reservationInfo) => (
                            <Card key={e.reserveInfoIdx}>
                                <Item>
                                    {e.reserveInfoDate} {e.reserveInfoStartTime.substring(0, 5)}
                                    {'~'}
                                    {e.reserveInfoEndTime.substring(0, 5)}
                                </Item>
                                <Item>{e.coName} 상담가님</Item>
                                <Item>{e.childName}</Item>
                                <Item>
                                    <CancleBtn
                                        onClick={() => {
                                            // eslint-disable-next-line no-restricted-globals
                                            const command = confirm('정말 상담을 취소하시겠습니까?');
                                            if (command) {
                                                axios
                                                    .delete(
                                                        `https://i11b301.p.ssafy.io/api/reserve?reserveId=${e.reserveInfoIdx}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                                accept: '*/*',
                                                                'Content-Type': 'application/json;charset=UTF-8',
                                                            },
                                                        }
                                                    )
                                                    .then(() => loadData())
                                                    .then(() => alert('상담이 취소되었습니다.'));
                                            }
                                        }}
                                    >
                                        예약 취소
                                    </CancleBtn>
                                </Item>
                            </Card>
                        ))
                    ) : (
                        <>예약 없음</>
                    )}
                </List>
            </HistoryContainer>
        </ReservationHistoryContainer>
    );
}

export default ReservationHistory;
