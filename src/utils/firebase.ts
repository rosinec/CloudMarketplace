import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as authSignOut,
	onAuthStateChanged,
	User
} from 'firebase/auth';
import {
	collection,
	CollectionReference,
	getFirestore
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
	apiKey: 'AIzaSyAsQtXJJqpg_Ad0Pbovn3fY72uFsEXlRfE',
	authDomain: 'cloud-marketplace-9eb21.firebaseapp.com',
	projectId: 'cloud-marketplace-9eb21',
	storageBucket: 'cloud-marketplace-9eb21.appspot.com',
	messagingSenderId: '143754716625',
	appId: '1:143754716625:web:c4d1d432a1474dd4c8ecf0'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
	createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
	signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: User | null) => void) =>
	onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// eslint-disable-next-line @typescript-eslint/ban-types
export type Admin = {};

export const adminsCollection = collection(
	db,
	'admins'
) as CollectionReference<Admin>;

export type App = {
	name: string;
	connection_info: string;
	description: string;
	documentation: string;
	tags: string[];
	website: string;
};

export const appsCollection = collection(
	db,
	'apps'
) as CollectionReference<App>;
