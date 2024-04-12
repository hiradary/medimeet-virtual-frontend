import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: '/home',
            component: () => import('../views/PatientInterface.vue')
        },
        {
            path: '/',
            name: 'login',
            component: () => import('../views/LoginPage.vue')
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('../views/RegistrationPage.vue')
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: () => import('../views/UpdateUser.vue')
        },
        {
            path: '/DoctorInterface',
            name: 'DoctorInterface',
            component: () => import('../views/DoctorInterface.vue')
        },
        {
            path: '/patient',
            name: 'patient',
            component: () => import('../views/PatientInterface.vue') // Update to point to PatientInterface.vue
        },
        {
            path: '/AppointmentDetails/:id',
            name: 'AppointmentDetails',
            component: () => import('../views/AppointDetails.vue')
        }
    ]
});

export default router;
