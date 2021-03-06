// import React modules
import React, { useState, useRef, useContext } from 'react';

// import Material UI
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

// import menu and editor dialog components
import ContextMenu from '../contextMenu/contextMenu';
import StyledMenu from '../menu/menu';
import EventEditorDialog from '../editorDialog/eventEditorDialog';

// import React contexts
import AccessContext from '../../contexts/access.context';
import AlertContext from '../../contexts/alert.context';

// import functions for requesting to server 
import { deleting } from '../../utils/fetching';

/**
 * Row component of an event 
 * @param {*} props of component
 * @returns component
 */
const Row = props => {
    // authenticatio
    const { url, token } = useContext(AccessContext);

    // alert
    const { handleAlert } = useContext(AlertContext);

    // Use for right-clicked menu
    const outerRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [dialog, setDialog] = useState(false);

    // open dialog
    const handleEdit = () => {
        setDialog(true);
    }

    // delete event
    const handleDelete = () => {
        props.handleBackdrop();
        deleting(`${url}/v2/admin/event_banner/${props.event.id}`,token)
        .then(json => {
            deleting(`${url}/admin/event/${props.event.id}`,token)
            .then(res => {
                props.updateEvents();
                handleAlert(true, "Deleted Successfully!");
                // props.deleteOrder(props.order);
            });
        });
        deleting(`${url}/admin/event/${props.event.id}`,token)
        .then(res => {
            props.updateEvents();
            handleAlert(true, "Deleted Successfully!");
            // props.deleteOrder(props.order);
        });
    }

    return (
        <TableRow hover ref={outerRef}>
            <TableCell>{props.event.title}</TableCell>
            <TableCell>{props.event.startDate.substring(0,10)}</TableCell>
            <TableCell>{props.event.endDate.substring(0,10)}</TableCell>
            <TableCell align="center">
                <IconButton size="small" onClick={ event => setAnchorEl(event.currentTarget)}>
                    <MoreVertIcon size="small" />
                </IconButton>
            </TableCell>
            <ContextMenu outerRef={outerRef} onEditClick={handleEdit} onDeleteClick={handleDelete} />
            <StyledMenu anchorEl={anchorEl} handleEdit={handleEdit} handleDelete={handleDelete} handleClose={() => setAnchorEl(null)} />
            <EventEditorDialog data={props.event} open={dialog} 
                handleClose={() => setDialog(false)} 
                handleBackdrop={() => props.handleBackdrop()} 
                updateEvents={() => props.updateEvents()}
            />
        </TableRow>
    )
}

export default Row;