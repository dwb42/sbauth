// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'
import { useUserStore } from '../stores/UserStore.js'
//import { loginUserLocally } from '../lib/composables.js'




const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: () => import(/* webpackChunkName: "home" */ '@/views/SignUp.vue'),
      },  
      {
        path: '/signin',
        name: 'SignIn',
        component: () => import(/* webpackChunkName: "home" */ '@/views/SignIn.vue'),
      },          
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Dashboard.vue'),
      }, 
      {
        path: '/myaccount',
        name: 'MyAccount',
        component: () => import(/* webpackChunkName: "home" */ '@/views/MyAccount.vue'),
      },  
      {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Projects.vue'),
      }, 
      {
        path: '/projects/:id/:state?',
        name: 'Project',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Project.vue'),
      },  
      {
        path: '/projects/create',
        name: 'ProjectCreate',
        component: () => import(/* webpackChunkName: "home" */ '@/views/ProjectCreate.vue'),
      }, 
      {
        path: '/images',
        name: 'Images',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Images.vue'),
      },       
      {
        path: '/users',
        name: 'Users',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Users.vue'),
      },       
    ],
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})





//check bei supabase ob nutzer eingeloggt ist
const canUserAccess = async () => {
  const { data, error } = await supabase.auth.getUser()

  //let error = false
  if (error) {
    console.log('error')
    return false
  }
  else { //according to supabase user is logged in 
    //console.log('data object from supabase', data)
    return data
  }

}

async function getUserInfoFromDB(uid) {
    const { data } = await supabase.from('profiles').select().eq('id', uid)
    //console.log('username as per pinia ', data[0].username);
    return data[0].username;
}


//Navigation Guard
router.beforeEach(async (to, from) => {


  // check if user is logged in at supabase
  let isAuthenticatedUserData = await canUserAccess()
  //console.log('isAuthenticatedUserData ', isAuthenticatedUserData)

  //check if user marked as "logged in" in pinia store
  const userStore = useUserStore() // useUserStore is a function that returns a store object  
  const loggedInStore = userStore.loggedIn

 // console.log('pinia log in state ', loggedInStore)

  // update pinia store and local store if user is logged in at supabase but not in pinia store
  if (isAuthenticatedUserData && !loggedInStore) {
    //get username from profile
    const userid = isAuthenticatedUserData.user.id;
    const username = await getUserInfoFromDB(userid)

    console.log('userid 333', userid);
    console.log('username 333', username);

    //loginUserLocally(username)  

    localStorage.setItem("userName", JSON.stringify(username));
    localStorage.setItem("loggedIn", true);
    userStore.$patch({ name: username, loggedIn: true })
    
    console.log('pinia log in state after update ', loggedInStore)
  }
  


  

  if (
    // make sure the user is authenticated
    !isAuthenticatedUserData &&
    // ❗️ Avoid an infinite redirect
    (to.name !== 'SignIn' && to.name !== 'SignUp' && to.name !== 'Home')
  ) {
    // redirect the user to the login page
    return { name: 'SignIn' }
  }
})



export default router
