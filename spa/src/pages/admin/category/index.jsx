import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../data/services/category";
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

const Category = () => {
  const navigate = useNavigate();
  const { isLoading, data: res } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const addNewHandler = () => {
    navigate(PATH.form_category);
  };

  const editHandler = (id) => {
    navigate(PATH.form_category, { state: { id } });
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Do you want to delete the record?")) {
      const res = await deleteCategory(id).unwrap();
      alert(res.message);
    }
  };

  if (isLoading) return <div data-testid="loading-state">Loading</div>;

  return (
    <BodyWrapper>
      <Row>
        <ContentTitle data-testid="category-title" style={{ marginRight: 30 }}>
          List Category
        </ContentTitle>
        <PrimaryButton
          data-testid="category-add-new-button"
          onClick={addNewHandler}
        >
          Add New
        </PrimaryButton>
      </Row>
      {res.data.length === 0 ? (
        <Typography data-testid="no-data-info">
          No Data Available, Please add some record.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table
            data-testid="category-table"
            sx={{ minWidth: 100 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Option</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {res.data.map((row, index) => (
                <TableRow
                  key={`${row.name}${index}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
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

export default Category;
