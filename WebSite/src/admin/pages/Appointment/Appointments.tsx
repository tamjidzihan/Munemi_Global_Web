
import Loader from "../../../components/common/Loader";
import useAppointments from "../../../hooks/useAppointments";
import AppointmentsList from "../../components/Appointments/AppointmentsList";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const Appointments = () => {
  const { appointments, deleteAppointment, loading } = useAppointments()

  if (loading) return <Loader />

  return (
    <>
      <Breadcrumb pageName="Appointments Booking" />
      <div className="flex flex-col gap-10 ">
        <AppointmentsList
          allAppointments={appointments}
          deleteAppointment={deleteAppointment}
        />
      </div>
    </>
  );
};

export default Appointments;
