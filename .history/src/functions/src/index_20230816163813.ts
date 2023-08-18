// // eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const copyUserDataToCommunication = functions.firestore
    .document('users/{userId}')
    .onWrite(async (change, context) => {
        const communicationDocRef = admin.firestore().collection('communication').doc('communication');

        const usersCollectionRef = admin.firestore().collection('users');
        const allUsersDocs = await usersCollectionRef.get();

        const usersData: any[] = [];
        allUsersDocs.forEach(userDoc => {
            usersData.push(userDoc.data());
        });

        await communicationDocRef.set({ users: usersData });

        return null;
    });
