// import React modules
import React, { useContext } from 'react';

// import React Redux
import { connect } from 'react-redux';

// import Material UI
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import PublishIcon from '@material-ui/icons/Publish';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';

// import Redux action
import { fetchAllProducts } from '../../redux/product/product.action';

// import React contexts
import AccessContext from '../../contexts/access.context';

// import functions to download and upload excel file
import exporting from '../../utils/exporting';
import importing from '../../utils/importing';

/**
 * Animation for Component
 */
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * Import/Export product
 * @param {*} props of component
 * @returns component
 */
const ImportExportDialog = props => {
    // authentication
    const { url, token } = useContext(AccessContext);

    // handle importing data
    const handleImporting = e => {
        importing(e.target, url, token, props.setProducts);
        props.handleClose();
    }

    // handle download data
    const handleExporting = () => {
        exporting(url, token);
        props.handleClose();
    }

    return (
    <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
    >
        <DialogTitle>Import and Export Products</DialogTitle>
        <DialogContent>
            For importing products, your sheet should use the following column names:
            <ul>
                <li>id</li>
                <li>name</li>
                <li>description</li>
                <li>brand</li>
                <li>price</li>
                <li>active</li>
                <li>category</li>
                <li>quantity</li>
                <li>weightValue</li>
                <li>weightType</li>
            </ul>
            <strong><u>Note:</u></strong><br></br>
            - id is mandatory field. When adding a new product, id must be 0. Otherwise, id should be existed in database for updating the product. <br></br>
            - category and weightType are using their ids, you can refer the <strong>Category and Weight Type management page</strong> to know their ids.
        </DialogContent>
        <DialogActions>
            <input 
                style={{ display: "none" }}
                accept=".xls,.xlsx,.csv"
                id="importing-button"
                type="file"
                onChange={e => handleImporting(e)}
            />
            <label htmlFor="importing-button">
                <Button variant="contained" color="primary" startIcon={<PublishIcon />} component="span">
                    Import
                </Button>
            </label>
            <Button variant="contained" color="primary" startIcon={<GetAppIcon />} onClick={e => handleExporting()}>
                Export
            </Button>
            <Button variant="contained" startIcon={<CancelIcon />} onClick={props.handleClose}>
                Close
            </Button>
        </DialogActions>
    </Dialog>
)}

/**
 * To map Dispatch function of Redux to props of Row component 
 * @param {*} dispatch function to pass Redux action to Redux reducer
 * @returns objects of mapping
 */
const mapDispatchToProps = dispatch => ({
    setProducts: products => dispatch(fetchAllProducts(products))
});

export default connect(null, mapDispatchToProps)(ImportExportDialog);