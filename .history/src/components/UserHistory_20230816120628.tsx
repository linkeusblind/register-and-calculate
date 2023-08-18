import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

interface UserHistoryItem {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}
interface UserId {
    uid?: string;
    // other properties
}

const UserHistory: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);

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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell>Numbers</TableCell>
                            <TableCell>Operator</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userHistory.map((historyItem, index) => (
                            <TableRow key={index}>
                                <TableCell>{historyItem.userName}</TableCell>
                                <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                <TableCell>{historyItem.operator}</TableCell>
                                <TableCell>{historyItem.result}</TableCell>
                                <TableCell>{historyItem.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default UserHistory;
