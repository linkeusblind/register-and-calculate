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
                    }
                }
                setIsLoading(false); // Set isLoading to false after fetching, regardless of success or failure
            } catch (error) {
                console.error('Error fetching user history:', error);
                setIsLoading(false); // Set isLoading to false on error
            }
        };

        if (!loading && user !== null) {
            fetchUserHistory();
        } else {
            setIsLoading(false); // Set isLoading to false if there's no user authenticated or still loading
        }
    }, [user, loading]);




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
                                userHistory.map((historyItem, index) => {
                                    try {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{historyItem.userName}</TableCell>
                                                <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                                <TableCell>{historyItem.operator}</TableCell>
                                                <TableCell>{historyItem.result}</TableCell>
                                            </TableRow>
                                        );
                                    } catch (error) {
                                        console.error('Error rendering history item:', error);
                                        return null; // Skip rendering this item if an error occurs
                                    }
                                })
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
