import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateFoodItemPageForm from "./create-food-item-form";

export default function CreateFoodItemPage() {
  return (
    <>
      <CreateFoodItemPageForm />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
