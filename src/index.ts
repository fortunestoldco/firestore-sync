import { defineHook } from '@directus/extensions-sdk';
import type { FilterHandler } from '@directus/types';
import { Firestore } from '@google-cloud/firestore';

export default defineHook(({ filter }, { services, database, getSchema }) => {
    // Initialize Firestore without explicit credentials
    // It will automatically use the service account credentials
    const firestore = new Firestore({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
    
    console.log('Firestore sync hook loaded');
    
    // Your hook implementation here
    filter('items.create', async (payload: any, meta: any) => {
        console.log('Creating item in Firestore:', payload);
        try {
            const collection = meta.collection;
            const docRef = firestore.collection(collection).doc(payload.id);
            await docRef.set(payload);
            console.log(`Successfully synced item ${payload.id} to Firestore`);
        } catch (error) {
            console.error('Error syncing to Firestore:', error);
        }
        return payload;
    });
});
