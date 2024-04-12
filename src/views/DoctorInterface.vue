<template>
  <div class="container mt-5">
    <!-- Appointment List -->
    <div class="card">
      <div class="card-header">
        <h2>Appointment List</h2>
      </div>
      <div class="card-body">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop through appointments -->
            <tr v-for="appointment in appointments" :key="appointment.id">
              <td>{{ appointment.doctor }}</td>
              <td>{{ appointment.date }}</td>
              <td>{{ appointment.time }}</td>
              <td>{{ appointment.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Appointment Form -->
    <div class="card mt-3">
      <div class="card-header">
        <h2>Create Appointment</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="createAppointment">
          <div class="mb-3">
            <label for="doctor" class="form-label">Doctor:</label>
            <select v-model="form.doctor" class="form-select" required>
              <option value="" disabled>Select Doctor</option>
              <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="date" class="form-label">Date:</label>
            <input type="date" v-model="form.date" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="time" class="form-label">Time:</label>
            <input type="time" v-model="form.time" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">Create Appointment</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [], // Placeholder for appointments data
      doctors: [], // Placeholder for doctors data
      form: {
        doctor: '',
        date: '',
        time: ''
      }
    };
  },
  methods: {
    createAppointment() {
      // Implement appointment creation logic
    },
    fetchAppointments() {
      // Implement logic to fetch appointments from backend
    },
    fetchDoctors() {
      // Implement logic to fetch doctors from backend
    }
  },
  mounted() {
    this.fetchAppointments();
    this.fetchDoctors();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
}

.card-header {
  background-color: #f0f0f0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.card-body {
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #dee2e6;
  padding: 8px;
  text-align: left;
}
</style>
