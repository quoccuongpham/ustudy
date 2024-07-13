import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import axios from 'axios';
import { useEffect, useState } from 'react';
export default function SystemView() {
  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3001/category');
      if (response.status === 200) {
        setCategory(response.data);
      }
    }

    fetchData();
  }, []);

  console.log(category);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const description = formData.get('description');
    const res = await axios.post(
      'http://localhost:3001/category',
      {
        description,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
    );
    setCategory([...category, res.data]);
  };
  return (
    <div>
      <h1>System</h1>
      <div>
        <form onSubmit={handleAddCategory} style={{ marginBottom: 20, display: 'flex' }}>
          <TextField
            id="outlined-basic"
            label="Add category"
            variant="outlined"
            size="small"
            name="description"
          />
          <Button variant="contained" style={{ marginLeft: 10 }} type="submit">
            Add
          </Button>
        </form>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.slice(0 + 5 * page, (page + 1) * 5).map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>
                  <Chip label={cat.description} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                count={category.length}
                rowsPerPage={5}
                page={page}
                onPageChange={(e, index) => {
                  setPage(index);
                }}

                // ActionsComponent={(props) => <div></div>}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
