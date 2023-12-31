import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase.js"
import Header from './Header'
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Footer from './Footer.jsx';
export default function ChangeUserDetails() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnapShot = await getDoc(docRef);
                console.log(user.uid)
                if (docSnapShot.exists()) {
                    console.log('Document data:', docSnapShot.data().email);
                    setFirstName(docSnapShot.data().FirstName)
                    setLastName(docSnapShot.data().LastName)
                }
                else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

            }
        })
        return () => unsuscribe();
    }, [])

    const handleChange = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(db, 'Users', user.uid);

            try {
                await updateDoc(docRef, {
                    FirstName: firstName,
                    LastName: lastName,
                });
                alert('User details updated successfully!');
            } catch (error) {
                alert('Error updating user details:', error);
            }
        }
        else {
            alert("No users");
        }
    }

    return (
        <> 
            <Header />
            <div className='user-detail-page'>
            <h1>Change User Details</h1>
                <form onSubmit={(e) => handleChange(e)}>
                <label htmlFor="First Name">Change First Name</label>
                <input type="tel" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="First Name">Change Last Name</label>
                <input type="tel" value={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                <br></br>
                <button type="submit" className='primary-button'>Accept changes</button>
                    </form>
                </div>
            <Footer/>
        </>
    )
}
