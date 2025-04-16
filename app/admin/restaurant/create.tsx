import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { CreateOrEditRestaurantFormData } from "@/lib/validation/restaurantSchema";

export default function CreateRestauranScreen() {
  const handleSubmit = async (data: CreateOrEditRestaurantFormData) => {
    try {
      // Handle form submission logic here
      console.log("Form submitted:", data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  const isLoading = false; // Replace with actual loading state if needed
  return (
    <>
      <CreateOrEditRestaurantForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
