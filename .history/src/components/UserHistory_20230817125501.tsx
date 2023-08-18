import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

interface UserHistoryItem {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
}
interface UserId {
    uid?: string;
}

const UserHistory: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                if (user !== null) {
                    const userId = (user as UserId).uid;
                    const userDocRef = doc(db, `users/${userId}`);

                    const userDocSnapshot = await getDoc(userDocRef);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        const historyData: UserHistoryItem[] = userData?.history || [];
                        setUserHistory(historyData);
                        setIsLoading(false);
                        console.log(historyData)
                    }
                }

            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        fetchUserHistory();
    }, [user]);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                User History
            </Typography>
            {isLoading ? (
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
                                userHistory.map((historyItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{historyItem.userName}</TableCell>
                                        <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                        <TableCell>{historyItem.operator}</TableCell>
                                        <TableCell>{historyItem.result}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4}>No history data available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>)}
        </Container>
    );
};

export default UserHistory;
