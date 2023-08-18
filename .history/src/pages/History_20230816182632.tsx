import React, { useEffect, useState } from 'react';
import { doc, getDoc, getDocs, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

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
    }, []);

    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                User History
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
                            {userHistory ? userHistory.map((user) => (
                                user.history.map((historyItem, index) => (
                                    <TableRow key={`${user.displayName}-${index}`}>
                                        <TableCell>{historyItem.userName}</TableCell>
                                        <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                        <TableCell>{historyItem.operator}</TableCell>
                                        <TableCell>{historyItem.result}</TableCell>
                                    </TableRow>
                                ))
                            ))}:
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default History;
