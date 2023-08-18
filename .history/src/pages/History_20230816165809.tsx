import React, { useEffect, useState } from 'react';
import { Typography, Container, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import { db } from '../config/config';

interface UserHistoryItem {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const communicationDocRef = db.collection('communication').doc('communication');
                const communicationDocSnapshot = await communicationDocRef.get();

                if (communicationDocSnapshot.exists()) {
                    const communicationData = communicationDocSnapshot.data();
                    const usersData: UserHistoryItem[] = communicationData?.users || [];
                    setUserHistory(usersData);
                }
            } catch (error) {
                console.error('Error fetching user history:', error);
            }
        };

        fetchUserHistory();
    }, []);

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

export default History;
