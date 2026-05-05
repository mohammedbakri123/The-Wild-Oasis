import styled from "styled-components";
import {
  useForm,
  type SubmitErrorHandler,
  type SubmitHandler,
} from "react-hook-form";

import Input from "../../../core/ui/Input";
import Form from "../../../core/ui/Form";
import Button from "../../../core/ui/Button";
import FileInput from "../../../core/ui/FileInput";
import Textarea from "../../../core/ui/Textarea";

import type { CabinFormData, Cabin } from "../types/index";
import { useCreateCabin } from "../hooks/useCabins";

//needed by use form hook,

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

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
  const onSubmit: SubmitHandler<CabinFormData> = (data) =>
    createCabin.mutate(data);
  const onError: SubmitErrorHandler<CabinFormData> = (errors) =>
    console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>

        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "this is required",
          })}
        />
        {errors?.name && <Error>{errors.name.message}</Error>}
      </FormRow>
      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
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
        {errors?.max_capacity && <Error>{errors.max_capacity.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regular_price"
          {...register("regular_price", {
            required: "this is required",
          })}
        />
        {errors?.regular_price && <Error>{errors.regular_price.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
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
        {errors?.discount && <Error>{errors.discount.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          id="description"
          defaultValue=""
          {...register("description", {
            required: "this is required",
          })}
        />
        {errors?.description && <Error>{errors.description.message}</Error>}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>{mode == "create" ? "Create cabin" : "Edit cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
