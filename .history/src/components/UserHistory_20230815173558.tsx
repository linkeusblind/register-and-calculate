import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/config'; // Import your Firebase config


const UserHistory = () => {
    const [userHistory, setUserHistory] = useState([]);

    // ... the rest of your component code
};
export default UserHistory;