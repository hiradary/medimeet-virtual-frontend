import axios from 'axios'
import http from "../http-common";
class DoctorService {
    getDoctorInfo(doctorId) {
        return axios.http(`$/doctor/${doctorId}`);
      }
      getDoctorList() {
        return axios.http(`/doctor`);
      }
      getDoctorsBySpecialization(specialization) {
        return axios.http(`$/doctor?specialization=${specialization}`);
      }
}
  
  export default new RegistrationService();
  