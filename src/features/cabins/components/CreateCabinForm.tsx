import { useForm, type SubmitHandler } from "react-hook-form";

import Input from "../../../core/ui/Input";
import Form from "../../../core/ui/Form";
import Button from "../../../core/ui/Button";
import FileInput from "../../../core/ui/FileInput";
import Textarea from "../../../core/ui/Textarea";

import type { CabinFormData, Cabin } from "../types/index";
import { useCreateCabin } from "../hooks/useCabins";
import FormRow from "./FormRow";

interface CabinRowProps {
  cabin: Cabin;
}

function CreateCabinForm({ cabin }: CabinRowProps) {
  const mode = cabin ? "edit" : "create";

  const createCabin = useCreateCabin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CabinFormData>();
  const onSubmit: SubmitHandler<CabinFormData> = (data) => {
    // console.log(data);
    createCabin.mutate({ ...data, image: data.image.at(0) });
  };
  //No need for that anymore
  // const onError: SubmitErrorHandler<CabinFormData> = (errors) =>
  //   console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this is required",
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="max_capacity"
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
          {...register("regular_price", {
            required: "this is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
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
            required: "this is required",
          })}
        />
      </FormRow>

      <FormRow label="">
        {" "}
        \{/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit">
          {mode == "create" ? "Create cabin" : "Edit cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
