import { useForm, type SubmitHandler } from "react-hook-form";

import Input from "../../../core/ui/Input";
import Form from "../../../core/ui/Form";
import Button from "../../../core/ui/Button";
import FileInput from "../../../core/ui/FileInput";
import Textarea from "../../../core/ui/Textarea";

import type { CabinFormData, Cabin } from "../types/index";
import { useCreateCabin, useEditCabin } from "../hooks/useCabins";
import FormRow from "../../../core/ui/FormRow";

interface CreateCabinFormProps {
  cabinToEdit?: Cabin;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
  const isEditSession = Boolean(cabinToEdit?.id);

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CabinFormData>({
    defaultValues: isEditSession ? cabinToEdit : {},
  });

  const onSubmit: SubmitHandler<CabinFormData> = (data) => {
    // If it's a string, use it. If it's a FileList, take the first file.
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // This is VERY Important because defaultValues pass a Cabin instead of CabinFormData,
    // that cause supabase to throw error
    const cleanData = {
      name: data.name,
      max_capacity: data.max_capacity,
      regular_price: data.regular_price,
      discount: data.discount,
      description: data.description,
    };

    if (isEditSession) {
      // Use the Edit hook
      editCabin(
        { newCabinData: { ...cleanData, image }, id: cabinToEdit!.id },
        {
          onSuccess: (data) => {
            reset(data);
            onCloseModal?.();
          },
        },
      );
    } else {
      // Use the Create hook
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset(data);
            onCloseModal?.();
          },
        },
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "this is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
          disabled={isWorking}
          {...register("max_capacity", {
            required: "this is required",
            min: {
              value: 1,
              message: "Capacity must be more then 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regular_price"
          disabled={isWorking}
          {...register("regular_price", {
            required: "this is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "this is required",
            validate: (value) =>
              value <= getValues().regular_price ||
              "Discount should be less then the Price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "this is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            // Validation: Image is only required if we are NOT editing
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="">
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
