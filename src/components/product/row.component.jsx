// import React modules
import React, { useContext, useRef, useState } from 'react';

// import React Redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Material UI
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

// import menu and editor dialog components
import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import ProductEditorDialog from '../editorDialog/productEditorDialog';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import selector for Redux
import { selectCategories } from '../../redux/category/category.selector';

// import Redux action
import { deleteProduct } from '../../redux/product/product.action';

// import functions for requesting to server 
import { deleting } from '../../utils/fetching';

// import styles for the component
import { useStyles } from './product.styles';

/**
 * Row component of a product 
 * @param {*} props of component
 * @returns component
 */
const Row = (props) => {
    // use style
    const classes = useStyles();

    // authentication
    const { url, token } = useContext(AccessContext);

    // use context to set alert notification
    const { handleAlert } = useContext(AlertContext);

    // Use for right-clicked menu
    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);
    
    // Open dialog
    const handleEdit = () => {
        setAnchorEl(null);
        setDialog(true);
    }

    // Delete product
    const handleDelete = () => {
        setAnchorEl(null);

        deleting(`${url}/admin/product?id=${props.product.id}`, token)
        .then( res => {
            props.deleteProduct(props.product);
            handleAlert(true, "Deleted Successfully!");
        });
        
    }

    return (
    <TableRow hover ref={outerRef}>
        <TableCell>{props.product.name}</TableCell>
        <TableCell>{props.product.brand}</TableCell>
        <TableCell className={classes.chip}>
            <Chip size="small" label={props.categories.find( cate => cate.id === props.product.category).name} />
        </TableCell>
        <TableCell>{props.product.price}</TableCell>
        <TableCell align='center'>
            <IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}><MoreVertIcon size="small" /></IconButton>
        </TableCell>
        <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
        <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
        <ProductEditorDialog open={dialog} handleClose={() => setDialog(false)} data={props.product}/>
    </TableRow>
)}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    deleteProduct: product => dispatch(deleteProduct(product))
});

// map state to props of the component
const mapStateToProps = createStructuredSelector({
    categories: selectCategories
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);