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
import {
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { getError } from "../../../helpers/common";
import { useEffect } from "react";
import {
  useCreateProductMutation,
  useLazyGetProductQuery,
  useUpdateProductMutation,
} from "../../../data/services/product";
import { useGetCategoriesQuery } from "../../../data/services/category";
import { CatSelectContainer } from "./styled.component";

const FormProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navId = location?.state?.id;

  const [getProduct] = useLazyGetProductQuery();
  const [addProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const { isLoading: loadingCategory, data: categories } =
    useGetCategoriesQuery();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      imageUrl: "",
      categories: [],
    },
  });

  const onSubmit = async (data) => {
    let res;
    const payload = {
      ...data,
      price: Number(data.price),
    };
    if (navId) {
      res = await updateProduct({ id: navId, ...payload }).unwrap();
    } else {
      res = await addProduct(payload).unwrap();
    }

    if (res.success) {
      alert(res.message);
      navigate(PATH.product);
    } else {
      alert(res.message);
    }
  };

  const loadProduct = async (id) => {
    const res = await getProduct(id).unwrap();
    if (res.success) {
      const existingCategories = [];
      res.data.Categories?.forEach((cat) => existingCategories.push(cat.id));

      reset({
        name: res.data.name,
        price: res.data.price,
        imageUrl: res.data.imageUrl,
        categories: existingCategories,
      });
    } else {
      alert(res.message);
    }
  };

  const handleCategoriesChange = (id) => {
    const currentCat = getValues("categories");
    let newCat = [];
    if (currentCat.includes(id)) {
      newCat = currentCat.filter((el) => el !== id);
    } else {
      newCat = [...currentCat, id];
    }
    setValue("categories", newCat);
  };

  const selectedCategories = watch("categories");
  useEffect(() => {
    if (navId) {
      loadProduct(navId);
    }
  }, [navId]);

  return (
    <BodyWrapper>
      <Row>
        <ContentTitle>Form Product</ContentTitle>
        <SecondaryButton
          style={{ marginLeft: 30 }}
          onClick={() => navigate(PATH.product)}
        >
          Back
        </SecondaryButton>
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Controller
          name="name"
          control={control}
          rules={{ required: "Field is required!" }}
          render={({ field }) => (
            <TextField
              label="Product Name"
              variant="standard"
              sx={{ width: "50%" }}
              error={getError(errors, "name").status}
              helperText={getError(errors, "name").message}
              {...field}
            />
          )}
        />
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Field is required!",
            min: { value: 0, message: "Value cannot be minus!" },
          }}
          render={({ field }) => (
            <TextField
              type="number"
              label="Product Price"
              variant="standard"
              sx={{ width: "50%" }}
              error={getError(errors, "price").status}
              helperText={getError(errors, "price").message}
              {...field}
            />
          )}
        />
      </Row>
      <Row style={{ marginBottom: 10 }}>
        <Controller
          name="imageUrl"
          control={control}
          rules={{ required: "Field is required!" }}
          render={({ field }) => (
            <TextField
              label="Image Url"
              variant="standard"
              sx={{ width: "50%" }}
              error={getError(errors, "imageUrl").status}
              helperText={getError(errors, "imageUrl").message}
              {...field}
            />
          )}
        />
      </Row>
      <Typography>Select Categories</Typography>
      <CatSelectContainer>
        {!loadingCategory ? (
          categories.data.map((cat) => (
            <FormControlLabel
              key={cat.id}
              control={
                <Checkbox
                  checked={selectedCategories?.includes(cat.id)}
                  onChange={() => handleCategoriesChange(cat.id)}
                />
              }
              label={cat.name}
            />
          ))
        ) : (
          <Typography>Loading categories...</Typography>
        )}
      </CatSelectContainer>

      <PrimaryButton style={{ marginTop: 30 }} onClick={handleSubmit(onSubmit)}>
        SAVE
      </PrimaryButton>
    </BodyWrapper>
  );
};

export default FormProduct;
