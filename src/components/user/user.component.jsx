// import React modules
import React, { useState, useEffect, useContext } from 'react';

// import Material UI
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import InputAdornment from '@material-ui/core/InputAdornment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// import row and editor dialog components
import Row from './row.component';
import RegisterDialog from '../editorDialog/registerDialog';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import functions for requesting to server 
import { getAllWithAuth } from '../../utils/fetching';

// import styles for the component
import { useStyles } from './user.styles';

/**
 * Component of user management page
 * @returns component
 */
const Users = () => {
    // use style
    const classes = useStyles();

    // state for backdrop and dialog
    const [backdrop, setBackdrop] = useState(false);
    const [dialog, setDialog] = useState(false);

    // authentication
    const { url, token } = useContext(AccessContext);

    // data
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);

    // filter
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState({
        email: ""
    });

    // handle paging
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // handle searching
    const filterBy = (value, property) => {
        setPage(0);
        filter[property] = value;
        setFilter({
            ...filter
        });
        setItems(
            users.filter( user => 
                user["email"].toUpperCase().includes(filter.email.toUpperCase())
            )
        );
    }

    // load data
    const loadUsers = () => {
        setBackdrop(true);
        getAllWithAuth(`${url}/admin/users/list`, token)
        .then(res => {
            setUsers(res);
            setItems(
                res.filter( user => 
                    user["email"].toUpperCase().includes(filter.email.toUpperCase())
                )
            );
            setBackdrop(false);
        });
    }

    // load data for first time
    useEffect(() => {
        setBackdrop(true);
        getAllWithAuth(`${url}/admin/users/list`, token)
        .then(res => {
            setUsers(res);
            setItems(
                res.filter( user => 
                    user["email"].toUpperCase().includes(filter.email.toUpperCase())
                )
            );
            setBackdrop(false);
        });
    },[]);

    // update user
    const updateUser = user => {
        setBackdrop(true);
        fetch(`${url}/admin/users/uuid?email=${user.email}`, {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            if (!json.hasOwnProperty("error")) {
                if ( user.active === 0 ) {
                    fetch(`${url}/admin/users/activate?uuid=${json.message}`, {
                        'method': 'PUT',
                        'headers': {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(res => loadUsers())
                } else {
                    fetch(`${url}/admin/users/deactivate?uuid=${json.message}`, {
                        'method': 'PUT',
                        'headers': {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(res => loadUsers())
                }
            }
        });
    }

    // delete user
    const deleteUser = user => {
        setBackdrop(true);
        fetch(`${url}/admin/users/uuid?email=${user.email}`, {
            'method': 'GET',
            'headers': {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(json => {
            // console.log(json);
            if (!json.hasOwnProperty("error")) {
                fetch(`${url}/admin/users?uuid=${json.message}`, {
                    'method': 'DELETE',
                    'headers': {
                        'Authorization': 'Bearer ' + token
                    }
                }).then(res => loadUsers())
            }
        });
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div className={classes.header}>
                            <div className={classes.title}>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Users
                                </Typography>
                            </div>
                            <div className={classes.pager}>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={items.length}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    rowsPerPage={10}
                                />
                            </div>
                        </div>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow className={classes.tableHead}>
                                    <TableCell className={classes.tableHead} width={"40%"}>
                                        Email <br/>
                                        <TextField 
                                            placeholder="Search by Email" 
                                            variant="standard"
                                            onChange={event => filterBy(event.target.value,"email")}
                                            value={filter.email}
                                            InputProps = {
                                                {
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                                <SearchIcon fontSize="small" />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={() => filterBy("","email")}
                                                            >
                                                                <ClearIcon fontSize="small" />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                    inputProps: {
                                                        "aria-label": "Search",
                                                    }
                                                }
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className={classes.tableHead} width={"40%"} >Name</TableCell>
                                    <TableCell className={classes.tableHead}>Active</TableCell>
                                    <TableCell className={classes.tableHead}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                items.slice(page * 10, page * 10 + 10).map((user, index) => <Row key={index} user={user} handleChange={event => updateUser(user)} handleDelete={event => deleteUser(user)} />)
                            }
                            </TableBody>
                        </Table>
                        <div className={classes.pager}>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={items.length}
                                page={page}
                                onChangePage={handleChangePage}
                                rowsPerPage={10}
                            />
                        </div>
                        <Fab color="primary" aria-label="add" className={classes.fab} onClick={ () => setDialog(true)}>
                            <AddIcon />
                        </Fab>
                        <RegisterDialog
                            users={users}
                            open={dialog}
                            handleClose={() => setDialog(false)}
                            handleBackdrop={() => setBackdrop(true)}
                            updateUsers={() => loadUsers()}
                        />
                    </Paper>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={backdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    )
}

export default Users;