import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../config/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';

interface User {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
    timestamp: string;
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<User[]>([]);

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const communicationDocRef = collection(db, 'communication');
                const querySnapshot = await getDocs(communicationDocRef);

                if (!querySnapshot.empty) {
                    const communicationData = querySnapshot.docs[0].data();
                    const usersData = communicationData.users as User[];
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
                                <TableCell>{user.userName}</TableCell>
                                <TableCell>{user.num1}</TableCell>
                                <TableCell>{user.num2}</TableCell>
                                <TableCell>{user.operator}</TableCell>
                                <TableCell>{user.result}</TableCell>
                                <TableCell>{user.timestamp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default History;
