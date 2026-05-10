import toast from "react-hot-toast";
import ErrorFallback from "../../../core/ui/ErrorFallback";
import Form from "../../../core/ui/Form";
import FormRow from "../../../core/ui/FormRow";
import Input from "../../../core/ui/Input";
import Spinner from "../../../core/ui/Spinner";
import { useEditSetting, useSettings } from "../hooks/useSetting";

function UpdateSettingsForm() {
  const { data: settings, isLoading, error } = useSettings();
  const { editSetting, isEditing } = useEditSetting();

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
    return (
      <ErrorFallback header="Faild to Fetch Settings" message={error.message} />
    );
  }

  function handleUpdate(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value) return;

    editSetting({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.min_booking_length}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.max_booking_length}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.max_guests_per_booking}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "max_guests_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakfast_price}
          disabled={isEditing}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
