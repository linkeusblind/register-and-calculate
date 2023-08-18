import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface UserHistory {
    history: {
        userName: string;
        num1: number;
        num2: number;
        operator: string;
        result: string;
        timestamp: string;
    };
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
        console.log(userHistory[0].history[0].userName)
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
                            <TableCell>Number 1</TableCell>
                            <TableCell>Number 2</TableCell>
                            <TableCell>Operator</TableCell>
                            <TableCell>Result</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userHistory.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.history.userName}</TableCell>
                                <TableCell>{user.history.num1}</TableCell>
                                <TableCell>{user.history.num2}</TableCell>
                                <TableCell>{user.history.operator}</TableCell>
                                <TableCell>{user.history.result}</TableCell>
                                <TableCell>{user.history.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default History;
