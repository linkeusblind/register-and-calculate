import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, DocumentData, doc, setDoc, Firestore } from 'firebase/firestore';
import { db } from '../config/config';
import { ListItem, List, ListItemText, Typography, Container } from '@mui/material';

interface User {
    userName: string;
    num1: number;
    num2: number;
    operator: string;
    result: string;
}

const History: React.FC = () => {
    const [userHistory, setUserHistory] = useState<User[]>([]);

    useEffect(() => {
        const fetchCommunicationData = async () => {
            try {
                const communicationDocRef = doc(db, 'communication', 'communication');
                const communicationDocSnapshot = await getDoc(communicationDocRef);

                if (communicationDocSnapshot.exists()) {
                    const communicationData = communicationDocSnapshot.data();
                    const usersData = communicationData?.users as User[];
                    setUserHistory(usersData || []);
                }
            } catch (error) {
                console.error('Error fetching communication data:', error);
            }
        };

        fetchCommunicationData();
    }, []);

    return (
        <>
            <List>
                {userHistory.map((historyItem, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${historyItem.userName}'s calculation`}
                            secondary={`Numbers: ${historyItem.num1} ${historyItem.operator} ${historyItem.num2}, Result: ${historyItem.result}`}
                        />
                    </ListItem>
                ))}
            </List>
        </>

        // <Container>
        //     <Typography variant="h2" gutterBottom>
        //         History
        //     </Typography>
        //     <TableContainer component={Paper}>
        //         <Table>
        //             <TableHead>
        //                 <TableRow>
        //                     <TableCell>User Name</TableCell>
        //                     <TableCell>Number 1</TableCell>
        //                     <TableCell>Number 2</TableCell>
        //                     <TableCell>Operator</TableCell>
        //                     <TableCell>Result</TableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody>
        //                 {userHistory.map((user, index) => (
        //                     <TableRow key={index}>
        //                         <TableCell>{user.userName}</TableCell>
        //                         <TableCell>{user.num1}</TableCell>
        //                         <TableCell>{user.num2}</TableCell>
        //                         <TableCell>{user.operator}</TableCell>
        //                         <TableCell>{user.result}</TableCell>
        //                     </TableRow>
        //                 ))}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </Container>
    );
};

export default History;
