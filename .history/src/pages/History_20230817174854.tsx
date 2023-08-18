import React, { useEffect, useState } from 'react';
import { doc, getDocs, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import Header from '../components/Header';
interface HistoryItem {
    num1: number;
    num2: number;
    operator: string;
    result: string;
    userName: string;
}

interface UserHistory {
    displayName: string;
    history: HistoryItem[];
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsersAndCopyToCommunication = async () => {
            try {
                const usersCollectionRef = collection(db, 'users');
                const usersDocs = await getDocs(usersCollectionRef);

                const usersData: UserHistory[] = [];
                usersDocs.forEach((userDoc) => {
                    usersData.push(userDoc.data() as UserHistory);
                });

                await setDoc(doc(db, 'communication', 'communication'), { users: usersData });

                setUserHistory(usersData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching and copying data:', error);
            }
        };

        fetchUsersAndCopyToCommunication();
        console.log(userHistory)
    }, []);

    return (
        <>
            <Header />
            <Container>
                <Typography variant="h2" gutterBottom>
                    History
                </Typography>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell>Numbers</TableCell>
                                    <TableCell>Operator</TableCell>
                                    <TableCell>Result</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userHistory && userHistory.length > 0 ? (
                                    userHistory.map((user) =>
                                        user.history && user.history.length > 0 ? (
                                            user.history.map((historyItem, index) => (
                                                <TableRow key={`${user.displayName}-${index}`}>
                                                    <TableCell>{user.displayName}</TableCell>
                                                    <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                                    <TableCell>{historyItem.operator}</TableCell>
                                                    <TableCell>{historyItem.result}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow key={`${user.displayName}-no-history`}>
                                                <TableCell colSpan={4}>No history data for {user.displayName}</TableCell>
                                            </TableRow>
                                        )
                                    )
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4}>No user history data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                )}
            </Container>
        </>
    );
};

export default History;
