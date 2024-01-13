import {
  BodyWrapper,
  ContentTitle,
  DeleteButton,
  EditButton,
  PrimaryButton,
  Row,
} from "../../../components/commons/styled.component";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../constants/path";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../../data/services/product";

const Product = () => {
  const navigate = useNavigate();
  const { isLoading, data: res } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const addNewHandler = () => {
    navigate(PATH.form_product);
  };

  const editHandler = (id) => {
    navigate(PATH.form_product, { state: { id } });
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Do you want to delete the record?")) {
      const res = await deleteProduct(id).unwrap();
      window.alert(res.message);
    }
  };

  if (isLoading) return <div>Loading</div>;

  return (
    <BodyWrapper>
      <Row>
        <ContentTitle style={{ marginRight: 30 }}>List Product</ContentTitle>
        <PrimaryButton onClick={addNewHandler}>Add New</PrimaryButton>
      </Row>
      {res.data.length === 0 ? (
        <Typography>No Data Available, Please add some record.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {res.data.map((row, index) => (
                <TableRow
                  key={`product-row${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <img src={row.imageUrl} alt="" width={50} height={50} />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>
                    <EditButton
                      style={{ marginRight: 20 }}
                      onClick={() => editHandler(row.id)}
                    >
                      edit
                    </EditButton>
                    <DeleteButton onClick={() => deleteHandler(row.id)}>
                      delete
                    </DeleteButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </BodyWrapper>
  );
};

export default Product;
