import { useLocation, useNavigate } from "react-router-dom";
import {
  Row,
  ContentTitle,
  BodyWrapper,
  SecondaryButton,
  PrimaryButton,
} from "../../../components/commons/styled.component";
import { PATH } from "../../../constants/path";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { getError } from "../../../helpers/common";
import {
  useCreateCategoryMutation,
  useLazyGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../data/services/category";
import { useEffect } from "react";

const FormCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navId = location?.state?.id;

  const [getCategory] = useLazyGetCategoryQuery();
  const [addCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data) => {
    let res;
    if (navId) {
      res = await updateCategory({ id: navId, ...data }).unwrap();
    } else {
      res = await addCategory(data).unwrap();
    }

    if (res.success) {
      alert(res.message);
      navigate(PATH.category);
    } else {
      alert(res.message);
    }
  };

  const loadCategory = async (id) => {
    const res = await getCategory(id).unwrap();
    if (res.success) {
      reset({
        name: res.data.name,
      });
    } else {
      alert(res.message);
    }
  };

  useEffect(() => {
    if (navId) {
      loadCategory(navId);
    }
  }, [navId]);

  return (
    <BodyWrapper>
      <Row>
        <ContentTitle>Form Category</ContentTitle>
        <SecondaryButton
          style={{ marginLeft: 30 }}
          onClick={() => navigate(PATH.category)}
        >
          Back
        </SecondaryButton>
      </Row>
      <Row>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Field is required!" }}
          render={({ field }) => (
            <TextField
              label="Category Name"
              variant="standard"
              sx={{ width: "50%" }}
              error={getError(errors, "name").status}
              helperText={getError(errors, "name").message}
              {...field}
            />
          )}
        />
      </Row>
      <PrimaryButton style={{ marginTop: 30 }} onClick={handleSubmit(onSubmit)}>
        SAVE
      </PrimaryButton>
    </BodyWrapper>
  );
};

export default FormCategory;
