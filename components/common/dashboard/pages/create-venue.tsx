import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CreateVenueForm } from "./create-venue-form";

export default function CreateVenuePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreateVenueForm />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
