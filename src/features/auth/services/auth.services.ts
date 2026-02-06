import { signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { createUser } from "../../chat/services/chat.services";

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        throw error;
    }
};

export const registerUser = async ( email: string, password: string ): Promise<UserCredential> => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await createUser(userCredential.user);
        return userCredential;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw error;
    }
};