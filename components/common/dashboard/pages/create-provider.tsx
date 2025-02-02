import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServiceProviderForm } from "./create-provider-form";

export default function CreateProvider() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8 text-black">
        Service Provider Registration
      </h1>
      <ServiceProviderForm />
      <ToastContainer />
    </div>
  );
}
