import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface UserHistory {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}

interface CommunicationData {
    users: UserHistory[];
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<UserHistory[]>([]);

    useEffect(() => {
        const fetchCommunicationData = async () => {
            try {
                const communicationDocRef = doc(db, 'communication', 'communication');
                const communicationDocSnapshot = await getDoc(communicationDocRef);

                if (communicationDocSnapshot.exists()) {
                    const communicationData = communicationDocSnapshot.data() as CommunicationData;
                    setUserHistory(communicationData.users || []);
                }
            } catch (error) {
                console.error('Error fetching communication data:', error);
            }
        };

        fetchCommunicationData();
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userHistory.map((user, userIndex) => (
                            user.history.map((historyItem, index) => (
                                <TableRow key={`${userIndex}-${index}`}>
                                    <TableCell>{historyItem.userName}</TableCell>
                                    <TableCell>{`${historyItem.num1} ${historyItem.operator} ${historyItem.num2}`}</TableCell>
                                    <TableCell>{historyItem.operator}</TableCell>
                                    <TableCell>{historyItem.result}</TableCell>
                                </TableRow>
                            ))
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default History;
