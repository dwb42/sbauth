import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient'
import { useUserStore } from '../stores/UserStore.js'

const userStore = useUserStore()

export async function getUserSession() {
    let uid = 123;

    const { data, error } = await supabase.auth.getSession()

    if (data) {
        uid = data.session.user.id
    }
    else {
        console.log('error', error)
    } 

    return {
        uid, data
    };    
}


// function to update local storage and pinia after successful login
export function loginUserLocally(username, uid) {

    localStorage.setItem("userName", JSON.stringify(username));
    localStorage.setItem("uid", JSON.stringify(uid));
    localStorage.setItem("loggedIn", true);
    userStore.$patch({ name: username, loggedIn: true, uid: uid })    
}


// helpers 

// truncate text 
export function truncateText(text, length) {
    if (text.length > length) {
        return text.substring(0, length) + ' ...';
    } else {
        return text;
    }
}