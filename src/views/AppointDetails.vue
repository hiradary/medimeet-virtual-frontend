<template>
  <div v-if="appointment">
    <h1>Appointment Details</h1>
    <p>Appointment ID: {{ appointment.appointmentId }}</p>
    <p>Patient Name: {{ appointment.patient ? appointment.patient.name : 'Unknown' }}</p>
    <!-- <p>Doctor Name: {{ appointment.doctor ? appointment.doctor.name : 'Unknown' }}</p> -->
    <p>Date: {{ appointment.appointmentDate }}</p>
    <p>Time: {{ appointment.appointmentTime }}</p>
    <p>Status: {{ appointment.status }}</p>

    <!-- Update Appointment Form -->
    <!-- Appointment Update Form -->
  <div class="card">
    <h2 class="card-header">Update Appointment</h2>
    <div class="card-body">
      <form @submit.prevent="updateAppointment">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="date">Date:</label>
              <input type="date" v-model="updateForm.date" id="date" required class="form-control">
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="time">Time:</label>
              <input type="time" v-model="updateForm.time" id="time" required class="form-control">
            </div>
          </div>
        </div>
        <div class="col-md-6">
        <div class="form-group">
          <label for="status">Status:</label>
          <select v-model="updateForm.status" id="status" class="form-control">
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
        <button type="submit" class="btn btn-primary col-md-2">Update</button>
      </form>
    </div>
  </div>
  <br/>
  <div class="card">
<div class="card-body">
    <!-- Prescriptions Table -->
    <h2 >Prescriptions</h2>
    <table v-if="prescriptions.length > 0">
      <thead>
        <tr>
          <th>Medication</th>
          <th>Dosage</th>
          <th>Duration</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prescription in prescriptions" :key="prescription.prescriptionId">
          <td>{{ prescription.medication }}</td>
          <td>{{ prescription.dosage }}</td>
          <td>{{ prescription.duration }}</td>
          <td>
            <button @click="deletePrescription(prescription.prescriptionId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No prescriptions available.</p>
</div>
</div>  
    <!-- Prescription Creation Form -->
    <div class="card">
    <div class="card-body">
      <h2>Create Prescription</h2>
      <form @submit.prevent="createPrescription">
          <div class="row">
        <div class="form-group col-6">
          <label for="medication">Medication:</label>
          <input type="text" v-model="prescriptionForm.medication" id="medication" required>
        </div>
        <div class="form-group col-6">
          <label for="dosage">Dosage:</label>
          <input type="text" v-model="prescriptionForm.dosage" id="dosage" required>
        </div>
        </div>
        <div class="form-group col-6">
          <label for="duration">Duration:</label>
          <input type="text" v-model="prescriptionForm.duration" id="duration" required>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
    </div>
  </div>
  <div v-else>
    <p>Loading appointment details...</p>
  </div>
</template>

<script>
import appointmentService from '../services/AppiointmentService';
import prescriptionService from '../services/PrescriptionService';

export default {
  data() {
    return {
      appointmentId: '',
      appointment: null,
      updateForm: {
        date: '',
        time: '',
        status: ''
      },
      prescriptions: [],
      prescriptionForm: {
        medication: '',
        dosage: '',
        duration: ''
      }
    };
  },
  created() {
    this.appointmentId = this.$route.params.id;
    this.fetchAppointment();
    this.fetchPrescriptions();
  },
  methods: {
    async fetchAppointment() {
      try {
        const response = await appointmentService.getById(this.appointmentId);
        this.appointment = response.data;
        // Initialize updateForm with appointment data
        this.updateForm.date = this.appointment.appointmentDate;
        this.updateForm.time = this.appointment.appointmentTime;
        this.updateForm.status = this.appointment.status;
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    },
    async fetchPrescriptions() {
      try {
        const response = await prescriptionService.getAll();
        this.prescriptions = response.data;
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    },
    async updateAppointment() {
      try {
        const response = await appointmentService.update(this.appointmentId, {
          appointmentDate: this.updateForm.date,
          appointmentTime: this.updateForm.time,
          status: this.updateForm.status
        });
        console.log('Appointment updated:', response.data);
        // Optionally, update the appointment data after updating it
        this.fetchAppointment();
      } catch (error) {
        console.error('Error updating appointment:', error);
      }
    },
    async createPrescription() {
      try {
        // Prepare prescription data
        const prescriptionData = {
          appointmentId: this.appointmentId,
          medication: this.prescriptionForm.medication,
          dosage: this.prescriptionForm.dosage,
          duration: this.prescriptionForm.duration
        };

        // Send the prescription data in the prescription creation request
        const response = await prescriptionService.create(prescriptionData);
        console.log('New prescription created:', response.data);

        // Clear form fields
        this.prescriptionForm.medication = '';
        this.prescriptionForm.dosage = '';
        this.prescriptionForm.duration = '';

        // Optionally, refresh prescriptions after creating a new one
        this.fetchPrescriptions();
      } catch (error) {
        console.error('Error creating prescription:', error);
      }
    },
    async deletePrescription(prescriptionId) {
      try {
        console.log("prescriptionId", prescriptionId);
        await prescriptionService.delete(prescriptionId);
        alert('Prescription deleted successfully');
        // Optionally, refresh prescriptions after deleting one
        this.fetchPrescriptions();
      } catch (error) {
        console.error('Error deleting prescription:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
.card {
margin-top: 20px;
border: 1px solid #ccc;
border-radius: 5px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
margin-bottom: 20px;
margin-right: 20px;
margin-left: 20px;
}

.card-header {
background-color: #f8f9fa;
padding: 10px;
border-bottom: 1px solid #ccc;
}

.card-body {
padding: 20px;
}

.form-group {
margin-bottom: 15px;
}

label {
font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="time"],
select {
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
}

button {
background-color: #007bff;
color: #fff;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
}

button:hover {
background-color: #0056b3;
}

table {
border-collapse: collapse;
width: 100%;
}

th,
td {
border: 1px solid #ddd;
padding: 8px;
text-align: left;
}

th {
background-color: #f2f2f2;
}
</style>